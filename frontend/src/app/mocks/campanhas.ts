import { Campanha } from "../types/campanha";

const campanhas: Campanha[] = [
  {
    id: 1,
    title: "Campanha de Doação de Alimentos",
    author: "João Silva",
    createdAt: "10 Jan 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 75,
    description:
      "Uma campanha dedicada a arrecadar alimentos não perecíveis para apoiar famílias carentes, proporcionando segurança alimentar e alívio em momentos de necessidade. Contribua para garantir que essas famílias tenham acesso a refeições nutritivas e possam enfrentar dificuldades financeiras com dignidade e esperança. Juntos, podemos fazer a diferença e combater a fome.",
  },
  {
    id: 2,
    title: "Apoio à Educação Infantil",
    author: "Maria Souza",
    createdAt: "15 Fev 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 60,
    description:
      "Projeto para fornecer material escolar e apoio educacional para crianças de baixa renda.",
  },
  {
    id: 3,
    title: "Preservação Ambiental",
    author: "Carlos Oliveira",
    createdAt: "20 Mar 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 45,
    description: "Iniciativa para promover a conscientização e ações de preservação ambiental.",
  },
  {
    id: 4,
    title: "Adoção de Animais Abandonados",
    author: "Ana Lima",
    createdAt: "25 Abr 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 90,
    description: "Campanha para encontrar lares para animais abandonados.",
  },
  {
    id: 5,
    title: "Combate ao Desperdício de Alimentos",
    author: "Pedro Costa",
    createdAt: "30 Mai 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 80,
    description:
      "Projeto para reduzir o desperdício de alimentos e distribuir o excedente para quem precisa.",
  },
  {
    id: 6,
    title: "Inclusão Digital",
    author: "Luiza Martins",
    createdAt: "05 Jun 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 50,
    description:
      "Campanha para fornecer acesso à internet e recursos digitais para comunidades carentes.",
  },
  {
    id: 7,
    title: "Saúde Mental",
    author: "Ricardo Almeida",
    createdAt: "10 Jul 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 70,
    description: "Iniciativa para promover a saúde mental e o bem-estar emocional.",
  },
  {
    id: 8,
    title: "Arte e Cultura",
    author: "Fernanda Rocha",
    createdAt: "15 Ago 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 85,
    description: "Projeto para incentivar a produção e o acesso à arte e cultura em comunidades.",
  },
  {
    id: 9,
    title: "Esporte para Todos",
    author: "Roberto Fernandes",
    createdAt: "20 Set 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 95,
    description:
      "Campanha para promover a prática de esportes e atividades físicas para todas as idades.",
  },
  {
    id: 10,
    title: "Segurança no Trânsito",
    author: "Juliana Ribeiro",
    createdAt: "25 Out 2024",
    logoUrl: "./lagarto.png",
    completedPercentage: 65,
    description: "Iniciativa para promover a segurança no trânsito e reduzir acidentes.",
  },
];

export default campanhas;
