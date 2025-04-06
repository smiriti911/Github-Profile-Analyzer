"use client"

import type { CommitData } from "@/components/github-profile-analyzer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface CommitActivityProps {
  commitData: CommitData[]
  username: string
}

export function CommitActivity({ commitData, username }: CommitActivityProps) {
  // Format dates for display
  const formattedData = commitData.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count: item.count,
    fullDate: item.date,
  }))

  return (
    <Card className="bg-blue-50 border-blue-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-blue-700">Commit Activity</CardTitle>
        <CardDescription className="text-blue-500">Daily commit activity for {username} over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 60,
              }}
            >
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12, fill: "#1E40AF" }} />
              <YAxis
                allowDecimals={false}
                label={{ value: "Commits", angle: -90, position: "insideLeft", style: { textAnchor: "middle", fill: "#1E40AF" } }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white border border-blue-300 p-2 rounded-md shadow-md">
                        <p className="font-medium text-blue-800">{data.fullDate}</p>
                        <p className="text-blue-600">{data.count} commits</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}