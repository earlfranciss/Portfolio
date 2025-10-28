import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, {});
  
  if (!session || !session.accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { date, time, duration, name, email, message } = req.body;

  // Parse date and time
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  
  const startDateTime = new Date(year, month - 1, day, hours, minutes);
  const durationMinutes = duration === '15m' ? 15 : 30;
  const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: session.accessToken,
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const event = {
      summary: `Quick Design Chat with ${name}`,
      description: message || 'Quick design consultation',
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Asia/Manila',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Asia/Manila',
      },
      attendees: [
        { email: email },
        { email: 'hi@dariocamacho.com' },
      ],
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    res.status(200).json({ 
      success: true, 
      eventId: response.data.id,
      meetLink: response.data.hangoutLink 
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({ error: 'Failed to create calendar event' });
  }
}