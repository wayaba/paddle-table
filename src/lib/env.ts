export const ENV = {
    PATH_SHEET_2024: process.env.PATH_SHEET_2024 || '',
    PATH_SHEET_PLAYERS: process.env.PATH_SHEET_PLAYERS || '',
    POINTS_WIN: parseInt(process.env.POINTS_WIN || "3", 10),
    POINTS_LOSS: parseInt(process.env.POINTS_LOSS || "0", 10),
    POINTS_DRAW: parseInt(process.env.POINTS_DRAW || "1", 10)
};