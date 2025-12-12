// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Download, Send, Edit, CheckCircle, Clock, FileText } from "lucide-react"
// import type { Invoice } from "@/types/crm"

// interface InvoiceDetailDialogProps {
//   invoice: Invoice | null
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function InvoiceDetailDialog({ invoice, open, onOpenChange }: InvoiceDetailDialogProps) {
//   if (!invoice) return null

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

//   const subtotal = invoice.items?.reduce((sum, item) => sum + item.amount, 0) || invoice.amount
//   const taxAmount = (subtotal * (invoice.tax || 0)) / 100
//   const total = subtotal + taxAmount - (invoice.discount || 0)

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center justify-between">
//             <span>Invoice Details</span>
//             <div className="flex items-center space-x-2">
//               <Button variant="outline" size="sm">
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Download className="h-4 w-4 mr-2" />
//                 Download
//               </Button>
//               <Button size="sm">
//                 <Send className="h-4 w-4 mr-2" />
//                 Send
//               </Button>
//             </div>
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Invoice Header */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-2xl">{invoice.invoiceNumber}</CardTitle>
//                   <p className="text-muted-foreground">Invoice to {invoice.customerName}</p>
//                 </div>
//                 <Badge variant="outline" className={getStatusColor(invoice.status)}>
//                   <div className="flex items-center gap-1">
//                     {getStatusIcon(invoice.status)}
//                     {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//                   </div>
//                 </Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div>
//                   <h4 className="font-semibold mb-2">Issue Date</h4>
//                   <p className="text-muted-foreground">{new Date(invoice.issueDate).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-2">Due Date</h4>
//                   <p className="text-muted-foreground">{new Date(invoice.dueDate).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-2">Total Amount</h4>
//                   <p className="text-2xl font-bold text-primary">${invoice.amount.toLocaleString()}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Invoice Items */}
//           {invoice.items && invoice.items.length > 0 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Invoice Items</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {invoice.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
//                     >
//                       <div className="flex-1">
//                         <h4 className="font-medium">{item.description}</h4>
//                         <p className="text-sm text-muted-foreground">
//                           Qty: {item.quantity} × ${item.rate.toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-semibold">${item.amount.toFixed(2)}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator className="my-4" />

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Subtotal:</span>
//                     <span>${subtotal.toFixed(2)}</span>
//                   </div>
//                   {invoice.tax && invoice.tax > 0 && (
//                     <div className="flex justify-between">
//                       <span>Tax ({invoice.tax}%):</span>
//                       <span>${taxAmount.toFixed(2)}</span>
//                     </div>
//                   )}
//                   {invoice.discount && invoice.discount > 0 && (
//                     <div className="flex justify-between">
//                       <span>Discount:</span>
//                       <span>-${invoice.discount.toFixed(2)}</span>
//                     </div>
//                   )}
//                   <Separator />
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total:</span>
//                     <span>${total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Notes */}
//           {invoice.notes && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Notes</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">{invoice.notes}</p>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
//testing
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Send,
  Edit,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"
import type { Invoice } from "@/types/crm"

interface InvoiceDetailDialogProps {
  invoice: Invoice | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditInvoice?: (invoice: Invoice) => void
  onDownloadInvoice?: (invoice: Invoice) => void
  onSendInvoice?: (invoice: Invoice) => void
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

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export function InvoiceDetailDialog({
  invoice,
  open,
  onOpenChange,
  onEditInvoice,
  onDownloadInvoice,
  onSendInvoice,
}: InvoiceDetailDialogProps) {
  if (!invoice) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <Clock className="h-4 w-4 text-red-500" />
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
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const subtotal =
    invoice.items?.reduce((sum, item) => sum + (item.amount ?? 0), 0) ??
    invoice.amount
  const taxRate = invoice.tax ?? 0
  const discount = invoice.discount ?? 0
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount - discount

  const handleEdit = () => onEditInvoice?.(invoice)
  const handleDownload = () => onDownloadInvoice?.(invoice)
  const handleSend = () => onSendInvoice?.(invoice)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Invoice Details</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button size="sm" onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {invoice.invoiceNumber}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Invoice to {invoice.customerName}
                  </p>
                </div>
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Issue Date</h4>
                  <p className="text-muted-foreground">
                    {formatDate(invoice.issueDate)}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Due Date</h4>
                  <p className="text-muted-foreground">
                    {formatDate(invoice.dueDate)}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Total Amount</h4>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(invoice.amount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          {invoice.items && invoice.items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Invoice Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} ×{" "}
                          {formatCurrency(item.rate ?? 0)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(item.amount ?? 0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {taxRate > 0 && (
                    <div className="flex justify-between">
                      <span>Tax ({taxRate}%):</span>
                      <span>{formatCurrency(taxAmount)}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {invoice.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{invoice.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
