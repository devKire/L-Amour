import React, { useState, useEffect } from "react";

const EventItem = ({ event }) => {
  const calculateTimeUntilEvent = (eventDateTime) => {
    const now = new Date();
    const eventTime = new Date(eventDateTime);
    const difference = eventTime - now;

    if (difference < 0) {
      const eventDuration = 5 * 60 * 60 * 1000; // 5 horas em milissegundos
      const timerDifference = Math.abs(difference) > eventDuration ? 0 : eventDuration - Math.abs(difference);
      const timerHours = Math.floor(timerDifference / (1000 * 60 * 60));
      const timerMinutes = Math.floor((timerDifference % (1000 * 60 * 60)) / (1000 * 60));
      const timerSeconds = Math.floor((timerDifference % (1000 * 60)) / 1000);

      if (timerDifference <= 0) {
        return "Evento Terminado";
      } else {
        return `Evento em andamento: ${timerHours}h ${timerMinutes}m ${timerSeconds}s até o fim do evento`;
      }
    } 
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeUntilEvent, setTimeUntilEvent] = useState(
    calculateTimeUntilEvent(event.date + "T" + event.time)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilEvent(
        calculateTimeUntilEvent(event.date + "T" + event.time)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [event.date, event.time]);

  return (
    <ul key={event.title}>
      <li>
        <h4>{event.title}</h4>
        <h3>{timeUntilEvent}</h3>
        {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
        <p>Data: {event.dateTxt}</p>
        <p>Horário: {event.time}</p>
        <p>{event.description}</p>
        <p>Instruções: {event.instructions}</p>
        <p>Requisitos: {event.requirements}</p>
      </li>
      <a target="_blank" href={event.buttonUrl}>
        Participar
      </a>
    </ul>
  );
};

export default function UpcomingEvents({ upcomingEvents }) {
  return (
    <div className="upcoming-events">
      {upcomingEvents.map((event) => (
        <EventItem key={event.title} event={event} />
      ))}
    </div>
  );
}
