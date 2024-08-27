'use client'

import {
  ChartConfig
} from '@/components/ui/chart'
import { PieContainer } from './ui/pieContainer'
import { ChartData, PieData, PlayerInfo, PlayerStats } from '@/types'
import { GraphContainer } from './ui/graphContainer'
import { PlayerSummary } from './ui/playerSummary'
export function StatsClientPage({
  chartData,
  chartConfig,
  pieData,
  playerStats,
  playersInfo,
}: {
  chartData: ChartData[],
  chartConfig: ChartConfig,
  pieData: PieData[],
  playerStats: PlayerStats[],
  playersInfo: PlayerInfo[]
}) {
  
  return (
    <div className='flex flex-col gap-4'>
    <GraphContainer chartData={chartData} chartConfig={chartConfig}/>
    <PieContainer pieData={pieData}></PieContainer>
    <PlayerSummary playerStats={playerStats} playersInfo={playersInfo}></PlayerSummary>
    </div>
  )
}
