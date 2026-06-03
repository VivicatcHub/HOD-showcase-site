export const HOD_CONFIG = {
  sheetId: "VOTRE_SHEET_ID",
  eventsSheetName: "events",
  gamesSheetName: "ludotheque",
  discordUrl: "https://discord.gg/votre-serveur",
  registrationFormUrl: "https://forms.gle/votre-formulaire",
  contactEmail: "contact@hod-association.fr",
};

export const getSheetCsvUrl = (sheetName: string) =>
  `https://docs.google.com/spreadsheets/d/${HOD_CONFIG.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
