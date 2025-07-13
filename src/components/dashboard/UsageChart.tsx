"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { day: "Monday", usage: 1.8 },
  { day: "Tuesday", usage: 2.5 },
  { day: "Wednesday", usage: 1.5 },
  { day: "Thursday", usage: 3.1 },
  { day: "Friday", usage: 2.2 },
  { day: "Saturday", usage: 4.5 },
  { day: "Sunday", usage: 3.8 },
]

const chartConfig = {
  usage: {
    label: "Usage (GB)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function UsageChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis 
                label={{ value: 'Usage (GB)', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="usage" fill="var(--color-usage)" radius={8} />
        </BarChart>
    </ChartContainer>
  )
}
