import api from '@/api'
import HomeClient from './pageClient'
import { MonthGroup, PlayerRecord, PlayerSummary } from '@/types'

function getMonthSummary({
  tournamentRecords
}: {
  tournamentRecords: Record<string, PlayerRecord[]>
}) {
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

export default async function Home() {
  const tournamentRecords = await api.tournament.list()

  return <HomeClient monthGroups={getMonthSummary({tournamentRecords})} tournamentRecords={tournamentRecords} />
}
