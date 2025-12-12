// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { useCRM } from "@/contexts/crm-context"
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   Area,
//   AreaChart,
// } from "recharts"
// import { TrendingUp, TrendingDown, Users, Target, DollarSign, Download } from "lucide-react"

// const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

// export function ReportsContent() {
//   const { customers, leads, deals, tasks } = useCRM()
//   const [dateRange, setDateRange] = useState("30")

//   // Calculate KPIs
//   const totalCustomers = customers.length
//   const totalLeads = leads.length
//   const totalDeals = deals.length
//   const totalRevenue = deals.filter((d) => d.status === "won").reduce((sum, d) => sum + d.value, 0)
//   const avgDealValue = totalRevenue / deals.filter((d) => d.status === "won").length || 0
//   const conversionRate = totalCustomers > 0 ? (totalCustomers / (totalCustomers + totalLeads)) * 100 : 0
//   const completedTasks = tasks.filter((t) => t.status === "completed").length
//   const taskCompletionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

//   // Sales Pipeline Data
//   const pipelineData = [
//     {
//       stage: "Prospecting",
//       count: deals.filter((d) => d.stage === "prospecting").length,
//       value: deals.filter((d) => d.stage === "prospecting").reduce((sum, d) => sum + d.value, 0),
//     },
//     {
//       stage: "Qualification",
//       count: deals.filter((d) => d.stage === "qualification").length,
//       value: deals.filter((d) => d.stage === "qualification").reduce((sum, d) => sum + d.value, 0),
//     },
//     {
//       stage: "Proposal",
//       count: deals.filter((d) => d.stage === "proposal").length,
//       value: deals.filter((d) => d.stage === "proposal").reduce((sum, d) => sum + d.value, 0),
//     },
//     {
//       stage: "Negotiation",
//       count: deals.filter((d) => d.stage === "negotiation").length,
//       value: deals.filter((d) => d.stage === "negotiation").reduce((sum, d) => sum + d.value, 0),
//     },
//     {
//       stage: "Closed Won",
//       count: deals.filter((d) => d.stage === "closed-won").length,
//       value: deals.filter((d) => d.stage === "closed-won").reduce((sum, d) => sum + d.value, 0),
//     },
//   ]

//   // Lead Source Data
//   const leadSourceData = [
//     { source: "Website", count: leads.filter((l) => l.source === "website").length },
//     { source: "Referral", count: leads.filter((l) => l.source === "referral").length },
//     { source: "Social Media", count: leads.filter((l) => l.source === "social-media").length },
//     { source: "Email Campaign", count: leads.filter((l) => l.source === "email-campaign").length },
//     { source: "Cold Call", count: leads.filter((l) => l.source === "cold-call").length },
//   ]

//   // Monthly Revenue Trend (mock data for demo)
//   const revenueData = [
//     { month: "Jan", revenue: 45000, deals: 12 },
//     { month: "Feb", revenue: 52000, deals: 15 },
//     { month: "Mar", revenue: 48000, deals: 13 },
//     { month: "Apr", revenue: 61000, deals: 18 },
//     { month: "May", revenue: 55000, deals: 16 },
//     { month: "Jun", revenue: 67000, deals: 20 },
//   ]

//   // Customer Growth Data
//   const customerGrowthData = [
//     { month: "Jan", customers: 45, leads: 23 },
//     { month: "Feb", customers: 52, leads: 28 },
//     { month: "Mar", customers: 48, leads: 25 },
//     { month: "Apr", customers: 61, leads: 32 },
//     { month: "May", customers: 55, leads: 29 },
//     { month: "Jun", customers: 67, leads: 35 },
//   ]

