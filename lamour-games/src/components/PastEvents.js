import React, { useState } from 'react';

export default function PastEvents({ pastEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventChange = (event) => {
    const selected = pastEvents.find((e) => e.title === event);
    setSelectedEvent(selected);
  };

  return (
    <div className="past-events">
      <select value={selectedEvent ? selectedEvent.title : null} onChange={(e) => handleEventChange(e.target.value)}>
        <option value={null}>Ver eventos Passados</option>
        {pastEvents.map((event, index) => (
          <option key={index} value={event.title}>
            {event.dateTxt}
          </option>
        ))}
      </select>
      {selectedEvent && (
        <div className="event-details">
          <h4>{selectedEvent.title}</h4>
          <p>Data: {selectedEvent.dateTxt}</p>
          <p>Resultados: {selectedEvent.results}</p>
          <p>{selectedEvent.media}</p>
          {selectedEvent.imageUrl && <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />}
          <a target="_blank" href={selectedEvent.buttonUrl}>
            Ver resultados
          </a>
        </div>
      )}
    </div>
  );
}
