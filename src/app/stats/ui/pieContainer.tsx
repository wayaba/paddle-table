"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieData } from "@/types"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  game: {
    label: "Game",
    color: "hsl(var(--chart-1))",
  },
  drop: {
    label: "Drop",
    color: "hsl(var(--chart-2))",
  },
  ace: {
    label: "Ace",
    color: "hsl(var(--chart-3))",
  },
  errors: {
    label: "Errores",
    color: "hsl(var(--chart-4))",
  },
  zapatero: {
    label: "Zapatero",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function PieContainer({pieData}:{pieData: PieData[]}) {
  const totalVisitors = React.useMemo(() => {
    return pieData.reduce((acc, curr) => acc + curr.quantity, 0)
  }, [pieData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Totales tipos de puntos</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="quantity"
              nameKey="point"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Puntos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Totales en lo que va del año <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Sumarizando los tipos de puntos
        </div>
      </CardFooter>
    </Card>
  )
}
