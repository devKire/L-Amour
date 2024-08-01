import React, { useState } from "react";
import "./styles.css";
import Header from "./components/Header";
import Section from "./components/Section";
import ListItem from "./components/ListItem";
import UpcomingEvents from "./components/UpcomingEvents";
import PastEvents from "./components/PastEvents";
import Modal from "./components/Modal";
import ListItem02 from "./components/ListItem02";
import ListItemAdmin from "./components/ListItemAdmin";
import AdminModal from "./components/AdminModal";

const novidadesListData = [
  {
    url: "https://www.twitch.tv/lamourgames",
    imageUrl: "data:image/png;base64,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",
    alt: "Imagem de divulgação do CS",
    subtitle: "Se conecta com a gente na Twitch!",
  },
  {
    url: "https://chat.whatsapp.com/H47ON3nW4585kIRbLeRGv2",
    imageUrl: "/assets/divulgaçãoGrupoCS.jpg",
    alt: "Imagem de divulgação do CS",
    subtitle: "CS Chegou na L'AMOUR",
  },

  {
    url: "https://chat.whatsapp.com/KkAsc9EklsYKYDVgazZLtW",
    imageUrl: "/assets/divulgaçãoGrupoDiablo.jpg",
    alt: "Imagem de divulgação do DIABLO IV",
    subtitle: "DIABLO IV Chegou na L'AMOUR",
  },

];

