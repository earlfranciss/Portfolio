import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, duration, name, email, message } = body;

    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.replace(/(am|pm)/, "").split(":");
    let hour = parseInt(hours);
    if (time.includes("pm") && hour !== 12) hour += 12;

    const startDateTime = new Date(year, month - 1, day, hour, parseInt(minutes));
    const durationMinutes = duration === "15m" ? 15 : 30;
    const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

    // ✅ AUTH FIX — use refresh token
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // ✅ permanent refresh token
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: `Quick Design Chat with ${name}`,
      description: message || "Quick design consultation",
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Manila",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Manila",
      },
      attendees: [
        { email },
        { email: process.env.MY_BOOKING_EMAIL }, // ✅ your email from .env
      ],
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    // Send confirmation email (see below)
    await sendConfirmationEmail({
      to: email,
      name,
      meetLink: response.data.hangoutLink,
      startDateTime,
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
    });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return NextResponse.json(
      { error: "Failed to create calendar event" },
      { status: 500 }
    );
  }
}


import nodemailer from "nodemailer";

async function sendConfirmationEmail({ to, name, meetLink, startDateTime }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_BOOKING_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD, // or your email app password
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
      <br/>
      <p>Looking forward to chatting with you!</p>
      <p>– Earl Francis Ong</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}


// import { google } from 'googleapis';
// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession();

//     if (!session || !session.accessToken) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const body = await req.json();
//     const { date, time, duration, name, email, message } = body;

//     // Parse date & time
//     const [year, month, day] = date.split('-');
//     const timeStr = time.replace('pm', '').replace('am', '');
//     const [hours, minutes] = timeStr.split(':');

//     let hour = parseInt(hours);
//     if (time.includes('pm') && hour !== 12) hour += 12;

//     const startDateTime = new Date(
//       parseInt(year),
//       parseInt(month) - 1,
//       parseInt(day),
//       hour,
//       parseInt(minutes)
//     );

//     const durationMinutes = duration === '15m' ? 15 : 30;
//     const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

//     // ✅ Real Google Calendar integration
//     const oauth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET
//     );

//     oauth2Client.setCredentials({
//       access_token: session.accessToken,
//     });

//     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

//     const event = {
//       summary: `Quick Design Chat with ${name}`,
//       description: message || 'Quick design consultation',
//       start: {
//         dateTime: startDateTime.toISOString(),
//         timeZone: 'Asia/Manila',
//       },
//       end: {
//         dateTime: endDateTime.toISOString(),
//         timeZone: 'Asia/Manila',
//       },
//       attendees: [
//         { email: email },
//         { email: 'hi@dariocamacho.com' },
//       ],
//       conferenceData: {
//         createRequest: {
//           requestId: `${Date.now()}`,
//           conferenceSolutionKey: { type: 'hangoutsMeet' },
//         },
//       },
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: 'email', minutes: 24 * 60 },
//           { method: 'popup', minutes: 30 },
//         ],
//       },
//     };

//     const response = await calendar.events.insert({
//       calendarId: 'primary',
//       requestBody: event,
//       conferenceDataVersion: 1,
//       sendUpdates: 'all',
//     });

//     return NextResponse.json({
//       success: true,
//       eventId: response.data.id,
//       meetLink: response.data.hangoutLink,
//       startDateTime: startDateTime.toISOString(),
//       endDateTime: endDateTime.toISOString(),
//     });
//   } catch (error) {
//     console.error('Error creating calendar event:', error);
//     return NextResponse.json(
//       { error: 'Failed to create calendar event' },
//       { status: 500 }
//     );
//   }
// }
