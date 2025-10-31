"use client";

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Globe, Video, CheckCircle, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StatusModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  meetLink?: string;
  onClose: () => void;
}

interface BusyTime {
  start: string;
  end: string;
}

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, type, title, message, meetLink, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          {type === 'success' ? (
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
          ) : (
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-red-600" />
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-base mb-6">{message}</p>

          {meetLink && (
            <div className="w-full bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-1 font-medium">Your Google Meet Link:</p>
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:text-blue-800 font-semibold break-all hover:underline"
              >
                {meetLink}
              </a>
              <p className="text-sm text-gray-400 mt-2 mb-1 font-medium">An email has been sent to your account</p>
            </div>
          )}

          <button
            onClick={onClose}
            className={`w-full py-3 text-base rounded-lg font-semibold transition ${
              type === 'success'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {type === 'success' ? 'Great, thanks!' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState('15m');
  const [currentMonth, setCurrentMonth] = useState(new Date()); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState('calendar');
  const [busyTimes, setBusyTimes] = useState<BusyTime[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [monthBusyTimes, setMonthBusyTimes] = useState<{ [key: string]: BusyTime[] }>({}); // ✅ Store busy times for all days
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
    meetLink?: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  // ✅ ALL HOOKS MUST BE BEFORE ANY EARLY RETURNS
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeSlots = [
    '10:00pm', '10:15pm', '10:30pm', '10:45pm',
    '11:00pm', '11:15pm', '11:30pm', '11:45pm'
  ];

  // ✅ Get today's date dynamically
  const today = new Date();
  const isCurrentMonthAndYear = 
    currentMonth.getFullYear() === today.getFullYear() && 
    currentMonth.getMonth() === today.getMonth();

  // ✅ Check if we can go to previous month (don't allow going to past months)
  const canGoToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return prevMonth >= todayMonth;
  };

  // ✅ Check if a day is Sunday (unavailable)
  const isSunday = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.getDay() === 0; // 0 = Sunday
  };

  // ✅ Get the day of week for selected date
  const getSelectedDayOfWeek = (): string => {
    if (!selectedDate) return '';
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate);
    return dayNames[date.getDay()];
  };

  const getSelectedDayOfWeekShort = (): string => {
    if (!selectedDate) return '';
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate);
    return dayNamesShort[date.getDay()];
  };

  // ✅ Check if a date is in the past
  const isDateInPast = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  // ✅ Check if a time is in the past for a specific date
  const isTimeInPastForDate = (timeSlot: string, day: number): boolean => {
    const isToday = isCurrentMonthAndYear && day === today.getDate();
    if (!isToday) return false;

    const timeMatch = timeSlot.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
    if (!timeMatch) return false;

    const [_, hours, minutes, period] = timeMatch;
    let hour = parseInt(hours);
    const minute = parseInt(minutes);

    if (period.toLowerCase() === "pm" && hour !== 12) {
      hour += 12;
    } else if (period.toLowerCase() === "am" && hour === 12) {
      hour = 0;
    }

    const slotTime = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
      hour,
      minute
    );

    return slotTime < new Date();
  };

  // ✅ Check if ALL time slots are unavailable for a given day
  const areAllTimeSlotsUnavailable = (day: number): boolean => {
    if (isDateInPast(day) || isSunday(day)) return true;

    const dateString = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    
    const dayBusyTimes = monthBusyTimes[dateString] || [];

    // Check each time slot
    for (const timeSlot of timeSlots) {
      // Skip if time is in the past
      if (isTimeInPastForDate(timeSlot, day)) continue;

      // Parse the time slot
      const timeMatch = timeSlot.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
      if (!timeMatch) continue;

      const [_, hours, minutes, period] = timeMatch;
      let hour = parseInt(hours);
      const minute = parseInt(minutes);

      if (period.toLowerCase() === "pm" && hour !== 12) {
        hour += 12;
      } else if (period.toLowerCase() === "am" && hour === 12) {
        hour = 0;
      }

      const durationMinutes = duration === "15m" ? 15 : 30;
      const slotStart = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
        hour,
        minute
      );
      const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

      // Check if this slot is available
      let isAvailable = true;
      for (const busy of dayBusyTimes) {
        if (!busy.start || !busy.end) continue;

        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);

        if (slotStart < busyEnd && slotEnd > busyStart) {
          isAvailable = false;
          break;
        }
      }

      // If we found at least one available slot, return false
      if (isAvailable) return false;
    }

    // All slots are unavailable
    return true;
  };

  // ✅ Check if a time is in the past for today's date
  const isTimeInPast = (timeSlot: string): boolean => {
    if (!selectedDate || !isCurrentMonthAndYear || selectedDate !== today.getDate()) {
      return false;
    }

    const timeMatch = timeSlot.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
    if (!timeMatch) return false;

    const [_, hours, minutes, period] = timeMatch;
    let hour = parseInt(hours);
    const minute = parseInt(minutes);

    if (period.toLowerCase() === "pm" && hour !== 12) {
      hour += 12;
    } else if (period.toLowerCase() === "am" && hour === 12) {
      hour = 0;
    }

    const slotTime = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      selectedDate,
      hour,
      minute
    );

    return slotTime < new Date();
  };

  const fetchMonthAvailability = async () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    try {
      const response = await fetch("/api/calendar/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          date: firstDay.toISOString().split('T')[0],
          endDate: lastDay.toISOString().split('T')[0]
        }),
      });

      const data = await response.json();
      if (response.ok && data.busyTimes) {
        // Group busy times by date
        const groupedBusyTimes: { [key: string]: BusyTime[] } = {};
        
        for (const busy of data.busyTimes) {
          if (!busy.start) continue;
          const date = new Date(busy.start);
          const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          
          if (!groupedBusyTimes[dateString]) {
            groupedBusyTimes[dateString] = [];
          }
          groupedBusyTimes[dateString].push(busy);
        }
        
        setMonthBusyTimes(groupedBusyTimes);
      }
    } catch (error) {
      console.error("Error fetching month availability:", error);
    }
  };

  const checkAvailability = async () => {
    if (!selectedDate) return;

    setLoadingAvailability(true);
    const dateString = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${selectedDate.toString().padStart(2, "0")}`;

    try {
      const response = await fetch("/api/calendar/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dateString }),
      });

      const data = await response.json();
      if (response.ok) {
        setBusyTimes(data.busyTimes || []);
      }
    } catch (error) {
      console.error("Error checking availability:", error);
    } finally {
      setLoadingAvailability(false);
    }
  };
  
  // ✅ Fetch availability for entire month when month changes
  useEffect(() => {
    fetchMonthAvailability();
  }, [currentMonth, duration]);

  // ✅ Check availability when a date is selected
  useEffect(() => {
    if (selectedDate && view === 'time') {
      checkAvailability();
    }
  }, [selectedDate, view, duration]);

  // ✅ NOW we can do early return AFTER all hooks
  if (!isOpen) return null;

  

  // ✅ Check if a time slot is available
  const isTimeSlotAvailable = (timeSlot: string): boolean => {
    if (isTimeInPast(timeSlot)) return false;

    if (!selectedDate || busyTimes.length === 0) return true;

    const timeMatch = timeSlot.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
    if (!timeMatch) return true;

    const [_, hours, minutes, period] = timeMatch;
    let hour = parseInt(hours);
    const minute = parseInt(minutes);

    if (period.toLowerCase() === "pm" && hour !== 12) {
      hour += 12;
    } else if (period.toLowerCase() === "am" && hour === 12) {
      hour = 0;
    }

    const durationMinutes = duration === "15m" ? 15 : 30;
    const slotStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      selectedDate,
      hour,
      minute
    );
    const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

    for (const busy of busyTimes) {
      if (!busy.start || !busy.end) continue;

      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);

      if (slotStart < busyEnd && slotEnd > busyStart) {
        return false;
      }
    }

    return true;
  };

  const handleDateClick = (day: number) => {
    if (isDateInPast(day) || isSunday(day) || areAllTimeSlotsUnavailable(day)) return;
    
    setSelectedDate(day);
    setView('time');
  };

  const handleTimeClick = (time: string) => {
    if (!isTimeSlotAvailable(time)) return;
    setSelectedTime(time);
    setView('confirm');
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    const bookingData = {
      date: `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${selectedDate.toString().padStart(2, "0")}`,
      time: selectedTime,
      duration,
      name,
      email,
      message,
    };

    try {
      const response = await fetch("/api/calendar/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusModal({
          isOpen: true,
          type: "success",
          title: "Booking Confirmed!",
          message: "Your event has been successfully created in Google Calendar.",
          meetLink: data.meetLink,
        });
      } else {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: "Booking Failed",
          message:
            data.error ||
            "We couldn't create your booking at the moment. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "Error Occurred",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  const goToPreviousMonth = () => {
    if (canGoToPreviousMonth()) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendar = () => {
    const days = [];
    const totalSlots = firstDayOfMonth + daysInMonth;
    const rows = Math.ceil(totalSlots / 7);

    for (let i = 0; i < rows * 7; i++) {
      const day = i - firstDayOfMonth + 1;
      const isCurrentMonth = day > 0 && day <= daysInMonth;
      const isToday = isCurrentMonthAndYear && day === today.getDate();
      const isPast = isDateInPast(day);
      const isSundayDate = isSunday(day);
      const allSlotsUnavailable = areAllTimeSlotsUnavailable(day); // ✅ Check if all slots are unavailable

      days.push(
        <button
          key={i}
          onClick={() => isCurrentMonth && !isPast && !isSundayDate && !allSlotsUnavailable && handleDateClick(day)}
          disabled={!isCurrentMonth || isPast || isSundayDate || allSlotsUnavailable}
          className={`
            h-12 rounded-lg text-sm transition-all
            ${!isCurrentMonth ? 'invisible' : ''}
            ${isPast || isSundayDate || allSlotsUnavailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''} 
            ${isToday && !isPast && !isSundayDate && !allSlotsUnavailable ? 'bg-gray-900 text-white font-bold' : ''}
            ${!isPast && !isToday && !isSundayDate && !allSlotsUnavailable ? 'text-gray-700 hover:bg-gray-100' : ''}
            ${selectedDate === day && !isPast && !isSundayDate && !allSlotsUnavailable ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          {isCurrentMonth && day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Left Panel */}
        <div className="w-2/5 bg-gray-50 p-8 border-r border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              EF
            </div>
            <div className="text-sm text-gray-600">Earl Francis Ong</div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hello again! 👋
          </h2>

          <div className="">
            <div className='space-y-4 text-sm text-gray-700 pb-4'>
            <p>
              Looking to collaborate? I'm a software engineer passionate about
              creating <span className="italic font-semibold">efficient solutions</span> and <span className="italic font-semibold">exploring new technologies</span>.
            </p>

            <p>
              Have a project in mind or just want to talk code?
              I'm all ears!
            </p>
            </div>

            <div className="pt-4 border-t border-gray-300 mt-8">
              <p className="text-xs text-gray-600">Prefer async? Shoot me an email at</p>
              <a href="mailto:earlfrancisong@gmail.com" className="text-normal text-blue-600 hover:underline">
                earlfrancisong@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-3/5 p-8 relative flex flex-col ">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <div className='flex justify-between pt-4 items-center'>
            <div>
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <Video size={18} className="text-blue-600" />
                <span>Google Meet</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <Globe size={18} />
                <span>Asia/Manila</span>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="flex items-center gap-2 mb-6">
              <Clock size={20} className="text-gray-400" />
              <button
                onClick={() => setDuration('15m')}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                  duration === '15m'
                    ? 'bg-gray-200 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                }`}
              >
                15m
              </button>
              <button
                onClick={() => setDuration('30m')}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                  duration === '30m'
                    ? 'bg-gray-200 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                }`}
              >
                30m
              </button>
            </div>
          </div>

          {/* Calendar View */}
          {view === 'calendar' && (
            <div>
              <div className="flex items-center justify-between py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={goToPreviousMonth}
                    disabled={!canGoToPreviousMonth()}
                    className={`p-2 rounded-lg transition ${
                      canGoToPreviousMonth()
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    ←
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="text-xs font-semibold text-gray-500 text-center">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </div>
          )}

          {/* Time Selection View */}
          {view === 'time' && (
            <div>
              <button
                onClick={() => setView('calendar')}
                className="text-sm text-blue-600 hover:underline mb-2 items-start"
              >
                ← Back to calendar
              </button>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getSelectedDayOfWeekShort()} {selectedDate}
              </h3>

              {loadingAvailability && (
                <p className="text-sm text-gray-500 mb-2">Checking availability...</p>
              )}

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {timeSlots.map(time => {
                  const available = isTimeSlotAvailable(time);
                  return (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      disabled={!available}
                      className={`w-full py-2 px-4 text-sm border-2 rounded-lg transition text-center font-medium ${
                        available
                          ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700'
                          : 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Confirmation View */}
          {view === 'confirm' && (
            <div className="overflow-y-auto flex-1">
              <button
                onClick={() => setView('time')}
                className="text-sm text-blue-600 hover:underline mb-2"
              >
                ← Back to time selection
              </button>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Confirm your booking
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {getSelectedDayOfWeek()}, {monthNames[currentMonth.getMonth()]} {selectedDate}, {currentMonth.getFullYear()} at {selectedTime}
              </p>

              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm text-black px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm text-black  px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What would you like to discuss? (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-sm text-black  px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Tell me a bit about your project..."
                  />
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!name || !email}
                  className="w-full text-sm  bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          <StatusModal
            isOpen={statusModal.isOpen}
            type={statusModal.type}
            title={statusModal.title}
            message={statusModal.message}
            meetLink={statusModal.meetLink}
            onClose={() => {
              setStatusModal({ ...statusModal, isOpen: false });
              if (statusModal.type === "success") onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;