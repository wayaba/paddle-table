'use client'

import {
  ChartConfig
} from '@/components/ui/chart'
import { PieContainer } from './ui/pieContainer'
import { ChartData, PieData } from '@/types'
import { GraphContainer } from './ui/graphContainer'

export function StatsClientPage({
  chartData,
  chartConfig,
  pieData
}: {
  chartData: ChartData[],
  chartConfig: ChartConfig,
  pieData: PieData[]
}) {
  
  return (
    <div className='flex flex-col gap-4'>
    <GraphContainer chartData={chartData} chartConfig={chartConfig}/>
    <PieContainer pieData={pieData}></PieContainer>
    </div>
  )
}
