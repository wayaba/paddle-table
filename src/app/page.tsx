import api from '@/api'
import HomeClient from './pageClient'

export default async function Home() {
  const tournament = await api.tournament.list()

  return <HomeClient monthGroups={tournament} />
}