//   const exportReport = () => {
//     // Mock export functionality
//     alert("Report exported successfully!")
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
//           <p className="text-gray-600 mt-1">Comprehensive business insights and performance metrics</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Select value={dateRange} onValueChange={setDateRange}>
//             <SelectTrigger className="w-40">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="7">Last 7 days</SelectItem>
//               <SelectItem value="30">Last 30 days</SelectItem>
//               <SelectItem value="90">Last 90 days</SelectItem>
//               <SelectItem value="365">Last year</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button onClick={exportReport} className="bg-blue-600 hover:bg-blue-700">
//             <Download className="w-4 h-4 mr-2" />
//             Export Report
//           </Button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
//             <div className="flex items-center text-xs text-muted-foreground">
//               <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
//               +12.5% from last month
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalCustomers}</div>
//             <div className="flex items-center text-xs text-muted-foreground">
//               <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
//               +8.2% from last month
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//             <Target className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
//             <div className="flex items-center text-xs text-muted-foreground">
//               <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
//               -2.1% from last month
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Avg Deal Value</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${avgDealValue.toLocaleString()}</div>
//             <div className="flex items-center text-xs text-muted-foreground">
//               <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
//               +5.7% from last month
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts Row 1 */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Sales Pipeline</CardTitle>
//             <CardDescription>Deals by stage and value</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={pipelineData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="stage" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value, name) => [
//                     name === "value" ? `$${value.toLocaleString()}` : value,
//                     name === "value" ? "Value" : "Count",
//                   ]}
//                 />
//                 <Bar dataKey="count" fill="#3b82f6" name="count" />
//                 <Bar dataKey="value" fill="#10b981" name="value" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Lead Sources</CardTitle>
//             <CardDescription>Distribution of lead sources</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={leadSourceData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="count"
//                 >
//                   {leadSourceData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts Row 2 */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Revenue Trend</CardTitle>
//             <CardDescription>Monthly revenue and deal count</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={revenueData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value, name) => [
//                     name === "revenue" ? `$${value.toLocaleString()}` : value,
//                     name === "revenue" ? "Revenue" : "Deals",
//                   ]}
//                 />
//                 <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
//                 <Line type="monotone" dataKey="deals" stroke="#10b981" strokeWidth={2} />
//               </AreaChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Customer Growth</CardTitle>
//             <CardDescription>Customer and lead acquisition over time</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={customerGrowthData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2} name="Customers" />
//                 <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} name="Leads" />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Performance Metrics */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Task Performance</CardTitle>
//             <CardDescription>Task completion metrics</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Completed Tasks</span>
//               <Badge variant="secondary">{completedTasks}</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Total Tasks</span>
//               <Badge variant="outline">{tasks.length}</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Completion Rate</span>
//               <Badge variant={taskCompletionRate >= 80 ? "default" : "destructive"}>
//                 {taskCompletionRate.toFixed(1)}%
//               </Badge>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${taskCompletionRate}%` }}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Deal Status</CardTitle>
//             <CardDescription>Current deal distribution</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Won Deals</span>
//               <Badge className="bg-green-100 text-green-800">{deals.filter((d) => d.status === "won").length}</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Active Deals</span>
//               <Badge className="bg-blue-100 text-blue-800">{deals.filter((d) => d.status === "active").length}</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Lost Deals</span>
//               <Badge className="bg-red-100 text-red-800">{deals.filter((d) => d.status === "lost").length}</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Win Rate</span>
//               <Badge variant="secondary">
//                 {deals.length > 0
//                   ? ((deals.filter((d) => d.status === "won").length / deals.length) * 100).toFixed(1)
//                   : 0}
//                 %
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Lead Quality</CardTitle>
//             <CardDescription>Lead scoring and quality metrics</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Hot Leads</span>
//               <Badge className="bg-red-100 text-red-800">{leads.filter((l) => l.score >= 80).length}</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Warm Leads</span>
//               <Badge className="bg-yellow-100 text-yellow-800">
//                 {leads.filter((l) => l.score >= 50 && l.score < 80).length}
//               </Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Cold Leads</span>
//               <Badge className="bg-gray-100 text-gray-800">{leads.filter((l) => l.score < 50).length}</Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Avg Score</span>
//               <Badge variant="secondary">
//                 {leads.length > 0 ? (leads.reduce((sum, l) => sum + l.score, 0) / leads.length).toFixed(1) : 0}
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }



