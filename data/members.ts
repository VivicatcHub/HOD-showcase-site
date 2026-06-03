export type Member = {
  name: string;
  role: string;
};

export const bureauMembers: Member[] = [
  { name: "Camille Durand", role: "Présidente" },
  { name: "Noah Lefèvre", role: "Vice-président" },
  { name: "Sarah Morel", role: "Trésorière" },
  { name: "Lucas Martin", role: "Secrétaire" },
];

export const caMembers: Member[] = [
  { name: "Emma Bernard", role: "Administratrice" },
  { name: "Hugo Petit", role: "Administrateur" },
  { name: "Jade Laurent", role: "Administratrice" },
];
