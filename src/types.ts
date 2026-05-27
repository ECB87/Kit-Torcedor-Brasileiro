export interface TorcedorItem {
  id: number;
  name: string;
  quantity: number;
  description: string;
  detailedDescription: string;
  iconName: string;
  category: 'vestuario' | 'festa' | 'barulho' | 'decoracao';
}

export interface Benefit {
  title: string;
  description: string;
  subtitle: string;
  icon: string;
}

export interface Review {
  name: string;
  city: string;
  state: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export const TORCEDOR_ITEMS: TorcedorItem[] = [
  {
    id: 1,
    name: "Óculos de Torcedor Temáticos",
    quantity: 1,
    description: "Óculos temáticos premium da Seleção para proteção e muito estilo.",
    detailedDescription: "Design temático com lente perfurada estampando as cores da bandeira nacional. Leve, durável e com proteção UV segura, perfeito para encarar o sol nos estádios, churrascos ou nas festas ao ar livre.",
    iconName: "Glasses",
    category: "vestuario"
  },
  {
    id: 2,
    name: "Bandeira Grande da Seleção 150x90cm",
    quantity: 1,
    description: "Gigante, de alta qualidade com alças reforçadas para amarrar ou vestir.",
    detailedDescription: "Medida oficial para torcida em estádio ou decoração da fachada de casa. Feita de poliéster ultra resistente que balança perfeitamente com o vento, com cores brilhantes e costura dupla de reforço.",
    iconName: "Flag",
    category: "decoracao"
  },
  {
    id: 3,
    name: "Pistola de Confete Temática",
    quantity: 1,
    description: "Pistola de ar comprimido com confetes verde-e-amarelo para momentos de gol.",
    detailedDescription: "Garante a explosão de alegria no exato momento do grito de GOOOOL! Acionada por mola mecânica (100% segura para crianças e adultos, sem uso de pólvora), lançando confetes biodegradáveis nas cores do Brasil.",
    iconName: "PartyPopper",
    category: "festa"
  },
  {
    id: 4,
    name: "Vuvuzela Clássica da Copa",
    quantity: 1,
    description: "Corneta potente temática para agitar e contagiar a galera nos jogos.",
    detailedDescription: "O som clássico das Copas! Ergonômica, fabricada com plástico ABS atóxico e leve, emite um som potente para liderar os cantos de torcida no churrasco com amigos ou na arquibancada.",
    iconName: "Volume2",
    category: "barulho"
  },
  {
    id: 5,
    name: "Pintura Facial Temática Brasil",
    quantity: 1,
    description: "Bastão de tinta nas cores verde e amarela, hipoalergênico e fácil de remover.",
    detailedDescription: "Desenhe listras vibrantes no rosto de maneira rápida, uniforme e prática. Tinta infantil dermatologicamente testada, suave para a pele e super simples de remover com água e sabonete comum.",
    iconName: "Sparkles",
    category: "festa"
  },
  {
    id: 6,
    name: "Calendário Oficial da Copa 2026",
    quantity: 1,
    description: "Calendário interativo completo dos jogos para você não perder nenhum lance.",
    detailedDescription: "Para preencher com os resultados de cada partida! Acompanhe tabelas, grupos, horários oficiais do Brasil e os cruzamentos até a grande final histórica da Copa do Mundo de 2026.",
    iconName: "Calendar",
    category: "decoracao"
  },
  {
    id: 7,
    name: "Bastões de Incentivo Infláveis",
    quantity: 2,
    description: "Par de bastões infláveis rígidos para bater e fazer barulho sincronizado.",
    detailedDescription: "Conhecidos como bastões de bate-bate, criam uma atmosfera rítmica fantástica quando batidos um contra o outro. Acompanha bico inflador descartável, fáceis de esvaziar e reutilizar.",
    iconName: "Megaphone",
    category: "barulho"
  },
  {
    id: 8,
    name: "Bandana Multifuncional Brasil",
    quantity: 1,
    description: "Bandana estilosa para amarrar na cabeça, pulso ou usar como máscara.",
    detailedDescription: "Tecido elástico de microfibra esportiva com alta respirabilidade. Absorve o suor no calor da comemoração e seca rapidamente, com estampa digital em alta definição das estrelas da nossa seleção.",
    iconName: "Sparkles",
    category: "vestuario"
  },
  {
    id: 9,
    name: "Pulseira de Torcida Confort",
    quantity: 1,
    description: "Pulseira elástica confortável e estilosa com estampa comemorativa.",
    detailedDescription: "Pulseira de alta elasticidade com o lema do orgulho verde e amarelo. Não irrita a pele, resistente ao suor e perfeita para usar no dia a dia demonstrando seu ritmo de torcedor.",
    iconName: "Award",
    category: "vestuario"
  },
  {
    id: 10,
    name: "Conjunto de Tatuagens Temporárias",
    quantity: 1,
    description: "Cartela com várias tatuagens de água de fácil aplicação e alta aderência.",
    detailedDescription: "Contém escudos da seleção, bandeirinhas, estrelas e frases de incentivo. Aplicação instantânea com algumas gotas de água e remoção simples com algodão e álcool.",
    iconName: "Smile",
    category: "festa"
  },
  {
    id: 11,
    name: "Lenço Brasileiro Temático",
    quantity: 1,
    description: "Lenço de cetim macio para prender no cabelo, pescoço ou carregar de acessório.",
    detailedDescription: "Toque refinado e estampa elegante para compor looks incríveis de torcedoras e torcedores. Pode ser amarrado na bolsa, usado como gola ou no penteado, destacando o visual com as cores do Brasil.",
    iconName: "Layers",
    category: "vestuario"
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: "PRODUTOS DE QUALIDADE",
    subtitle: "Resistentes e seguros",
    description: "Todos os itens são produzidos com materiais não tóxicos, seguros para todas as idades e pensados para durar a Copa inteira.",
    icon: "ShieldCheck"
  },
  {
    title: "DIVERSÃO GARANTIDA",
    subtitle: "Para todas as idades",
    description: "Desde adereços visuais até instrumentos de som e pintura facial, o kit oferece entretenimento garantido para todas as idades.",
    icon: "Smile"
  },
  {
    title: "PERFEITO PARA PRESENTEAR",
    subtitle: "Amigos, família e crianças",
    description: "Surpreenda quem você ama com uma caixa cheia de energia positiva e tudo o que é necessário para torcer com garra.",
    icon: "Gift"
  },
  {
    title: "PRATICIDADE COMPLETA",
    subtitle: "Fácil de transportar",
    description: "Reúna todos os itens essenciais na sua mochila para levar ao churrasco da firma, ao barzinho ou à casa dos amigos sem complicação.",
    icon: "Heart"
  }
];

export const REVIEWS: Review[] = [
  {
    name: "Guilherme Silva",
    city: "Belo Horizonte",
    state: "MG",
    rating: 5,
    comment: "Kit espetacular! Chegou em apenas 3 dias aqui em BH. A bandeira de 1,50m é bem grande e o material é excelente. Meus filhos adoraram a pintura facial e o óculos.",
    date: "25/05/2026",
    verified: true
  },
  {
    name: "Mariana Alencar",
    city: "São Paulo",
    state: "SP",
    rating: 5,
    comment: "Comprei o pacote de 3 kits para a família toda e economizei muito. Agora todo mundo tem seu óculos e vuvuzela. Os bastões infláveis e a pistola de confete vão fazer a festa no gol brasileiro!",
    date: "22/05/2026",
    verified: true
  },
  {
    name: "Rodrigo Costa",
    city: "Porto Alegre",
    state: "RS",
    rating: 5,
    comment: "Impressionado com o custo-benefício. Se eu fosse comprar cada um desses itens individualmente em lojas físicas perto de lojas de esporte, gastaria o dobro. O calendário da Copa 2026 já está na parede da sala!",
    date: "19/05/2026",
    verified: true
  },
  {
    name: "Beatriz Santos",
    city: "Salvador",
    state: "BA",
    rating: 4,
    comment: "Chegou tudo muito bem embalado. A bandana é super confortável e o óculos encaixou perfeitamente. O lenço de cetim é lindo demais! Ansiosa para que comecem os jogos.",
    date: "15/05/2026",
    verified: true
  }
];

export const FAQS: Faq[] = [
  {
    question: "Qual é o prazo de entrega para a minha região?",
    answer: "Nossos envios são feitos no mesmo dia com Envio Expresso. Para as regiões Sul, Sudeste e Centro-Oeste, o prazo estimado é de 2 a 5 dias úteis. Para as regiões Norte e Nordeste, de 4 a 7 dias úteis. Você recebe o código de rastreio automático por e-mail."
  },
  {
    question: "Todos os itens são seguros para crianças?",
    answer: "Sim! Todos os plásticos são atóxicos e livres de BPA. A tinta facial é hipoalergênica, testada dermatologicamente e se remove facilmente com água. A pistola de confetes funciona com mecanismo mecânico de mola, sem qualquer tipo de material inflamável ou pólvora."
  },
  {
    question: "Como funciona a garantia de satisfação?",
    answer: "Confiamos tanto na qualidade do Kit Torcedor Brasil que oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você receber o produto e não ficar satisfeito, devolvemos 100% do seu dinheiro sem burocracia."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos celular/PIX com desconto especial de aprovação imediata ou Cartão de Crédito parcelado em até 12x. Todas as compras são protegidas com criptografia de ponta a ponta e gateway de pagamento certificado."
  }
];
