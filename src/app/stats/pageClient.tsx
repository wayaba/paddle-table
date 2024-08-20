'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { MonthGroup } from '@/types'

interface ChartData {
  month: string
  [key: string]: string | number // El mes es un string, los jugadores serán números
}

export function StatsClientPage({
  monthSummary,
  chartConfig
}: {
  monthSummary: MonthGroup[],
  chartConfig: ChartConfig
}) {
  const chartData: ChartData[] = monthSummary.map((item) => {
    const month = item.month.split('/')[0] // Obtiene el mes en formato "MM"
    const playersData = item.players.reduce((acc, player) => {
      acc[player.name.toLowerCase()] = player.total
      return acc
    }, {} as Record<string, number>)

    return { month, ...playersData }
  })

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(chartConfig).map(([key, config]) => (
          <Bar
            key={key}
            dataKey={key}
            fill={config.color}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
