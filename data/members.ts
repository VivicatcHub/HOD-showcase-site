export type Member = {
  name: string;
  role: string;
  image?: string;
};

export type Pole = {
  name: string;
  captain?: Member;
  suppleant?: Member;
};

export const president: Member | undefined = {
  name: "GUINET Valentin",
  role: "Président",
};

export const poles: Pole[] = [
  {
    name: "TCG (Trading Card Game)",
    captain: {
      name: "CORDAT-BOURSIAC Hector",
      role: "Capitaine",
    },
  },
  {
    name: "Jeux de Trahisons",
    captain: {
      name: "NGUYEN Charles",
      role: "Capitaine",
    },
    suppleant: {
      name: "SAJOT Krys",
      role: "Vice-Capitaine",
    },
  },
  {
    name: "Jeux de Réflexions",
    captain: {
      name: "JOUDI Omar",
      role: "Capitaine",
    },
  },
  {
    name: "Jeux de Sociétés",
    captain: {
      name: "LEROY Léonard",
      role: "Capitaine",
    },
  },
  {
    name: "Poker",
    captain: {
      name: "GIRARD Mathieu",
      role: "Capitaine",
    },
  },
];
