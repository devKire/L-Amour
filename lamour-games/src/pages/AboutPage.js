import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import Header from "../components/Header";
import Section from "../components/Section";
import AdminModal from "../components/AdminModal";
import ListItemAdmin from "../components/ListItemAdmin";
import { useState } from "react";

const admListData = [
  {
    bio: "Sou o cara que cuida das manutenções do server e principalmente do site. Mas trabalha mais do que joga, mas sempre está presente para responder as perguntas e falar com os pessoal.",
    imageUrl: "https://github.com/devKire.png",
    alt: "Imagem do Kire",
    discord: "kire_k",
    whats: "47 99924-8948",
    subtitle: "Kire",
    gif: "https://camo.githubusercontent.com/9210bdd9e1683b9af116efba42bbfefa06131ae6d640ba06efb576519c27ef62/68747470733a2f2f6d65646961332e67697068792e636f6d2f6d656469612f76312e59326c6b505463354d4749334e6a4578613231734f5735685a336332644730775a48427062485a75597a5a6a5a32707a64474e6c656d466c643264335a7a59776232523463435a6c634431324d563970626e526c636d35686246396e61575a66596e6c666157516d593351395a772f3362354643384f716b766576365a704446392f67697068792e77656270",
  },

  {
    bio: "Eu sou o FBI, se tiverem alguma dúvida ou problema, podem falar comigo, eu vou tentar resolver e dar meu máximo para ajudá-lo.☕",
    imageUrl: "https://i.ibb.co/7gZsqzL/image.png",
    alt: "Imagem do FBI",
    discord: "fbi35br",
    whats: "47 9662-4664",
    subtitle: "FBI",
    gif: "https://64.media.tumblr.com/ea32a626dbbd325b858ff070af2615f0/c4480a5079c7831b-eb/s540x810/585b675312469427015818f6fedd821c70ceb08a.gifv",
  },

  {
    bio: "Olá! Aqui é o Di Molto, conhecido como DiMota pelos mais íntimos. Caso queira tirar dúvidas ou até mesmo jogar, só me chamar. Estarei à disposição. 😎👍",
    imageUrl:
      "https://i.pinimg.com/564x/74/86/5d/74865dcf17e7d55519ba03e197af0cbe.jpg",
    alt: "Imagem do DiMolto",
    discord: "di0molto",
    whats: "34 9197-3964",
    subtitle: "Di Molto",
    gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTZkaDFvYnowbDgzcjQzMXFkN2x3NnNxNHZ0dDloZzlqbmRqZjRjdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aYVhZCKdtXZSw/giphy.gif",
  },
  {
    bio: "Agente secreto da Sombra, fale comigo sobre Fortnite, tire dúvidas, dicas de xp e novidades",
    imageUrl:
      "https://i.pinimg.com/564x/55/fd/bc/55fdbc39c7c5107f9125bf8173e73caa.jpg",
    alt: "Imagem do MD",
    discord: "mdthenitemare",
    whats: "11 99457-3760",
    subtitle: "MD",
    gif: "https://www.icegif.com/wp-content/uploads/2021/11/icegif-741.gif",
  },
  {
    bio: "🥀 apenas existindo 🥀",
    imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczOWJz4_9-SPZkXFtuc0Y9BWHO3WG6vFvoh_zVXJAehDDQW7gLKnIV70DR5x6u8BZ_WuIG9y71oAOWyE9A0d2BjDuTy06k_KZANcC1SFpf10K3J_YBUBst6cR0HFj8t5PQiLHukmxaG6anvZRPlFibUe=w500-h500-s-no-gm?authuser=0",
    alt: "Imagem do Kaukau",
    discord: "kakau_0",
    whats: "47 97400-6692",
    subtitle: "Kaukau",
    gif: "https://i.pinimg.com/originals/e6/cc/b9/e6ccb964289da7abb3acb70b6868ed05.gif",
  },
  {
    bio: "Bah",
    imageUrl:
      "https://yt3.googleusercontent.com/fUoVEfaWzIN1LdEXQAdRTI2agBRkCRQneNOiXcjDyq5cI2TrI-N5c-VJ6SlKpbaFsW9EDBxfCA=s160-c-k-c0x00ffffff-no-rj",
    alt: "Imagem do Tales",
    discord: "talis147_04076",
    whats: "47 99285-0660",
    subtitle: "Tales",
    gif: "https://c.tenor.com/t3UqrVuybNYAAAAC/tenor.gif",
  },
];


function AboutPage() {
  return (
    <div className="about-container">
      <Header />
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
          title="Adm's e Moderadores do Server"
          subtitle="Os caras que fazem tudo acontecer, e que você pode ir conversar caso tenha alguma duvida, dica ou denúncia."
          className="adms-list"
        >
          {admListData.map((admin) => (
            <ListItemAdmin
              key={admin.subtitle}
              adminData={admin}
              imageUrl={admin.imageUrl}
              subtitle={admin.subtitle}
              gif={admin.gif}
            />
          ))}
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

export default AboutPage;
