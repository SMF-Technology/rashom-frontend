"use client";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// Convert event time to UTC
const convertToUTC = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) {
    console.error("⚠️ Invalid Date/Time:", { dateStr, timeStr });
    return null;
  }

  const eventDateTime = new Date(`${dateStr}T${timeStr}:00+06:00`); // Assume BD time (UTC+6)

  if (isNaN(eventDateTime.getTime())) {
    return null;
  }

  return eventDateTime.toISOString();
};

// Convert UTC time to local time
const convertToLocal = (utcDate) => {
  return utcDate ? new Date(utcDate).toLocaleString() : "Invalid Date";
};

// Check if an event is ongoing
const checkEventActive = (startUTC, endUTC) => {
  if (!startUTC || !endUTC) return false; // Ensure valid dates

  const now = new Date();
  const startTime = new Date(startUTC);
  const endTime = new Date(endUTC);

  return now >= startTime && now <= endTime; // True if now is between start and end
};

const Events_Components = () => {
  const [active, setActive] = useState(1);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [convertedEvents, setConvertedEvents] = useState([]);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://api-form.studyuk.today/events`);
        const events = response.data;

        console.log("📢 Fetched Events:", events);

        const updatedEvents = events
          .map((event) => {
            if (!event.eventStartDate || !event.eventStartTime) return null;

            const startUTC = convertToUTC(event.eventStartDate, event.eventStartTime);
            const endUTC = convertToUTC(event.eventEndDate, event.eventEndTime);

            if (!startUTC || !endUTC) return null;

            return {
              ...event,
              startUTC,
              endUTC,
              startLocal: convertToLocal(startUTC),
              endLocal: convertToLocal(endUTC),
              isActive: checkEventActive(startUTC, endUTC), // ✅ Check if event is ongoing
            };
          })
          .filter((event) => event !== null); // Remove invalid events

        console.log("✅ Converted Events:", updatedEvents);

        const currentDate = new Date();
        setOngoingEvents(updatedEvents.filter((event) => event.isActive));
        setUpcomingEvents(updatedEvents.filter((event) => new Date(event.startUTC) > currentDate));
        setConvertedEvents(updatedEvents);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="font-poppins bg-[#FAFAFA]">
      {/* Ongoing Events */}
      <div className="ongoing-events">
        <h2 className="text-xl font-semibold mb-4">Ongoing Events</h2>
        {ongoingEvents.length === 0 ? (
          <p>No ongoing events at the moment.</p>
        ) : (
          ongoingEvents.map((event) => (
            <div key={event.id} className="event-card bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-bold">{event.eventName}</h3>
              <p className="text-sm">{event.startLocal} - {event.endLocal}</p>
              <p className="text-sm">{event.eventLocation}</p>
              <Link href={`/events/${event.id}`} className="text-blue-500">View Details</Link>
            </div>
          ))
        )}
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events mt-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          upcomingEvents.map((event) => (
            <div key={event.id} className="event-card bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-bold">{event.eventName}</h3>
              <p className="text-sm">{event.startLocal} - {event.endLocal}</p>
              <p className="text-sm">{event.eventLocation}</p>
              <Link href={`/events/${event.id}`} className="text-blue-500">View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events_Components;
