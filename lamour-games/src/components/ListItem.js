export default function ListItem(props){
    return (
        <li>
            <a 
                target="_blank"
                href={props.url}>
                <img src={props.imageUrl} alt={props.alt}/>
                <h3>{props.subtitle}</h3>
            </a>
        </li>
    )
}
