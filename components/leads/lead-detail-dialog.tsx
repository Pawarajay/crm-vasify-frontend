

"use client"

import type React from "react"
import { useCRM } from "@/contexts/crm-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Building,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Clock,
} from "lucide-react"
import type { Lead } from "@/types/crm"

interface LeadDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onCallLead?: (lead: Lead) => void
  onEmailLead?: (lead: Lead) => void
  onWhatsAppLead?: (lead: Lead) => void
  onScheduleMeeting?: (lead: Lead) => void
  onCreateDeal?: (lead: Lead) => void
}

const formatDate = (value: unknown) => {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(value as string)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function LeadDetailDialog({
  open,
  onOpenChange,
  lead,
  onCallLead,
  onEmailLead,
  onWhatsAppLead,
  onScheduleMeeting,
  onCreateDeal,
}: LeadDetailDialogProps) {
  const { tasks } = useCRM()

  if (!lead) return null

  const leadTasks = tasks.filter(
    (task) => task.relatedTo.type === "lead" && task.relatedTo.id === lead.id,
  )

  const getStatusBadge = (status: Lead["status"]) => {
    const variants: Record<Lead["status"], string> = {
      new: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      contacted: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      qualified: "bg-green-100 text-green-800 hover:bg-green-100",
      proposal: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      negotiation: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      "closed-won": "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
      "closed-lost": "bg-red-100 text-red-800 hover:bg-red-100",
    }
    return variants[status] ?? variants.new
  }

  const getPriorityBadge = (priority: Lead["priority"]) => {
    const variants: Record<Lead["priority"], string> = {
      low: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      high: "bg-red-100 text-red-800 hover:bg-red-100",
    }
    return variants[priority] ?? variants.medium
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {lead.name?.charAt(0) ?? "L"}
              </span>
            </div>
            {lead.name}
          </DialogTitle>
          <DialogDescription>
            Complete lead profile and activity overview
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Lead Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </div>
                    <div className="text-sm">{lead.name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Status
                    </div>
                    <Badge className={getStatusBadge(lead.status)}>
                      {lead.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Email
                      </div>
                      <div className="text-sm">{lead.email || "No email"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Phone
                      </div>
                      <div className="text-sm">{lead.phone || "No phone"}</div>
                    </div>
                  </div>
                </div>

                {lead.whatsappNumber && (
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        WhatsApp
                      </div>
                      <div className="text-sm text-green-600">
                        {lead.whatsappNumber}
                      </div>
                    </div>
                  </div>
                )}

                {lead.company && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Company
                      </div>
                      <div className="text-sm">{lead.company}</div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Source
                    </div>
                    <div className="text-sm capitalize">
                      {lead.source?.replace("-", " ") || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Priority
                    </div>
                    <Badge className={getPriorityBadge(lead.priority)}>
                      {lead.priority}
                    </Badge>
                  </div>
                </div>

                {lead.notes && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Notes
                    </div>
                    <div className="text-sm bg-muted p-3 rounded-md">
                      {lead.notes}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-md"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          task.priority === "high"
                            ? "bg-red-500"
                            : task.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{task.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {task.type} • Due: {formatDate(task.dueDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {leadTasks.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No recent activity
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Estimated Value
                    </div>
                    <div className="text-lg font-bold">
                      {typeof lead.estimatedValue === "number"
                        ? `₹${lead.estimatedValue.toLocaleString()}`
                        : "—"}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Created
                    </div>
                    <div className="text-sm">{formatDate(lead.createdAt)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Expected Close
                    </div>
                    <div className="text-sm">
                      {lead.expectedCloseDate
                        ? formatDate(lead.expectedCloseDate)
                        : "Not set"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Lead Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["new", "contacted", "qualified", "proposal", "negotiation"].map(
                    (status, index) => {
                      const isActive = lead.status === status
                      const order = ["new", "contacted", "qualified", "proposal", "negotiation"]
                      const isPassed = order.indexOf(lead.status) > index

                      return (
                        <div key={status} className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isActive
                                ? "bg-primary"
                                : isPassed
                                  ? "bg-green-500"
                                  : "bg-muted"
                            }`}
                          />
                          <span
                            className={`text-sm capitalize ${
                              isActive
                                ? "font-medium text-primary"
                                : isPassed
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {status.replace("-", " ")}
                          </span>
                        </div>
                      )
                    },
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onCallLead?.(lead)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Lead
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onEmailLead?.(lead)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onWhatsAppLead?.(lead)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onScheduleMeeting?.(lead)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onCreateDeal?.(lead)}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Create Deal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
