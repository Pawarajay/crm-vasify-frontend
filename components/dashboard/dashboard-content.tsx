// "use client"

// import { useCRM } from "@/contexts/crm-context"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Users, UserPlus, TrendingUp, DollarSign, CheckSquare, AlertTriangle } from "lucide-react"

// export function DashboardContent() {
//   const { customers, leads, deals, tasks, invoices, renewalReminders } = useCRM()

//   const stats = [
//     {
//       title: "Total Customers",
//       value: customers.length,
//       description: "Active customers",
//       icon: Users,
//       color: "text-blue-600",
//     },
//     {
//       title: "Active Leads",
//       value: leads.filter((lead) => !["closed-won", "closed-lost"].includes(lead.status)).length,
//       description: "Potential customers",
//       icon: UserPlus,
//       color: "text-green-600",
//     },
//     {
//       title: "Open Deals",
//       value: deals.filter((deal) => !["closed-won", "closed-lost"].includes(deal.stage)).length,
//       description: "In progress",
//       icon: TrendingUp,
//       color: "text-purple-600",
//     },
//     {
//       title: "Revenue",
//       value: `$${deals
//         .filter((deal) => deal.stage === "closed-won")
//         .reduce((sum, deal) => sum + deal.value, 0)
//         .toLocaleString()}`,
//       description: "This month",
//       icon: DollarSign,
//       color: "text-emerald-600",
//     },
//     {
//       title: "Pending Tasks",
//       value: tasks.filter((task) => task.status === "pending").length,
//       description: "Due this week",
//       icon: CheckSquare,
//       color: "text-orange-600",
//     },
//     {
//       title: "Renewals Due",
//       value: renewalReminders.filter((reminder) => {
//         const daysUntilExpiry = Math.ceil(
//           (reminder.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
//         )
//         return daysUntilExpiry <= 30 && daysUntilExpiry > 0
//       }).length,
//       description: "Next 30 days",
//       icon: AlertTriangle,
//       color: "text-red-600",
//     },
//   ]

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold font-serif">Dashboard</h1>
//         <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//               <stat.icon className={`h-4 w-4 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground">{stat.description}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Customers</CardTitle>
//             <CardDescription>Latest customer additions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {customers.slice(0, 5).map((customer) => (
//                 <div key={customer.id} className="flex items-center space-x-4">
//                   <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
//                     <span className="text-sm font-medium text-primary">{customer.name.charAt(0)}</span>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium truncate">{customer.name}</p>
//                     <p className="text-xs text-muted-foreground truncate">{customer.company}</p>
//                   </div>
//                   <div className="text-sm text-muted-foreground">${customer.totalValue.toLocaleString()}</div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Upcoming Tasks</CardTitle>
//             <CardDescription>Tasks due this week</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {tasks
//                 .filter((task) => task.status === "pending")
//                 .slice(0, 5)
//                 .map((task) => (
//                   <div key={task.id} className="flex items-center space-x-4">
//                     <div
//                       className={`w-2 h-2 rounded-full ${
//                         task.priority === "high"
//                           ? "bg-red-500"
//                           : task.priority === "medium"
//                             ? "bg-yellow-500"
//                             : "bg-green-500"
//                       }`}
//                     />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">{task.title}</p>
//                       <p className="text-xs text-muted-foreground">Due: {task.dueDate.toLocaleDateString()}</p>
//                     </div>
//                     <div className="text-xs text-muted-foreground capitalize">{task.type}</div>
//                   </div>
//                 ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


//testing
"use client"

import { useMemo } from "react"
import { useCRM } from "@/contexts/crm-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, TrendingUp, DollarSign, CheckSquare, AlertTriangle } from "lucide-react"

const formatDate = (value: unknown) => {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value as string)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

export function DashboardContent() {
  const { customers, leads, deals, tasks, renewalReminders } = useCRM()

  const stats = useMemo(() => {
    const totalCustomers = customers.length

    const activeLeads = leads.filter(
      (lead) => !["closed-won", "closed-lost"].includes(lead.status),
    ).length

    const openDeals = deals.filter(
      (deal) => !["closed-won", "closed-lost"].includes(deal.stage),
    ).length

    const closedWonRevenue = deals
      .filter((deal) => deal.stage === "closed-won")
      .reduce((sum, deal) => sum + (deal.value ?? 0), 0)

    const pendingTasks = tasks.filter((task) => task.status === "pending").length

    const renewalsDue = renewalReminders.filter((reminder) => {
      const expiry =
        reminder.expiryDate instanceof Date
          ? reminder.expiryDate
          : new Date(reminder.expiryDate as string)
      if (Number.isNaN(expiry.getTime())) return false
      const daysUntilExpiry = Math.ceil(
        (expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      )
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0
    }).length

    return [
      {
        title: "Total Customers",
        value: totalCustomers,
        description: "Active customers",
        icon: Users,
        color: "text-blue-600",
      },
      {
        title: "Active Leads",
        value: activeLeads,
        description: "Potential customers",
        icon: UserPlus,
        color: "text-green-600",
      },
      {
        title: "Open Deals",
        value: openDeals,
        description: "In progress",
        icon: TrendingUp,
        color: "text-purple-600",
      },
      {
        title: "Revenue",
        value: `₹${closedWonRevenue.toLocaleString()}`,
        description: "Closed-won deals",
        icon: DollarSign,
        color: "text-emerald-600",
      },
      {
        title: "Pending Tasks",
        value: pendingTasks,
        description: "Due tasks",
        icon: CheckSquare,
        color: "text-orange-600",
      },
      {
        title: "Renewals Due",
        value: renewalsDue,
        description: "Next 30 days",
        icon: AlertTriangle,
        color: "text-red-600",
      },
    ]
  }, [customers, leads, deals, tasks, renewalReminders])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>Latest customer additions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.slice(0, 5).map((customer) => (
                <div key={customer.id} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {customer.name?.charAt(0) ?? "C"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {customer.name || "Unnamed customer"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {customer.company || "—"}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {typeof customer.totalValue === "number"
                      ? `₹${customer.totalValue.toLocaleString()}`
                      : "—"}
                  </div>
                </div>
              ))}
              {customers.length === 0 && (
                <p className="text-sm text-muted-foreground">No customers yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === "pending")
                .slice(0, 5)
                .map((task) => (
                  <div key={task.id} className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {formatDate(task.dueDate)}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {task.type}
                    </div>
                  </div>
                ))}
              {tasks.filter((task) => task.status === "pending").length === 0 && (
                <p className="text-sm text-muted-foreground">No pending tasks.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

