// ============================================================
//  CONTEÚDO DO PORTFÓLIO — edite só este arquivo.
//  Tudo marcado com "TODO" é placeholder.
// ============================================================
window.PORTFOLIO = {
  nome: "MIGUEL\nMARIANO",     // aparece grande na tela inicial (\n quebra linha)
  nomeCurto: "MIGUEL MARIANO", // selo do canto superior esquerdo
  tagline: "DÊ UMA OLHADA NO MEU TRABALHO",
  local: "ANÁPOLIS - GO · ENGENHARIA DE SOFTWARE", // selo do canto superior direito
  bio: "Estudante do 7º período de Engenharia de Software na UniEvangélica. Hoje meu foco é construir sites e gerenciar projetos com MCP e agentes de IA.",

  // Projetos. Se "githubUser" estiver preenchido, a seção "Todos os repositórios"
  // é carregada ao vivo da API pública do GitHub (todos os repos públicos).
  githubUser: "",
  // url vazia = card sem link (ex.: repositório privado)
  destaques: [
    { titulo: "MONIPRO", desc: "Sistema web em desenvolvimento, com front em React e projeto gerenciado com agentes de IA via MCP.", tag: "REACT", status: "EM DESENVOLVIMENTO", url: "" },
    { titulo: "PORTFÓLIO", desc: "Este site: HTML, CSS e JavaScript puros, com visual de interface de jogo, vídeos de fundo e trilha sonora.", tag: "WEB", status: "NO AR", url: "https://github.com/Lazulikk/portifolio" }
  ],
  // usado quando githubUser está vazio (ou a API falha)
  repositorios: [
    { titulo: "MoniPro", desc: "Repositório privado.", lang: "React", estrelas: 0, url: "" },
    { titulo: "portifolio", desc: "Código deste site.", lang: "HTML/CSS/JS", estrelas: 0, url: "https://github.com/Lazulikk/portifolio" }
  ],

  // Skills: nível de 0 a 100
  skills: [
    { grupo: "DESENVOLVIMENTO", itens: [["React.js", 60]] },
    { grupo: "IA & AUTOMAÇÃO",  itens: [["MCP", 70], ["Gestão de projetos com IA", 70]] }
  ],

  // Sobre mim. Trechos entre [[colchetes duplos]] ganham o destaque preto.
  foto: "",                    // TODO — ex.: "assets/img/foto.jpg" (vazio = moldura com iniciais)
  sobre: [
    "Eu sou Miguel Mariano, estudante do [[7º período de Engenharia de Software]] na UniEvangélica. Minha especialidade hoje é [[gerenciar projetos com MCP]] e programar com [[agentes de IA]] no Claude Code, principalmente em sites.",
    "O [[React.js]] é a biblioteca com que tenho mais experiência por enquanto, e sempre busco aprimorar e aprofundar o que sei nela.",
    "Agora quero evoluir no [[backend]], principalmente em [[banco de dados]]."
  ],
  citacao: { texto: "", autor: "" }, // TODO — vazio = a citação não aparece

  // Contato
  contatoTexto: "Estou aberto a [[estágios e vagas em desenvolvimento]]. Manda uma mensagem aqui embaixo ou me encontra em qualquer um destes:",
  email: "seuemail@exemplo.com", // TODO
  links: [
    { rotulo: "GITHUB",    url: "https://github.com/Lazulikk", icone: "↗" },
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
