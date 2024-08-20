import api from '@/api'
import { StatsClientPage } from './pageClient'
import { MonthGroup } from '@/types'
import { ChartConfig } from '@/components/ui/chart'

function getRandomColor(): string {
    const hue = Math.floor(Math.random() * (260 - 140 + 1)) + 140
    const saturation = Math.floor(Math.random() * 41) + 60
    const lightness = Math.floor(Math.random() * 21) + 40
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }
  
  function generateChartConfig(monthSummary: MonthGroup[]): ChartConfig {
    return monthSummary[0].players.reduce(
      (acc, player) => {
        acc[player.name.toLowerCase()] = {
          label: player.name,
          color: getRandomColor(),
        }
        return acc
      },
      {} as ChartConfig
    )
  }

export default async function StatsPage() {
  const tournamentRecords = await api.tournament.list()
  const monthSummary = api.tournament.getMonthSummary({ tournamentRecords })
  const chartConfig = generateChartConfig(monthSummary)

  return (
    <div className='flex flex-col gap-4'>
      <h2 className="text-3xl font-bold tracking-tight">Estadísticas</h2>
      <StatsClientPage monthSummary={monthSummary} chartConfig={chartConfig} />
    </div>
  )
}
