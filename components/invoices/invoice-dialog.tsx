// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useCRM } from "@/contexts/crm-context"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Plus, Trash2 } from "lucide-react"
// import type { Invoice } from "@/types/crm"

// interface InvoiceDialogProps {
//   invoice: Invoice | null
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// interface InvoiceItem {
//   description: string
//   quantity: number
//   rate: number
//   amount: number
// }

// export function InvoiceDialog({ invoice, open, onOpenChange }: InvoiceDialogProps) {
//   const { customers, addInvoice, updateInvoice } = useCRM()
//   const [formData, setFormData] = useState({
//     customerId: "",
//     customerName: "",
//     invoiceNumber: "",
//     issueDate: "",
//     dueDate: "",
//     status: "draft" as const,
//     amount: 0,
//     tax: 0,
//     discount: 0,
//     notes: "",
//   })
//   const [items, setItems] = useState<InvoiceItem[]>([{ description: "", quantity: 1, rate: 0, amount: 0 }])

//   useEffect(() => {
//     if (invoice) {
//       setFormData({
//         customerId: invoice.customerId,
//         customerName: invoice.customerName,
//         invoiceNumber: invoice.invoiceNumber,
//         issueDate: invoice.issueDate
//           ? new Date(invoice.issueDate).toISOString().split("T")[0]
//           : new Date().toISOString().split("T")[0],
//         dueDate: invoice.dueDate
//           ? new Date(invoice.dueDate).toISOString().split("T")[0]
//           : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
//         status: invoice.status,
//         amount: invoice.amount,
//         tax: invoice.tax || 0,
//         discount: invoice.discount || 0,
//         notes: invoice.notes || "",
//       })
//       setItems(invoice.items || [{ description: "", quantity: 1, rate: 0, amount: 0 }])
//     } else {
//       setFormData({
//         customerId: "",
//         customerName: "",
//         invoiceNumber: `INV-${Date.now()}`,
//         issueDate: new Date().toISOString().split("T")[0],
//         dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
//         status: "draft",
//         amount: 0,
//         tax: 0,
//         discount: 0,
//         notes: "",
//       })
//       setItems([{ description: "", quantity: 1, rate: 0, amount: 0 }])
//     }
//   }, [invoice])

//   const handleCustomerChange = (customerId: string) => {
//     const customer = customers.find((c) => c.id === customerId)
//     setFormData((prev) => ({
//       ...prev,
//       customerId,
//       customerName: customer?.name || "",
//     }))
//   }

//   const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
//     const newItems = [...items]
//     newItems[index] = { ...newItems[index], [field]: value }

//     if (field === "quantity" || field === "rate") {
//       newItems[index].amount = newItems[index].quantity * newItems[index].rate
//     }

//     setItems(newItems)
//     calculateTotal(newItems)
//   }

//   const addItem = () => {
//     setItems([...items, { description: "", quantity: 1, rate: 0, amount: 0 }])
//   }

//   const removeItem = (index: number) => {
//     if (items.length > 1) {
//       const newItems = items.filter((_, i) => i !== index)
//       setItems(newItems)
//       calculateTotal(newItems)
//     }
//   }

//   const calculateTotal = (currentItems: InvoiceItem[]) => {
//     const subtotal = currentItems.reduce((sum, item) => sum + item.amount, 0)
//     const taxAmount = (subtotal * formData.tax) / 100
//     const total = subtotal + taxAmount - formData.discount
//     setFormData((prev) => ({ ...prev, amount: total }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     const invoiceData = {
//       ...formData,
//       issueDate: new Date(formData.issueDate).toISOString(),
//       dueDate: new Date(formData.dueDate).toISOString(),
//       items,
//     }

//     if (invoice) {
//       updateInvoice(invoice.id, invoiceData)
//     } else {
//       addInvoice(invoiceData)
//     }