const eventListData = [
  {
    upcomingEvents: [
      {
        title: "🎮🎮 JOGO LIVRE 🎮🎮",
        imageUrl: "https://i.ytimg.com/vi/7V5jdOjWVU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCLmAxRosK3Ltbar9OdDhUHFuDug",
        date: "2024-08-03",
        dateTxt: "Sábado dia 3",
        time: "17:00",
        description:
          "Jogo Livre com todos os administradores no discord!",
        instructions: `Entrar na 🔊¶ 🛡sala de eventos🛡 no canal 🎮🎮 JOGOS GERAIS🎮🎮`,
        requirements: `Ser membro do discord da L'Amour`,
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
    ],

    descriptionEvents: [
      {
        title: "REALM DA L'AMOUR NO MINECRAFT",
        imageUrl: "/assets/divulgaçãoRealmMinecraft.jpg",
        date: "2024-06-08",
        dateTxt: "Dia 06 de Junho",
        time: "24:00",
        description:
          "Estamos lançando um novo Realm no Minecraft BEDROCK para todos os membros da L'Amour Games! Prepare-se para uma experiência desafiadora no modo sobrevivência difícil (vanilla). Conecte-se com outros jogadores, colabore e construa seu mundo!",
        instructions: `Pessa para algum dos ADM o código do Realm!`,
        requirements: `Ter uma conta microsoft, algum meio para jogar a ultima versão do Minecraft BedRock e seguir as REGRAS que estão no DISCORD da L'AMOUR`,
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "🪂 Campeonato valendo 4 passes de Batalhas ou Valor no PIX 🪂",
        imageUrl: "/assets/capaCampeonato.png",
        date: "2024-06-01",
        dateTxt: "01 de Junho de 2024 (Sábado)",
        time: "20:00",
        description:
          "Jogo em sala personalizada em DUPLA com uma partida de Zero Build e uma de Battle Royale  (A dupla ganhadora da partida Zero Build não poderá participar da partida Battle Royale)! /////// DESAFIO X1 /////// Os finalistas de cada partida podem pedir um x1 contra os vencedores valendo os prêmios, só acontecerá caso os vencedores aceitem o desafio, será uma melhor de 10, cada dupla deverá escolher um representante para o duelo 🪂",
        instructions:
          "Para participar, entre no servidor no horário agendado com sua dupla feita e junte-se à equipe que vai estar nas chamada de eventos.",
        requirements:
          "Possuir uma conta Epicgames e algum meio para jogar Fortnite: Pc, Console, Mobile.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "🏴‍☠️ Jogatina no Sea of Thieves 🏴‍☠️",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/490377-144x192.jpg",
        date: "2024-05-11",
        dateTxt: "11 de Maio de 2024 (Sábado)",
        time: "18:00",
        description:
          "Vamos nos reunir para se divertir em uma jornada maritima nos mares do Sea of Thieves! Junte sua tripulação e venha participar da jogatina 🏴‍☠️",
        instructions:
          "Para participar, entre no servidor no horário agendado e junte-se ao grupo que vai estar nas chamadas.",
        requirements:
          "Possuir uma conta, internet estavel e algum meio para jogar Sea of Thieves: Pc, Console, Mobile(Apenas pelo Xcloud).",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "🪂 Jogatina no Fortnite 🪂",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg",
        date: "2024-05-11",
        dateTxt: "11 de Maio de 2024 (Sábado)",
        time: "18:00",
        description:
          "Vamos nos reunir para se divertir em um mata-mata frenético, quanto mais participantes melhor! 🪂",
        instructions:
          "Para participar, entre no servidor no horário agendado e junte-se à equipe que vai estar nas chamadas.",
        requirements:
          "Possuir uma conta Epicgames e algum meio para jogar Fortnite: Pc, Console, Mobile.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "Jogatina no Call of Duty Mobile",
        imageUrl:
          "https://static-cdn.jtvnw.net/ttv-boxart/512818_IGDB-144x192.jpg",
        date: "2024-04-27",
        dateTxt: "27 de Abril de 2024 (Sábado)",
        time: "19:30",
        description:
          "Vamos nos reunir para se divertir em varias modos de jogo: Mata Mata em equipe, Linha de frente, Contra Todos e Super Ataque dos Mortos Vivos. Quanto mais participantes melhor!",
        instructions:
          "Para participar, entre no servidor no horário agendado e junte-se à equipe que vai estar nas call de EVENTOS com os adms auxiliando todo mundo.",
        requirements:
          "Possuir uma conta no Cod Mobile e algum meio para jogar: Mobile ou Pc com Emulador",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
    ],
    pastEvents: [
      {
        title: "REALM DA L'AMOUR NO MINECRAFT",
        imageUrl: "/assets/divulgaçãoRealmMinecraft.jpg",
        date: "2024-06-08",
        dateTxt: "Dia 06 de Junho",
        results: ". . .",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "🏴‍☠ Evento Mega Aliança no Sea of Thieves! 🌊",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/490377-144x192.jpg",
        dateTxt: "2024-05-24",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "🪂 Campeonato valendo 4 passes de Batalhas ou Valor no PIX 🪂",
        imageUrl: "/assets/capaCampeonato.png",
        dateTxt: "01 de Junho de 2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "🏴‍☠️ Jogatina no Sea of Thieves 🏴‍☠️",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/490377-144x192.jpg",
        dateTxt: "11/05/2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "🪂 Jogatina no Fortnite 🪂",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg",
        dateTxt: "11 de Maio de 2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "Jogatina no Fortnite",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg",
        dateTxt: "04 de Maio de 2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "Jogatina no Call of Duty Mobile",
        imageUrl:
          "https://static-cdn.jtvnw.net/ttv-boxart/512818_IGDB-144x192.jpg",
        dateTxt: "27 de Abril de 2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "Jogatina no Fortnite",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg",
        dateTxt: "20 de Abril de 2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "Jogatina no Fortnite",
        imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg",
        dateTxt: "13 de Abril de 2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
      {
        title: "Jogatina no Battlefield 2042",
        dateTxt: "30 de Março de 2024 (Sábado)",
        results: ". . .",
        media: "Confira algumas fotos do evento em nossas redes sociais.",
        imageUrl:
          "https://static-cdn.jtvnw.net/ttv-boxart/514974_IGDB-144x192.jpg",
        buttonUrl: "https://discord.gg/wkczEEUnDX",
      },
    ],
  },
];

const gamesListData = [
  {
    url: "https://chat.whatsapp.com/JvtTHwRddyr7bRPXZV24xq",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-188x250.jpg",
    alt: "Imagem do jogo Minecraft",
  },

  {
    url: "https://chat.whatsapp.com/Iklr7HcO2Fm64w6XR0a3iC",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg",
    alt: "Imagem do jogo Fortnite",
  },

  {
    url: "https://chat.whatsapp.com/LUgsGalSFUKA1Dkl6FKJhe",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/490377-144x192.jpg",
    alt: "Imagem do jogo Sea of Thieves",
  },

  {
    url: "https://chat.whatsapp.com/H47ON3nW4585kIRbLeRGv2",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/495359_IGDB-144x192.jpg",
    alt: "Imagem do jogo Counter Strike 2",
  },

  {
    url: "https://chat.whatsapp.com/KkAsc9EklsYKYDVgazZLtW",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/515024-144x192.jpg",
    alt: "Imagem do jogo Diablo IV",
  },

  {
    url: "https://chat.whatsapp.com/DAlqzmIBVtQ16fMc9VbSxx",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/514974_IGDB-144x192.jpg",
    alt: "Imagem do Battlefield 2042",
  },

  {
    url: "https://chat.whatsapp.com/GpbSn1qSsnd9hKVaTfZ4CJ",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/498482_IGDB-144x192.jpg",
    alt: "Imagem do jogo Age of Empires IV",
  },

  {
    url: "https://chat.whatsapp.com/HK06P9clyUA1HUmbPguuTT",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/516086_IGDB-144x192.jpg",
    alt: "Imagem do jogo Grounded",
  },

  {
    url: "https://www.twitch.tv/directory/category/for-honor",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/490382-144x192.jpg",
    alt: "Imagem do jogo For Honor",
  },

  {
    url: "https://www.twitch.tv/directory/category/forza-horizon-5",
    imageUrl:
      "https://static-cdn.jtvnw.net/ttv-boxart/1757732267_IGDB-144x192.jpg",
    alt: "Imagem do jogo Forza Horizon 5",
  },

  {
    url: "https://www.twitch.tv/directory/category/need-for-speed-heat",
    imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/512782_IGDB-144x192.jpg",
    alt: "Imagem do jogo Need For Speed Heat",
  },
];

const admListData = [
  {
    bio: "Sou o cara que cuida das manutenções do server e principalmente do site. Mas trabalha mais do que joga, mas sempre está presente para responder as perguntas e falar com os pessoal.",
    imageUrl: "https://github.com/devKire.png",
    alt: "Imagem do Kire",
    discord: "kire_k",
    whats: "47 99924-8948",
    subtitle: "Kire",
  },

  {
    bio: "Eu sou o FBI, se tiverem alguma dúvida ou problema, podem falar comigo, eu vou tentar resolver e dar meu máximo para ajudá-lo.☕",
    imageUrl: "/assets/fbi.jpg",
    alt: "Imagem do FBI",
    discord: "fbi35br",
    whats: "47 9662-4664",
    subtitle: "FBI",
  },

  {
    bio: "Olá! Aqui é o Di Molto, conhecido como DiMota pelos mais íntimos. Caso queira tirar dúvidas ou até mesmo jogar, só me chamar. Estarei à disposição. 😎👍",
    imageUrl:
      "https://i.pinimg.com/564x/74/86/5d/74865dcf17e7d55519ba03e197af0cbe.jpg",
    alt: "Imagem do DiMolto",
    discord: "di0molto",
    whats: "34 9197-3964",
    subtitle: "Di Molto",
  },
  {
    bio: "Agente secreto da Sombra, fale comigo sobre Fortnite, tire dúvidas, dicas de xp e novidades",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1771298088088399872/gidKe1j7_400x400.jpg",
    alt: "Imagem do MD",
    discord: "mdthenitemare",
    whats: "11 99457-3760",
    subtitle: "MD",
  },
];

const socialListData = [
  {
    url: "https://www.facebook.com/groups/1305333569993679/",
    imageUrl: "/assets/facebook.svg",
    alt: "Facebook da L'Amour Games",
  },
  {
    url: "https://discord.gg/wkczEEUnDX",
    imageUrl: "/assets/discord.svg",
    alt: "Discord da L'Amour Games",
  },
  {
    url: "https://chat.whatsapp.com/HggfZseAPPvFwq3FeP5vxz?fbclid=IwAR3_t3PRVi9Qgv35jm7-BdDigrDCdenqgJP67jdMG1eUDtWCcjP1bY1vzfU_aem_AWEooImTEwW1C_-cwMk__8NHegMuricwyczO7mK4pnT2CMrLU6ns09orahsvjqhQi3_lZKs8UshZ3AyKInmQNKCA",
    imageUrl: "/assets/whatsapp.svg",
    alt: "Whatsapp da L'Amour Games",
  },
  {
    url: "https://www.instagram.com/lamourgames/",
    imageUrl: "/assets/instagram.svg",
    alt: "Instagram da L'Amour Games",
  },
  {
    url: "https://www.twitch.tv/lamourgames",
    imageUrl: "/assets/twitch.svg",
    alt: "Twich da L'Amour Games",
  },
];

function App() {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  return (
    <div className="App">
      <Header />
      <main>
        {/* LISTAS */}

        <Section
          title="Redes Sociais"
          subtitle="Se conecta com a gente!"
          className="social-list"
        >
          {socialListData.map(function (item) {
            return (
              <ListItem
                url={item.url}
                imageUrl={item.imageUrl}
                alt={item.alt}
              />
            );
          })}
        </Section>

        <Section
          title="Top Jogos do server:"
          subtitle="Os jogos em alta no servidor:"
          className="games-list"
        >
          {/* ITEMS DA LISTA*/}
          {
            gamesListData.map(function (item) {
              return (
                <ListItem
                  url={item.url}
                  imageUrl={item.imageUrl}
                  alt={item.alt}
                /> //pegando o item e retornando pra html
              );
            }) //função que vai percorrer o array e criar os itens da lista: map recebendo outra função que vai receber cada item
          }
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
              onClick={() => setSelectedAdmin(admin)}
            />
          ))}
        </Section>

        <Section
          title="Eventos"
          subtitle="Os eventos que estamos fazendo agora no servidor:"
          className="events-list"
        >
          {eventListData.map(function (item) {
            return <UpcomingEvents upcomingEvents={item.upcomingEvents} />;
          })}
        </Section>
        
        <Section
          title="Novidades e Atualizações"
          subtitle="Algumas das novidades no servidor e atualizações que foram feitas recentemente!"
          className="novidades-list"
        >
          <div>
            {novidadesListData.map(function (item) {
              return (
                <ListItem02
                  url={item.url}
                  imageUrl={item.imageUrl}
                  alt={item.alt}
                  subtitle={item.subtitle}
                />
              );
            })}
          </div>
        </Section>

        <Section
          title="Eventos Passados:"
          subtitle="Os resultados, fotos e outras informações vão estar nas nossas redes sociais:"
          className="events-list"
        >
          {eventListData.map(function (item) {
            return <PastEvents pastEvents={item.pastEvents} />;
          })}
        </Section>
      </main>
      {selectedAdmin && (
        <AdminModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}
    </div>
  );
}

export default App;
