export default function Section(props) { //props tras o title e o sbtitle do app.js
    return (
        <section>
        <div>
            <h2>{props.title}</h2> 
            <p>{props.subtitle}</p>
            <ul className={props.className}>
                {/* ITEMS DA LISTA */}
                {props.children} {/* .children são os filhos de uma tag: src, imageUrl, alt, etc */}
            </ul>
        </div>
    </section>

    )
}