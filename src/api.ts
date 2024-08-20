import { ENV } from "./lib/env";
import type { PlayerRecord, PlayerInfo, MonthGroup, PlayerSummary } from "./types";

const api = {
    match: {
        list: async (): Promise<PlayerRecord[]> => {
            return fetch(
                `${ENV.PATH_SHEET_2024}`,
                { next: { tags: ["matches"] } },
            )
                .then((res) => res.text())
                .then((text) => {
                    return text
                        .split("\n")
                        .slice(1)
                        .map((row) => {

                            const [date, name, game, ace, drop, errors, zapatero] = row.split("\t");

                            const zapateroClean = zapatero.replace(/[\n\r]/g, '').trim()

                            return {
                                date,
                                name,
                                game: game ? parseInt(game) : 0,
                                ace: ace ? parseInt(ace) : 0,
                                drop: drop ? parseInt(drop) : 0,
                                errors: errors ? parseInt(errors) : 0,
                                zapatero: zapateroClean ? parseInt(zapateroClean) : 0
                            };
                        })
                        .filter(item => item !== null);
                });
        },
    },
    tournament: {
        list: async (): Promise<Record<string, PlayerRecord[]>> => {
            const playerRecords = await api.match.list();

            return playerRecords.reduce<Record<string, PlayerRecord[]>>((acc, obj) => {
                const key = getMonthYear(obj.date);
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {});
        },
        getMonthSummary: ({
            tournamentRecords
        }: {
            tournamentRecords: Record<string, PlayerRecord[]>
        }): MonthGroup[] => {

            const result: MonthGroup[] = Object.entries(tournamentRecords).map(
                ([month, records]) => {
                    const groupedByName = records.reduce<Record<string, PlayerSummary>>(
                        (acc, obj) => {
                            const name = obj.name
                            if (!acc[name]) {
                                acc[name] = {
                                    name,
                                    game: 0,
                                    ace: 0,
                                    drop: 0,
                                    errors: 0,
                                    zapatero: 0,
                                    total: 0
                                }
                            }
                            acc[name].game += obj.game
                            acc[name].ace += obj.ace
                            acc[name].drop += obj.drop
                            acc[name].errors += obj.errors
                            acc[name].zapatero += obj.zapatero
                            acc[name].total =
                                acc[name].game +
                                acc[name].ace +
                                acc[name].drop -
                                acc[name].errors +
                                acc[name].zapatero
                            return acc
                        },
                        {}
                    )

                    return {
                        month,
                        players: Object.values(groupedByName)
                    }
                }
            )
            return result
        }
    },
    player: {
        list: async (): Promise<PlayerInfo[]> => {
            return fetch(
                `${ENV.PATH_SHEET_PLAYERS}`,
                { next: { tags: ["matches"] } },
            )
                .then((res) => res.text())
                .then((text) => {
                    return text
                        .split("\n")
                        .slice(1)
                        .map((row) => {

                            const [nickname, name, lastname, description, phone, email, imagePath] = row.split("\t");

                            return {
                                nickname,
                                name,
                                lastname,
                                description,
                                phone,
                                email,
                                imagePath: imagePath.replace(/[\n\r]/g, '').trim()
                            };
                        })
                });
        },
    },
};

function getMonthYear(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${month}/${year}`;
}


export default api;