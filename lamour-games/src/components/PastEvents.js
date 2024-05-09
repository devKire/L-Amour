import React, { useState } from 'react';

export default function PastEvents({ pastEvents }) {
  // Remove events with duplicate dates
  const uniqueEvents = pastEvents.reduce((unique, event) => {
    if (!unique.some((e) => e.dateTxt === event.dateTxt)) {
      unique.push(event);
    }
    return unique;
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventChange = (eventDateTxt) => {
    const selected = pastEvents.find((e) => e.dateTxt === eventDateTxt);
    setSelectedEvent(selected);
  };

  return (
    <div className="past-events">
      <select value={selectedEvent ? selectedEvent.dateTxt : ''} onChange={(e) => handleEventChange(e.target.value)}>
        <option value="">Ver eventos Passados</option>
        {uniqueEvents.map((event) => (
          <option key={event.dateTxt} value={event.dateTxt}>
            {event.dateTxt}
          </option>
        ))}
      </select>
      {selectedEvent ? (
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
      ) : null}
    </div>
  );
}
