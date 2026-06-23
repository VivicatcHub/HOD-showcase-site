export const HOD_CONFIG = {
  sheetId: "1y3zDYIZ5gihhiTcooscsQuXqsN9qNJGNYLva7NJ_KvU",
  gamesSheetName: "2026",
  // Member investment / XP tracking lives in a separate spreadsheet.
  xpSheetId: "1O79n_yug6bVrpj_rlqX1B7mHOvmbxO6G17QcfiO2JvQ",
  // The last entry is the current sheet, shown by default; the rest are selectable from a dropdown.
  xpSheetNames: ["2025-2026-2", "2026-2027-1"],
  // https://calendar.google.com/calendar/embed?src=a70b821d6efc8c128f416db27264ef4824158b5165389e92b8c7e7e0add5d912%40group.calendar.google.com&ctz=Europe%2FParis
  eventsCalendarId:
    "a70b821d6efc8c128f416db27264ef4824158b5165389e92b8c7e7e0add5d912@group.calendar.google.com",
  discordUrl: "https://discord.gg/sXksSNqttB",
  registrationFormUrl: "https://forms.gle/UAZvzUJWnGvZY3FJA",
  contactEmail: "heavenofdice@gmail.com",
};

export const getSheetCsvUrl = (
  sheetName: string,
  sheetId: string = HOD_CONFIG.sheetId,
) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
