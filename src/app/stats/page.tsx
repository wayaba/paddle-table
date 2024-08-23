import api from '@/api'
import { StatsClientPage } from './pageClient'
import {
  ChartData,
  MonthGroup,
  PieData,
  PlayerRecord,
  PlayerStats,
  PlayerStatsData
} from '@/types'
import { ChartConfig } from '@/components/ui/chart'

function getRandomColor(): string {
  const hue = Math.floor(Math.random() * (260 - 140 + 1)) + 140
  const saturation = Math.floor(Math.random() * 41) + 60
  const lightness = Math.floor(Math.random() * 21) + 40
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

function generateChartConfig(monthSummary: MonthGroup[]): ChartConfig {
  return monthSummary[0].players.reduce((acc, player) => {
    acc[player.name.toLowerCase()] = {
      label: player.name,
      color: getRandomColor()
    }
    return acc
  }, {} as ChartConfig)
}

function generateChartData(monthSummary: MonthGroup[]): ChartData[] {
  return monthSummary.map((item) => {
    const month = item.month.split('/')[0] // Obtiene el mes en formato "MM"
    const playersData = item.players.reduce((acc, player) => {
      acc[player.name.toLowerCase()] = player.total
      return acc
    }, {} as Record<string, number>)

    return { month, ...playersData }
  })
}

function generatePieData(monthSummary: MonthGroup[]): PieData[] {
  const totals: Record<string, number> = {
    game: 0,
    drop: 0,
    ace: 0,
    errors: 0,
    zapatero: 0
  }

  monthSummary.forEach((month) => {
    month.players.forEach((player) => {
      totals.game += player.game
      totals.drop += player.drop
      totals.ace += player.ace
      totals.errors += player.errors
      totals.zapatero += player.zapatero
    })
  })

  return Object.entries(totals).map(([key, value]) => ({
    point: key,
    quantity: value,
    fill: `var(--color-${key})`
  }))
}

function generatePlayerSummary({
  tournamentRecords
}: {
  tournamentRecords: Record<string, PlayerRecord[]>
}): PlayerStats[] {
  const playersSummary = Object.values(tournamentRecords)
    .flat()
    .reduce((acc, match) => {
      const { name, game, ace, drop, errors, zapatero } = match

      if (!acc[name]) {
        acc[name] = {
          game: 0,
          ace: 0,
          drop: 0,
          errors: 0,
          zapatero: 0,
          total: 0
        }
      }

      acc[name].game += game
      acc[name].ace += ace
      acc[name].drop += drop
      acc[name].errors += errors
      acc[name].zapatero += zapatero
      acc[name].total =
        acc[name].game +
        acc[name].ace +
        acc[name].drop -
        acc[name].errors +
        acc[name].zapatero
      return acc
    }, {} as Record<string, PlayerStatsData>)

  return Object.entries(playersSummary).map(([name, stats]) => ({
    name,
    ...stats
  })).sort((a, b) => b.total - a.total);
}

export default async function StatsPage() {
  const tournamentRecords = await api.tournament.list()
  const monthSummary = api.tournament.getMonthSummary({ tournamentRecords })
  const chartConfig = generateChartConfig(monthSummary)
  const chartData = generateChartData(monthSummary)
  const pieData = generatePieData(monthSummary)
  const playerStats =generatePlayerSummary({ tournamentRecords })
  

  return (
    <div className="flex flex-col max-w-xs gap-4 m-auto sm:max-w-full ">
      <StatsClientPage
        chartData={chartData}
        chartConfig={chartConfig}
        pieData={pieData}
        playerStats={playerStats}
      />
    </div>
  )
}
