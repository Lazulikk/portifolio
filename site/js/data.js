// ============================================================
//  CONTEÚDO DO PORTFÓLIO — edite só este arquivo.
//  Tudo marcado com "TODO" é placeholder.
// ============================================================
window.PORTFOLIO = {
  nome: "MIGUEL\nMARIANO",     // aparece grande na tela inicial (\n quebra linha)
  nomeCurto: "MIGUEL MARIANO", // selo do canto superior esquerdo
  tagline: "DÊ UMA OLHADA NO MEU TRABALHO",
  local: "ANÁPOLIS - GO · ENGENHARIA DE SOFTWARE", // selo do canto superior direito
  bio: "TODO — 2 a 4 frases sobre você: o que estuda, o que gosta de construir e o que procura agora.",

  // Projetos. Se "githubUser" estiver preenchido, a seção "Todos os repositórios"
  // é carregada ao vivo da API pública do GitHub.
  githubUser: "",              // TODO — ex.: "seuusuario"
  destaques: [
    { titulo: "PROJETO PRINCIPAL", desc: "TODO — uma linha sobre o projeto.", tag: "LIVE APP", status: "NO AR", url: "#" },
    { titulo: "SEGUNDO PROJETO",   desc: "TODO — uma linha sobre o projeto.", tag: "PYTHON",   status: "DESTAQUE", url: "#" },
    { titulo: "TERCEIRO PROJETO",  desc: "TODO — uma linha sobre o projeto.", tag: "WEB",      status: "DESTAQUE", url: "#" }
  ],
  // usado quando githubUser está vazio (ou a API falha)
  repositorios: [
    { titulo: "repo-exemplo-1", desc: "TODO", lang: "JavaScript", estrelas: 0, url: "#" },
    { titulo: "repo-exemplo-2", desc: "TODO", lang: "Python",     estrelas: 0, url: "#" },
    { titulo: "repo-exemplo-3", desc: "TODO", lang: "HTML",       estrelas: 0, url: "#" }
  ],

  // Skills: nível de 0 a 100
  skills: [
    { grupo: "LINGUAGENS", itens: [["JavaScript", 80], ["Python", 70], ["Java", 55], ["SQL", 60]] },
    { grupo: "FERRAMENTAS", itens: [["Git & GitHub", 85], ["React", 65], ["Node.js", 60], ["Figma", 50]] },
    { grupo: "IDIOMAS",     itens: [["Português", 100], ["Inglês", 70], ["Espanhol", 35]] }
  ],

  // Sobre mim. Trechos entre [[colchetes duplos]] ganham o destaque preto.
  foto: "",                    // TODO — ex.: "assets/img/foto.jpg" (vazio = moldura com iniciais)
  sobre: [
    "TODO — Eu sou [[estudante de ...]] com interesse em [[desenvolvimento web]] e [[...]].",
    "TODO — Um parágrafo sobre como começou a programar e o que te motiva.",
    "TODO — Um parágrafo sobre projetos, experiências ou o que está aprendendo agora."
  ],
  citacao: { texto: "TODO — uma frase que te representa.", autor: "Autor" },

  // Contato
  contatoTexto: "Estou aberto a [[estágios e vagas em desenvolvimento]]. Manda uma mensagem aqui embaixo ou me encontra em qualquer um destes:",
  email: "seuemail@exemplo.com", // TODO
  links: [
    { rotulo: "GITHUB",    url: "https://github.com/",    icone: "↗" },
    { rotulo: "LINKEDIN",  url: "https://linkedin.com/",  icone: "↗" },
    { rotulo: "INSTAGRAM", url: "https://instagram.com/", icone: "↗" },
    { rotulo: "CV",        url: "#",                      icone: "↓" }
  ],
  // Trilha sonora — arquivos em assets/music/. Para adicionar uma música,
  // coloque o .mp3 lá e acrescente uma linha aqui.
  musicas: [
    { titulo: "Changing Seasons (Instrumental)", artista: "audélix", arquivo: "assets/music/changing-seasons.mp3" },
    { titulo: "Color Your Night (Instrumental)", artista: "CG Instrumentals", arquivo: "assets/music/color-your-night.mp3" }
  ],

  // Endpoint do Formspree (formspree.io) para o formulário enviar de verdade.
  // Vazio = o botão abre o app de e-mail com a mensagem preenchida.
  formspree: ""
};
