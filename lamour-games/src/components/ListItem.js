export default function ListItem(props){
    return (
        <li>
                <a 
                    target="_blank"
                    heref={props.href}>
                        <img src={props.imageUrl} alt={props.alt}/>
                        <h3>{props.subtitle}</h3>
                 </a>
        </li>
    )
}