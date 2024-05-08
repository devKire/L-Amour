export default function ListItem02(props) {
  return (
        <a target="_blank" href={props.url}>
          <div>
            <img src={props.imageUrl} alt={props.alt}></img>
            <h2>{props.subtitle}</h2>
          </div>
        </a>
  );
}
