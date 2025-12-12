// "use client"

// import { useState } from "react"
// import { useCRM } from "@/contexts/crm-context"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Plus,
//   Search,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Trash2,
//   Download,
//   Send,
//   DollarSign,
//   FileText,
//   Clock,
//   CheckCircle,
// } from "lucide-react"
// import { InvoiceDialog } from "./invoice-dialog"
// import { InvoiceDetailDialog } from "./invoice-detail-dialog"
// import type { Invoice } from "@/types/crm"

// export function InvoicesContent() {
//   const { invoices, deleteInvoice } = useCRM()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<string>("all")
//   const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

//   const filteredInvoices = invoices.filter((invoice) => {
//     const matchesSearch =
//       invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
//     return matchesSearch && matchesStatus
//   })

//   const handleEdit = (invoice: Invoice) => {
//     setSelectedInvoice(invoice)
//     setIsDialogOpen(true)
//   }

//   const handleView = (invoice: Invoice) => {
//     setSelectedInvoice(invoice)
//     setIsDetailDialogOpen(true)
//   }

//   const handleDelete = (id: string) => {
//     if (confirm("Are you sure you want to delete this invoice?")) {
//       deleteInvoice(id)
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "paid":
//         return <CheckCircle className="h-4 w-4 text-green-500" />
//       case "pending":
//         return <Clock className="h-4 w-4 text-yellow-500" />
//       case "overdue":
//         return <Clock className="h-4 w-4 text-red-500" />
//       default:
//         return <FileText className="h-4 w-4 text-gray-500" />
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "paid":
//         return "bg-green-100 text-green-800 border-green-200"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200"
//       case "overdue":
//         return "bg-red-100 text-red-800 border-red-200"
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200"
//     }
//   }

//   const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
//   const paidAmount = filteredInvoices
//     .filter((inv) => inv.status === "paid")
//     .reduce((sum, invoice) => sum + invoice.amount, 0)
//   const pendingAmount = filteredInvoices
//     .filter((inv) => inv.status === "pending")
//     .reduce((sum, invoice) => sum + invoice.amount, 0)
//   const overdueAmount = filteredInvoices
//     .filter((inv) => inv.status === "overdue")
//     .reduce((sum, invoice) => sum + invoice.amount, 0)

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
//           <p className="text-muted-foreground">Manage your invoices and billing</p>
//         </div>
//         <Button
//           onClick={() => {
//             setSelectedInvoice(null)
//             setIsDialogOpen(true)
//           }}
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Create Invoice
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
//             <p className="text-xs text-muted-foreground">All invoices</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Paid</CardTitle>
//             <CheckCircle className="h-4 w-4 text-green-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</div>
//             <p className="text-xs text-muted-foreground">Completed payments</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending</CardTitle>
//             <Clock className="h-4 w-4 text-yellow-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</div>
//             <p className="text-xs text-muted-foreground">Awaiting payment</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Overdue</CardTitle>
//             <Clock className="h-4 w-4 text-red-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</div>
//             <p className="text-xs text-muted-foreground">Past due date</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search invoices..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full sm:w-48">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="draft">Draft</SelectItem>
//                 <SelectItem value="sent">Sent</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="paid">Paid</SelectItem>
//                 <SelectItem value="overdue">Overdue</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Invoices Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Invoice #</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Issue Date</TableHead>
//                 <TableHead>Due Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredInvoices.map((invoice) => (
//                 <TableRow key={invoice.id}>
//                   <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
//                   <TableCell>{invoice.customerName}</TableCell>
//                   <TableCell className="font-semibold">${invoice.amount.toLocaleString()}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={getStatusColor(invoice.status)}>
//                       <div className="flex items-center gap-1">
//                         {getStatusIcon(invoice.status)}
//                         {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//                       </div>
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
//                   <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem onClick={() => handleView(invoice)}>
//                           <Eye className="h-4 w-4 mr-2" />
//                           View Details
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleEdit(invoice)}>
//                           <Edit className="h-4 w-4 mr-2" />
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Download className="h-4 w-4 mr-2" />
//                           Download PDF
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Send className="h-4 w-4 mr-2" />
//                           Send to Customer
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleDelete(invoice.id)} className="text-red-600">
//                           <Trash2 className="h-4 w-4 mr-2" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Dialogs */}
//       <InvoiceDialog invoice={selectedInvoice} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
//       <InvoiceDetailDialog invoice={selectedInvoice} open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen} />
//     </div>
//   )
// }
//testing
"use client"

import { useMemo, useState } from "react"
import { useCRM } from "@/contexts/crm-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Send,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react"
import { InvoiceDialog } from "./invoice-dialog"
import { InvoiceDetailDialog } from "./invoice-detail-dialog"
import type { Invoice } from "@/types/crm"

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "paid":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "overdue":
      return <Clock className="h-4 w-4 text-red-500" />
    case "draft":
    case "sent":
    default:
      return <FileText className="h-4 w-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200"
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "sent":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function InvoicesContent() {
  const { invoices, deleteInvoice } = useCRM()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredInvoices = useMemo(
    () =>
      invoices.filter((invoice) => {
        const matchesSearch =
          !normalizedSearch ||
          invoice.invoiceNumber.toLowerCase().includes(normalizedSearch) ||
          invoice.customerName.toLowerCase().includes(normalizedSearch)

        const matchesStatus =
          statusFilter === "all" || invoice.status === statusFilter

        return matchesSearch && matchesStatus
      }),
    [invoices, normalizedSearch, statusFilter],
  )

  const totals = useMemo(() => {
    const base = { total: 0, paid: 0, pending: 0, overdue: 0 }
    return filteredInvoices.reduce((acc, invoice) => {
      const amount =
        typeof invoice.amount === "number"
          ? invoice.amount
          : Number(invoice.amount ?? 0) || 0

      acc.total += amount
      if (invoice.status === "paid") acc.paid += amount
      if (invoice.status === "pending") acc.pending += amount
      if (invoice.status === "overdue") acc.overdue += amount
      return acc
    }, base)
  }, [filteredInvoices])

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsDialogOpen(true)
  }

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsDetailDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(id)
    }
  }

  const handleDownload = (invoice: Invoice) => {
    // TODO: wire to PDF/export logic
    console.log("Download invoice", invoice.id)
  }

  const handleSend = (invoice: Invoice) => {
    // TODO: wire to email/send logic
    console.log("Send invoice", invoice.id)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">
            Manage your invoices and billing
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedInvoice(null)
            setIsDialogOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totals.total)}
            </div>
            <p className="text-xs text-muted-foreground">All invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totals.paid)}
            </div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(totals.pending)}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totals.overdue)}
            </div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => {
                const amount =
                  typeof invoice.amount === "number"
                    ? invoice.amount
                    : Number(invoice.amount ?? 0) || 0

                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell>{invoice.customerName}</TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(amount)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(invoice.status)}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(invoice.status)}
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(invoice)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(invoice)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(invoice)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSend(invoice)}>
                            <Send className="h-4 w-4 mr-2" />
                            Send to Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(invoice.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <InvoiceDialog
        invoice={selectedInvoice}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <InvoiceDetailDialog
        invoice={selectedInvoice}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        onEditInvoice={handleEdit}
        onDownloadInvoice={handleDownload}
        onSendInvoice={handleSend}
      />
    </div>
  )
}
