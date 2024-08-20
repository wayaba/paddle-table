import api from '@/api'
import HomeClient from './pageClient'

export default async function Home() {
  const tournamentRecords = await api.tournament.list()

  return (
    <HomeClient
      monthGroups={api.tournament.getMonthSummary({ tournamentRecords })}
      tournamentRecords={tournamentRecords}
    />
  )
}