//testing
"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCRM } from "@/contexts/crm-context"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  Download,
} from "lucide-react"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`

export function ReportsContent() {
  const { customers, leads, deals, tasks } = useCRM()
  const [dateRange, setDateRange] = useState("30")

  const {
    totalCustomers,
    totalLeads,
    totalDeals,
    totalRevenue,
    avgDealValue,
    conversionRate,
    completedTasks,
    taskCompletionRate,
    pipelineData,
    leadSourceData,
  } = useMemo(() => {
    const totalCustomers = customers.length
    const totalLeads = leads.length
    const totalDeals = deals.length

    const normalizeValue = (v: unknown) =>
      typeof v === "number" ? v : Number(v ?? 0) || 0

    const wonDeals = deals.filter((d) => d.status === "won")
    const totalRevenue = wonDeals.reduce(
      (sum, d) => sum + normalizeValue(d.value),
      0,
    )
    const avgDealValue =
      wonDeals.length > 0 ? totalRevenue / wonDeals.length : 0

    const conversionRate =
      totalCustomers + totalLeads > 0
        ? (totalCustomers / (totalCustomers + totalLeads)) * 100
        : 0

    const completedTasks = tasks.filter((t) => t.status === "completed").length
    const taskCompletionRate =
      tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

    const pipelineStages = [
      "prospecting",
      "qualification",
      "proposal",
      "negotiation",
      "closed-won",
    ] as const

    const labelMap: Record<(typeof pipelineStages)[number], string> = {
      prospecting: "Prospecting",
      qualification: "Qualification",
      proposal: "Proposal",
      negotiation: "Negotiation",
      "closed-won": "Closed Won",
    }

    const pipelineData = pipelineStages.map((stage) => {
      const stageDeals = deals.filter((d) => d.stage === stage)
      return {
        stage: labelMap[stage],
        count: stageDeals.length,
        value: stageDeals.reduce(
          (sum, d) => sum + normalizeValue(d.value),
          0,
        ),
      }
    })

    const leadSourceData = [
      { source: "Website", key: "website" },
      { source: "Referral", key: "referral" },
      { source: "Social Media", key: "social-media" },
      { source: "Email Campaign", key: "email-campaign" },
      { source: "Cold Call", key: "cold-call" },
    ].map(({ source, key }) => ({
      source,
      count: leads.filter((l) => l.source === key).length,
    }))

    return {
      totalCustomers,
      totalLeads,
      totalDeals,
      totalRevenue,
      avgDealValue,
      conversionRate,
      completedTasks,
      taskCompletionRate,
      pipelineData,
      leadSourceData,
    }
  }, [customers, leads, deals, tasks])

  // Monthly Revenue Trend (mock data for demo)
  const revenueData = [
    { month: "Jan", revenue: 45000, deals: 12 },
    { month: "Feb", revenue: 52000, deals: 15 },
    { month: "Mar", revenue: 48000, deals: 13 },
    { month: "Apr", revenue: 61000, deals: 18 },
    { month: "May", revenue: 55000, deals: 16 },
    { month: "Jun", revenue: 67000, deals: 20 },
  ]

  // Customer Growth Data
  const customerGrowthData = [
    { month: "Jan", customers: 45, leads: 23 },
    { month: "Feb", customers: 52, leads: 28 },
    { month: "Mar", customers: 48, leads: 25 },
    { month: "Apr", customers: 61, leads: 32 },
    { month: "May", customers: 55, leads: 29 },
    { month: "Jun", customers: 67, leads: 35 },
  ]

  const exportReport = () => {
    // Mock export functionality
    alert("Report exported successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={exportReport}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversionRate.toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Deal Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(avgDealValue)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +5.7% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Deals by stage and value</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    name === "value"
                      ? formatCurrency(Number(value || 0))
                      : value,
                    name === "value" ? "Value" : "Count",
                  ]}
                />
                <Bar dataKey="count" fill="#3b82f6" name="count" />
                <Bar dataKey="value" fill="#10b981" name="value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution of lead sources</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, percent }) =>
                    `${source} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and deal count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    name === "revenue"
                      ? formatCurrency(Number(value || 0))
                      : value,
                    name === "revenue" ? "Revenue" : "Deals",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="deals"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>
              Customer and lead acquisition over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Customers"
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Performance</CardTitle>
            <CardDescription>Task completion metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completed Tasks</span>
              <Badge variant="secondary">{completedTasks}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Tasks</span>
              <Badge variant="outline">{tasks.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion Rate</span>
              <Badge
                variant={taskCompletionRate >= 80 ? "default" : "destructive"}
              >
                {taskCompletionRate.toFixed(1)}%
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${taskCompletionRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Status</CardTitle>
            <CardDescription>Current deal distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Won Deals</span>
              <Badge className="bg-green-100 text-green-800">
                {deals.filter((d) => d.status === "won").length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Deals</span>
              <Badge className="bg-blue-100 text-blue-800">
                {deals.filter((d) => d.status === "active").length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lost Deals</span>
              <Badge className="bg-red-100 text-red-800">
                {deals.filter((d) => d.status === "lost").length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Win Rate</span>
              <Badge variant="secondary">
                {deals.length > 0
                  ? (
                      (deals.filter((d) => d.status === "won").length /
                        deals.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Quality</CardTitle>
            <CardDescription>Lead scoring and quality metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Hot Leads</span>
              <Badge className="bg-red-100 text-red-800">
                {leads.filter((l) => l.score >= 80).length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Warm Leads</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                {
                  leads.filter(
                    (l) => l.score >= 50 && l.score < 80,
                  ).length
                }
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cold Leads</span>
              <Badge className="bg-gray-100 text-gray-800">
                {leads.filter((l) => l.score < 50).length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Score</span>
              <Badge variant="secondary">
                {leads.length > 0
                  ? (
                      leads.reduce((sum, l) => sum + l.score, 0) / leads.length
                    ).toFixed(1)
                  : 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
