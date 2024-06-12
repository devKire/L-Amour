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
    ],

    descriptionEvents: [
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
    bio: ". . .  The Boss . . .",
    imageUrl: "/assets/luan.jpg",
    alt: "Imagem do Luan",
    discord: "luanxd8281",
    whats: "47 9734-8584",
    subtitle: "Luan",
  },

  {
    bio: "Sou o cara que cuida das manutenções do server e principalmente do site. Mas trabalha mais do que joga, mas sempre está presente para responder as perguntas e falar com os pessoal.",
    imageUrl: "https://github.com/devKire.png",
    alt: "Imagem do Kire",
    discord: "kire_k",
    whats: "47 99924-8948",
    subtitle: "Kire",
  },

  {
    bio: "Eu sou o Alucard , bom vocês provavelmente já me conhecem ... Mas sou o ADM que cuida de vocês , então se tiver algum problema , ou tenha uma ideia para fazer um evento ... É só falar comigo 😁🤜🤛",
    imageUrl: "/assets/alucard.jpg",
    alt: "Imagem do Alucard",
    discord: "alucardth",
    whats: "49 8852-0246",
    subtitle: "Alucard",
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
    bio: "Moderador do Sea of Thieves",
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
