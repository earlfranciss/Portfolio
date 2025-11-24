// src/app/api/calendar/check-availability/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, endDate } = body;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = endDate ? new Date(endDate) : new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busyTimes =
      response.data.items?.map((event) => ({
        start: event.start?.dateTime,
        end: event.end?.dateTime,
      })) || [];

    return NextResponse.json({ busyTimes });
  } catch (error: any) {
    console.error('Error checking availability:', error);
    
    // ✅ Always return NextResponse, not plain objects
    if (error.code === 401 || error.message?.includes('invalid_grant')) {
      return NextResponse.json(
        { error: 'Please reconnect your Google Calendar' },
        { status: 401 }
      );
    }
    
    // ✅ Handle other errors properly
    return NextResponse.json(
      { 
        error: 'Failed to check availability',
        message: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}