//     onOpenChange(false)
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>{invoice ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="customer">Customer *</Label>
//               <Select value={formData.customerId} onValueChange={handleCustomerChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select customer" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {customers.map((customer) => (
//                     <SelectItem key={customer.id} value={customer.id}>
//                       {customer.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="invoiceNumber">Invoice Number *</Label>
//               <Input
//                 id="invoiceNumber"
//                 value={formData.invoiceNumber}
//                 onChange={(e) => setFormData((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="issueDate">Issue Date *</Label>
//               <Input
//                 id="issueDate"
//                 type="date"
//                 value={formData.issueDate}
//                 onChange={(e) => setFormData((prev) => ({ ...prev, issueDate: e.target.value }))}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="dueDate">Due Date *</Label>
//               <Input
//                 id="dueDate"
//                 type="date"
//                 value={formData.dueDate}
//                 onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="status">Status</Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="draft">Draft</SelectItem>
//                   <SelectItem value="sent">Sent</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="paid">Paid</SelectItem>
//                   <SelectItem value="overdue">Overdue</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Invoice Items */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 Invoice Items
//                 <Button type="button" variant="outline" size="sm" onClick={addItem}>
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Item
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {items.map((item, index) => (
//                 <div key={index} className="grid grid-cols-12 gap-2 items-end">
//                   <div className="col-span-5">
//                     <Label>Description</Label>
//                     <Input
//                       value={item.description}
//                       onChange={(e) => handleItemChange(index, "description", e.target.value)}
//                       placeholder="Item description"
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <Label>Quantity</Label>
//                     <Input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value) || 0)}
//                       min="1"
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <Label>Rate</Label>
//                     <Input
//                       type="number"
//                       value={item.rate}
//                       onChange={(e) => handleItemChange(index, "rate", Number.parseFloat(e.target.value) || 0)}
//                       min="0"
//                       step="0.01"
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <Label>Amount</Label>
//                     <Input value={`$${item.amount.toFixed(2)}`} readOnly className="bg-muted" />
//                   </div>
//                   <div className="col-span-1">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => removeItem(index)}
//                       disabled={items.length === 1}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Totals */}
//           <Card>
//             <CardContent className="pt-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="tax">Tax (%)</Label>
//                   <Input
//                     id="tax"
//                     type="number"
//                     value={formData.tax}
//                     onChange={(e) => {
//                       const tax = Number.parseFloat(e.target.value) || 0
//                       setFormData((prev) => ({ ...prev, tax }))
//                       calculateTotal(items)
//                     }}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="discount">Discount ($)</Label>
//                   <Input
//                     id="discount"
//                     type="number"
//                     value={formData.discount}
//                     onChange={(e) => {
//                       const discount = Number.parseFloat(e.target.value) || 0
//                       setFormData((prev) => ({ ...prev, discount }))
//                       calculateTotal(items)
//                     }}
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Total Amount</Label>
//                   <div className="text-2xl font-bold text-primary">${formData.amount.toFixed(2)}</div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Notes */}
//           <div className="space-y-2">
//             <Label htmlFor="notes">Notes</Label>
//             <Textarea
//               id="notes"
//               value={formData.notes}
//               onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
//               placeholder="Additional notes..."
//               rows={3}
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button type="submit">{invoice ? "Update Invoice" : "Create Invoice"}</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

//testing
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCRM } from "@/contexts/crm-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Invoice } from "@/types/crm"

interface InvoiceDialogProps {
  invoice: Invoice | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
}

type InvoiceFormState = {
  customerId: string
  customerName: string
  invoiceNumber: string
  issueDate: string
  dueDate: string
  status: Invoice["status"]
  amount: number
  tax: string
  discount: string
  notes: string
}

const DEFAULT_ITEM: InvoiceItem = {
  description: "",
  quantity: 1,
  rate: 0,
  amount: 0,
}

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export function InvoiceDialog({ invoice, open, onOpenChange }: InvoiceDialogProps) {
  const { customers, addInvoice, updateInvoice } = useCRM()
  const [formData, setFormData] = useState<InvoiceFormState>({
    customerId: "",
    customerName: "",
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    status: "draft",
    amount: 0,
    tax: "0",
    discount: "0",
    notes: "",
  })
  const [items, setItems] = useState<InvoiceItem[]>([DEFAULT_ITEM])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (invoice) {
      setFormData({
        customerId: invoice.customerId,
        customerName: invoice.customerName,
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.issueDate
          ? new Date(invoice.issueDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        dueDate: invoice.dueDate
          ? new Date(invoice.dueDate).toISOString().split("T")[0]
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
        status: invoice.status,
        amount: invoice.amount,
        tax:
          typeof invoice.tax === "number"
            ? String(invoice.tax)
            : String(invoice.tax ?? "0"),
        discount:
          typeof invoice.discount === "number"
            ? String(invoice.discount)
            : String(invoice.discount ?? "0"),
        notes: invoice.notes || "",
      })
      setItems(
        invoice.items && invoice.items.length > 0
          ? invoice.items.map((it) => ({
              description: it.description || "",
              quantity: it.quantity ?? 1,
              rate: it.rate ?? 0,
              amount: it.amount ?? (it.quantity ?? 1) * (it.rate ?? 0),
            }))
          : [DEFAULT_ITEM],
      )
    } else {
      const issueDate = new Date()
      const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      setFormData({
        customerId: "",
        customerName: "",
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: issueDate.toISOString().split("T")[0],
        dueDate: dueDate.toISOString().split("T")[0],
        status: "draft",
        amount: 0,
        tax: "0",
        discount: "0",
        notes: "",
      })
      setItems([DEFAULT_ITEM])
    }
    setError(null)
  }, [invoice, open])

  const recalcTotal = (currentItems: InvoiceItem[], taxStr: string, discountStr: string) => {
    const subtotal = currentItems.reduce((sum, item) => sum + (item.amount || 0), 0)
    const tax = taxStr ? Number(taxStr) : 0
    const discount = discountStr ? Number(discountStr) : 0
    const taxAmount = (subtotal * (Number.isNaN(tax) ? 0 : tax)) / 100
    const total = subtotal + taxAmount - (Number.isNaN(discount) ? 0 : discount)
    setFormData((prev) => ({ ...prev, amount: total }))
  }

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    setFormData((prev) => ({
      ...prev,
      customerId,
      customerName: customer?.name || "",
    }))
  }

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }

    if (field === "quantity" || field === "rate") {
      const q = Number(newItems[index].quantity) || 0
      const r = Number(newItems[index].rate) || 0
      newItems[index].amount = q * r
    }

    setItems(newItems)
    recalcTotal(newItems, formData.tax, formData.discount)
  }

  const addItem = () => {
    setItems((prev) => [...prev, { ...DEFAULT_ITEM }])
  }

  const removeItem = (index: number) => {
    if (items.length <= 1) return
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    recalcTotal(newItems, formData.tax, formData.discount)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.customerId) {
      setError("Customer is required.")
      return
    }

    if (!formData.invoiceNumber.trim()) {
      setError("Invoice number is required.")
      return
    }

    if (!formData.issueDate || !formData.dueDate) {
      setError("Issue date and due date are required.")
      return
    }

    const taxNumber = formData.tax ? Number(formData.tax) : 0
    const discountNumber = formData.discount ? Number(formData.discount) : 0

    if (Number.isNaN(taxNumber) || taxNumber < 0) {
      setError("Tax must be a non-negative number.")
      return
    }

    if (Number.isNaN(discountNumber) || discountNumber < 0) {
      setError("Discount must be a non-negative number.")
      return
    }

    const cleanedItems = items.filter(
      (it) => it.description.trim() || it.amount > 0,
    )

    if (cleanedItems.length === 0) {
      setError("Add at least one invoice item.")
      return
    }

    const issueDateISO = new Date(formData.issueDate).toISOString()
    const dueDateISO = new Date(formData.dueDate).toISOString()

    const invoiceData: Omit<Invoice, "id"> = {
      customerId: formData.customerId,
      customerName: formData.customerName,
      invoiceNumber: formData.invoiceNumber.trim(),
      issueDate: issueDateISO,
      dueDate: dueDateISO,
      status: formData.status,
      amount: formData.amount,
      tax: taxNumber,
      discount: discountNumber,
      notes: formData.notes.trim(),
      items: cleanedItems.map((it) => ({
        description: it.description.trim(),
        quantity: it.quantity,
        rate: it.rate,
        amount: it.amount,
      })),
    }

    setIsSubmitting(true)
    try {
      if (invoice) {
        await updateInvoice(invoice.id, invoiceData as any)
      } else {
        await addInvoice(invoiceData as any)
      }
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {invoice ? "Edit Invoice" : "Create New Invoice"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select
                value={formData.customerId}
                onValueChange={handleCustomerChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    invoiceNumber: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date *</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, issueDate: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Invoice["status"]) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Invoice Items
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          Number.parseInt(e.target.value || "0") || 0,
                        )
                      }
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Rate</Label>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "rate",
                          Number.parseFloat(e.target.value || "0") || 0,
                        )
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Amount</Label>
                    <Input
                      value={formatCurrency(item.amount)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Totals */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax (%)</Label>
                  <Input
                    id="tax"
                    type="number"
                    value={formData.tax}
                    onChange={(e) => {
                      const tax = e.target.value
                      setFormData((prev) => ({ ...prev, tax }))
                      recalcTotal(items, tax, formData.discount)
                    }}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (₹)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => {
                      const discount = e.target.value
                      setFormData((prev) => ({ ...prev, discount }))
                      recalcTotal(items, formData.tax, discount)
                    }}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total Amount</Label>
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(formData.amount)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {invoice ? "Update Invoice" : "Create Invoice"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
