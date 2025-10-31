import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, duration, name, email, message } = body;

    console.log("Received booking request:", { date, time, duration, name, email });

    // ✅ Parse time correctly - handle both "2:00pm" and "14:00" formats
    let hour: number;
    let minute: number;

    if (time.toLowerCase().includes("am") || time.toLowerCase().includes("pm")) {
      // 12-hour format: "2:00pm"
      const timeMatch = time.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
      if (!timeMatch) {
        throw new Error(`Invalid time format: ${time}`);
      }

      const [_, hours, minutes, period] = timeMatch;
      hour = parseInt(hours);
      minute = parseInt(minutes);

      // Convert to 24-hour format
      if (period.toLowerCase() === "pm" && hour !== 12) {
        hour += 12;
      } else if (period.toLowerCase() === "am" && hour === 12) {
        hour = 0;
      }
    } else {
      // 24-hour format: "14:00"
      const [hours, minutes] = time.split(":");
      hour = parseInt(hours);
      minute = parseInt(minutes);
    }

    // ✅ Create datetime strings in local timezone (no conversion)
    const paddedHour = hour.toString().padStart(2, "0");
    const paddedMinute = minute.toString().padStart(2, "0");
    const startDateTimeString = `${date}T${paddedHour}:${paddedMinute}:00`;

    // ✅ Calculate end time
    const durationMinutes = duration === "15m" ? 15 : 30;
    
    const [year, month, day] = date.split("-").map(Number);
    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
    
    const endHour = endDate.getHours().toString().padStart(2, "0");
    const endMinute = endDate.getMinutes().toString().padStart(2, "0");
    const endDay = endDate.getDate().toString().padStart(2, "0");
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const endYear = endDate.getFullYear();
    const endDateString = `${endYear}-${endMonth}-${endDay}`;
    const endDateTimeString = `${endDateString}T${endHour}:${endMinute}:00`;

    console.log("Parsed times:", { startDateTimeString, endDateTimeString });

    // ✅ AUTH FIX — use refresh token
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: `Quick Design Chat with ${name}`,
      description: message || "Quick design consultation",
      start: {
        dateTime: startDateTimeString,
        timeZone: "Asia/Manila",
      },
      end: {
        dateTime: endDateTimeString,
        timeZone: "Asia/Manila",
      },
      attendees: [
        { email },
        { email: process.env.MY_BOOKING_EMAIL },
      ],
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    console.log("Creating calendar event...");

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    console.log("Calendar event created:", response.data.id);

    // ✅ Try to send email, but don't fail the whole request if it errors
    if (email && response.data.hangoutLink) {
      try {
        await sendConfirmationEmail({
          to: email,
          name: name ?? "Guest",
          meetLink: response.data.hangoutLink ?? "",
          startDateTime: startDate.toISOString(),
          message: message || "", // ✅ Pass the message
        });
        console.log("Confirmation email sent successfully");
      } catch (emailError) {
        console.error("Failed to send confirmation email (non-fatal):", emailError);
        // Calendar event was created, so we continue anyway
      }
    }

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
    });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Failed to create calendar event",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail({
  to,
  name,
  meetLink,
  startDateTime,
  message, // ✅ Add message parameter
}: {
  to: string;
  name: string;
  meetLink: string;
  startDateTime: string;
  message: string; // ✅ Add message parameter
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_BOOKING_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const formattedDate = new Date(startDateTime).toLocaleString("en-PH", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const mailOptions = {
    from: `"Earl Francis Ong" <${process.env.MY_BOOKING_EMAIL}>`,
    to,
    subject: "Your Design Chat is Booked!",
    html: `
      <h2>Hi ${name},</h2>
      <p>Your meeting has been successfully booked!</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
      ${message ? `<br/><p><strong>Your message:</strong></p><p style="background-color: #f3f4f6; padding: 12px; border-radius: 8px; font-style: italic;">${message}</p>` : ''}
      <br/>
      <p>Looking forward to chatting with you!</p>
      <p>- Earl Francis Ong</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}