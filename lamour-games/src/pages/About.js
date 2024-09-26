import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import Header from "../components/Header";
import Section from "../components/Section";

function About() {
  return (
    <div className="about-container">
      <Link to={routes.home} type="button"><Header /></Link>
      <main className="about-content">
        
        <Section
          title="Sobre a LAMOUR Games"
          subtitle=""
        >
            <p>
              A <strong>LAMOUR Games</strong> nasceu com o objetivo de unir gamers de todas as plataformas em uma única comunidade. Nosso foco é promover diversão, interação e oportunidades para que jogadores possam se conectar, compartilhar experiências e evoluir juntos. Seja você um jogador casual ou um profissional, nosso espaço é para todos que amam jogos!
            </p>
        </Section>
        
        <Section
          title="🎮 Eventos e Torneios"
          subtitle=""
        >
            <p>
              Organizamos regularmente <strong>torneios emocionantes</strong> para desafiar nossas habilidades e descobrir quem são os melhores jogadores da comunidade. Esses eventos incluem uma variedade de jogos, desde os mais populares até os indie, garantindo que todos possam participar e se divertir.
            </p>
            <p>
              Fique atento ao nosso <strong>calendário de eventos</strong> e participe para ter a chance de ganhar prêmios, reconhecimento e até mesmo <strong>cargos exclusivos</strong> dentro da comunidade!
            </p>
        </Section>

        <Section
          title="🎉 Sorteios e Prêmios"
          subtitle=""
        >
            <p>
              Quem não gosta de um bom sorteio? Na <strong>LAMOUR Games</strong>, realizamos sorteios especiais para nossos membros ativos, onde você pode ganhar desde acessórios gamers até códigos para jogos. Para participar, basta seguir as regras de cada sorteio, que normalmente envolvem interagir com nossa comunidade no Discord, WhatsApp ou redes sociais.
            </p>
        </Section>
        
        <Section
          title="💬 Nossa Comunidade"
          subtitle="Todas as plataformas juntas em um só lugar!"
        >
            <p>
              Nossa comunidade está espalhada por diferentes plataformas, como <strong>Discord</strong> e <strong>WhatsApp</strong>. Esses espaços são onde gamers podem se encontrar para jogar juntos, planejar estratégias e fazer novas amizades. Além disso, sempre mantemos todos informados sobre atualizações, novos eventos e oportunidades de engajamento.
            </p>
            <p>
              Não importa seu nível de habilidade ou o tipo de jogo que você prefere, na LAMOUR Games, você encontrará um lugar para se divertir, aprender e crescer como jogador.
            </p>
        </Section>

        <Section
          title="🚀 Junte-se a Nós!"
          subtitle="Se conecta com a gente!"
        >
            <p>
              Pronto para fazer parte da nossa comunidade e aproveitar tudo o que oferecemos? Clique nos links na nossa bio para entrar nos nossos servidores do Discord e grupos de WhatsApp, e não perca a chance de participar de nossos próximos eventos e sorteios.
            </p>
        </Section>

      </main>
    </div>
  );
}

export default About;
