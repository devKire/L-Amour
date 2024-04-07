import React, { useState, useEffect } from "react";

export default function UpcomingEvents(props) {
  const calculateTimeUntilEvent = (eventDateTime) => {
    const now = new Date();
    const eventTime = new Date(eventDateTime);
    const difference = eventTime - now;

    if (difference < 0) {
      return (
        <h1>
          Evento em andamento
        </h1>
        );
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
    calculateTimeUntilEvent(
      props.upcomingEvents[0].date + "T" + props.upcomingEvents[0].time
    )
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilEvent(
        calculateTimeUntilEvent(
          props.upcomingEvents[0].date + "T" + props.upcomingEvents[0].time
        )
      );
    }, 1000);

    // Lembre-se de limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="upcoming-events">
      {props.upcomingEvents.map((event) => (
        <ul>
          <li>
            <h4>{event.title}</h4>
            <h5>{timeUntilEvent}</h5>
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
      ))}
    </div>
  );
}
