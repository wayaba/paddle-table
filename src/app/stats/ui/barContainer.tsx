'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { PlayerStats } from '@/types'

const chartConfig = {
  quantity: {
    label: 'Cantidad'
  },
  ace: {
    label: 'Ace',
    color: 'hsl(var(--chart-1))'
  },
  drop: {
    label: 'Drop',
    color: 'hsl(var(--chart-2))'
  },
  errors: {
    label: 'Errores',
    color: 'hsl(var(--chart-3))'
  },
  zapatero: {
    label: 'Zapatero',
    color: 'hsl(var(--chart-4))'
  },
  game: {
    label: 'Game',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

interface BarContainerProps {
  game: number
  ace: number
  drop: number
  errors: number
  zapatero: number
  name: string
}

export function BarContainer({
  playerStats,
  total
}: {
  playerStats: PlayerStats
  total: number
}) {
  const chartData = [
    { point: 'game', quantity: playerStats.game, fill: 'var(--color-game)' },
    { point: 'ace', quantity: playerStats.ace, fill: 'var(--color-ace)' },
    { point: 'drop', quantity: playerStats.drop, fill: 'var(--color-drop)' },
    { point: 'errors', quantity: playerStats.errors, fill: 'var(--color-errors)' },
    { point: 'zapatero', quantity: playerStats.zapatero, fill: 'var(--color-zapatero)' }
  ]
  return (

        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0
            }}
          >
            <YAxis
              dataKey="point"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="quantity" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="quantity" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      
  )
}
