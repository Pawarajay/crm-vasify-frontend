"use client"

import { useMemo, useState } from "react"
import { useCRM } from "@/contexts/crm-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeadDialog } from "./lead-dialog"
import { LeadDetailDialog } from "./lead-detail-dialog"
import { ConvertLeadDialog } from "./convert-lead-dialog"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  UserCheck,
} from "lucide-react"
import type { Lead } from "@/types/crm"

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

export function LeadsContent() {
  const { leads, deleteLead } = useCRM()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false)

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        const matchesSearch =
          !normalizedSearch ||
          (lead.name?.toLowerCase() ?? "").includes(normalizedSearch) ||
          (lead.email?.toLowerCase() ?? "").includes(normalizedSearch) ||
          (lead.company?.toLowerCase() ?? "").includes(normalizedSearch) ||
          (lead.phone ?? "").includes(searchTerm)

        const matchesStatus = statusFilter === "all" || lead.status === statusFilter
        const matchesPriority =
          priorityFilter === "all" || lead.priority === priorityFilter

        return matchesSearch && matchesStatus && matchesPriority
      }),
    [leads, normalizedSearch, searchTerm, statusFilter, priorityFilter],
  )

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (leadId: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      void deleteLead(leadId)
    }
  }

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailDialogOpen(true)
  }

  const handleConvert = (lead: Lead) => {
    setSelectedLead(lead)
    setIsConvertDialogOpen(true)
  }

  const handleCallLead = (lead: Lead) => {
    if (!lead.phone) return
    window.open(`tel:${lead.phone}`, "_self")
  }

  const handleEmailLead = (lead: Lead) => {
    if (!lead.email) return
    window.location.href = `mailto:${lead.email}`
  }

  const handleWhatsAppLead = (lead: Lead) => {
    const number = lead.whatsappNumber || lead.phone
    if (!number) return
    const text = encodeURIComponent("Hi, I'd like to follow up regarding our discussion.")
    window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener,noreferrer")
  }

  const handleScheduleMeeting = (lead: Lead) => {
    console.log("Schedule meeting for lead:", lead.id)
  }

  const handleCreateDeal = (lead: Lead) => {
    console.log("Create deal from lead:", lead.id)
  }

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

  const stats = useMemo(() => {
    const total = leads.length
    const byStatus = {
      new: leads.filter((l) => l.status === "new").length,
      qualified: leads.filter((l) => l.status === "qualified").length,
      win: leads.filter((l) => l.status === "closed-won").length,
    }
    const totalValue = leads.reduce(
      (sum, lead) =>
        sum +
        (typeof lead.estimatedValue === "number"
          ? lead.estimatedValue
          : Number(lead.estimatedValue ?? 0) || 0),
      0,
    )

    return {
      total,
      new: byStatus.new,
      qualified: byStatus.qualified,
      win: byStatus.win,
      totalValue,
    }
  }, [leads])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-serif">Leads</h1>
          <p className="text-muted-foreground">Manage and track your sales leads</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <p className="text-xs text-muted-foreground">New Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
            <p className="text-xs text-muted-foreground">Qualified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-600">{stats.win}</div>
            <p className="text-xs text-muted-foreground">Closed Win</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ₹{stats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
          <CardDescription>Track and manage your sales leads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed-won">Closed Win</SelectItem>
                <SelectItem value="closed-lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground">
              {filteredLeads.length} of {leads.length} leads
            </div>
          </div>

          {/* Leads Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Expected Close</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {searchTerm ||
                      statusFilter !== "all" ||
                      priorityFilter !== "all"
                        ? "No leads found matching your filters."
                        : "No leads yet. Add your first lead!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onDoubleClick={() => handleViewDetails(lead)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {lead.name?.charAt(0) ?? "L"}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {lead.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{lead.company || "—"}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {lead.source}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {lead.phone || "No phone"}
                          </span>
                        </div>
                        {lead.whatsappNumber && (
                          <div className="flex items-center space-x-2 mt-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm text-green-600">WhatsApp</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(lead.status)}>
                          {lead.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(lead.priority)}>
                          {lead.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {typeof lead.estimatedValue === "number"
                            ? `₹${lead.estimatedValue.toLocaleString()}`
                            : "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {lead.expectedCloseDate
                            ? formatDate(lead.expectedCloseDate)
                            : "—"}
                        </div>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              aria-label="Open actions"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewDetails(lead)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(lead)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleConvert(lead)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Convert to Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleCallLead(lead)}>
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEmailLead(lead)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(lead.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <LeadDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        lead={null}
        mode="add"
      />

      <LeadDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        lead={selectedLead}
        mode="edit"
      />

      <LeadDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        lead={selectedLead}
        onCallLead={handleCallLead}
        onEmailLead={handleEmailLead}
        onWhatsAppLead={handleWhatsAppLead}
        onScheduleMeeting={handleScheduleMeeting}
        onCreateDeal={handleCreateDeal}
      />

      <ConvertLeadDialog
        open={isConvertDialogOpen}
        onOpenChange={setIsConvertDialogOpen}
        lead={selectedLead}
      />
    </div>
  )
}
