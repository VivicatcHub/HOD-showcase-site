export type Member = {
  name: string;
  role: string;
  /** Local path under /public, e.g. "/members/ferreol.png" */
  image?: string;
};

export type RoleSlot = {
  role: string;
  member?: Member;
  suppleant?: Member;
};

export type Pole = {
  name: string;
  captain?: Member;
  suppleant?: Member;
};

export const bureauLeadership: { president?: Member; chancelier?: Member } = {
  president: { name: "DE MUIZON Ferréol", role: "Président" },
  chancelier: { name: "GUINET Valentin", role: "Chancelier (Co-Président)" },
};

export const bureauRoles: RoleSlot[] = [
  {
    role: "Responsable Communication",
    member: { name: "LEGRAND Yasmina", role: "Responsable de Communication" },
  },
  {
    role: "Trésorier",
    member: { name: "KWIHANGANA Clément", role: "Trésorier" },
  },
  {
    role: "Secrétaire",
    member: { name: "BERLET Alexis", role: "Secrétaire" },
  },
];

export const bureauSuppleant: Member | undefined = {
  name: "LAFOLIE Evan",
  role: "Suppléant du Bureau",
};

export const poles: Pole[] = [
  {
    name: "TCG (Trading Card Game)",
    captain: {
      name: "CORDAT-BOURSIAC Hector",
      role: "Capitaine du Pôle TCG (Trading Card Game)",
    },
  },
  {
    name: "Jeux de Trahisons",
    captain: {
      name: "NGUYEN Charles",
      role: "Capitaine du Pôle Jeux de Trahisons",
    },
  },
  {
    name: "Jeux de Réflexions",
    captain: {
      name: "JOUDI Omar",
      role: "Capitaine du Pôle Jeux de Réflexions",
    },
  },
  {
    name: "Jeux de Sociétés",
    captain: {
      name: "LEROY Léonard",
      role: "Capitaine du Pôle Jeux de Sociétés",
    },
  },
];
