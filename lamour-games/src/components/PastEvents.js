export default function PastEvents(props) {
  return (
    <div className="past-events">
      {props.pastEvents.map((event, index) => (
        <ul>
          <li key={index}>
            <h4>{event.title}</h4>
            <p>Data: {event.dateTxt}</p>
            <p>Resultados: {event.results}</p>
            <p>{event.media}</p>
            {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
          </li>
          <a target="_blank" href={event.buttonUrl}>
            Ver resultados
          </a>
        </ul>
      ))}
    </div>
  );
}
