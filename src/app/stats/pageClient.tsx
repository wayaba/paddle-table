'use client'

import {
  ChartConfig
} from '@/components/ui/chart'
import { PieContainer } from './ui/pieContainer'
import { ChartData, PieData, PlayerStats } from '@/types'
import { GraphContainer } from './ui/graphContainer'
import { PlayerSummary } from './ui/playerSummary'
export function StatsClientPage({
  chartData,
  chartConfig,
  pieData,
  playerStats
}: {
  chartData: ChartData[],
  chartConfig: ChartConfig,
  pieData: PieData[],
  playerStats: PlayerStats[]
}) {
  
  return (
    <div className='flex flex-col gap-4'>
    <GraphContainer chartData={chartData} chartConfig={chartConfig}/>
    <PieContainer pieData={pieData}></PieContainer>
    <PlayerSummary playerStats={playerStats}></PlayerSummary>
    </div>
  )
}
