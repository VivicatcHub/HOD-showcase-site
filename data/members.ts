export type Member = {
  name: string;
  role: string;
};

export const bureauMembers: Member[] = [
  { name: "DE MUIZON Ferréol", role: "Président" },
  { name: "GUINET Valentin", role: "Chancelier (Co-Président)" },
  { name: "KWIHANGANA Clément", role: "Trésorier" },
  { name: "BERLET Alexis", role: "Secrétaire" },
  { name: "LEGRAND Yasmina", role: "Responsable de Communication" },
];

export const caMembers: Member[] = [
  { name: "LAFOLIE Evan", role: "Suppléant du Bureau" },
  {
    name: "CORDAT-BOURSIAC Hector",
    role: "Capitaine du Pôle TCG (Trading Card Game)",
  },
  { name: "NGUYEN Charles", role: "Capitaine du Pôle Jeux de Trahisons" },
  { name: "JOUDI Omar", role: "Capitaine du Pôle Jeux de Réflexions" },
  { name: "LEROY Léonard", role: "Capitaine du Pôle Jeux de Sociétés" },
];
