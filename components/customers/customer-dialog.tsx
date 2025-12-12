
// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useCRM } from "@/contexts/crm-context"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { X } from "lucide-react"
// import type { Customer } from "@/types/crm"

// interface CustomerDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   customer: Customer | null
//   mode: "add" | "edit"
// }

// type CustomerFormState = {
//   name: string
//   email: string
//   phone: string
//   company: string
//   address: string
//   city: string
//   state: string
//   zipCode: string
//   country: string
//   status: Customer["status"]
//   source: string
//   notes: string
//   whatsappNumber: string
//   totalValue: string
//   services: string[]
// }

// const DEFAULT_FORM: CustomerFormState = {
//   name: "",
//   email: "",
//   phone: "",
//   company: "",
//   address: "",
//   city: "",
//   state: "",
//   zipCode: "",
//   country: "India",
//   status: "prospect",
//   source: "",
//   notes: "",
//   whatsappNumber: "",
//   totalValue: "0",
//   services: [],
// }

// const SERVICE_OPTIONS = [
//   "WhatsApp Business Api",
//   "CRM",
//   "Website development",
// ]

// export function CustomerDialog({ open, onOpenChange, customer, mode }: CustomerDialogProps) {
//   const { addCustomer, updateCustomer } = useCRM()
//   const [formData, setFormData] = useState<CustomerFormState>(DEFAULT_FORM)
//   const [tags, setTags] = useState<string[]>([])
//   const [newTag, setNewTag] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   useEffect(() => {
//     if (customer && mode === "edit") {
//       setFormData({
//         name: customer.name ?? "",
//         email: customer.email ?? "",
//         phone: customer.phone ?? "",
//         company: customer.company ?? "",
//         address: customer.address ?? "",
//         city: customer.city ?? "",
//         state: customer.state ?? "",
//         zipCode: customer.zipCode ?? "",
//         country: customer.country ?? "India",
//         status: customer.status ?? "prospect",
//         source: customer.source ?? "",
//         notes: customer.notes ?? "",
//         whatsappNumber: customer.whatsappNumber ?? "",
//         totalValue:
//           typeof customer.totalValue === "number"
//             ? String(customer.totalValue)
//             : customer.totalValue ?? "0",
//         services: Array.isArray((customer as any).services)
//           ? (customer as any).services
//           : ((customer as any).service ? [(customer as any).service] : []),
//       })
//       setTags(Array.isArray(customer.tags) ? customer.tags : [])
//     } else {
//       setFormData(DEFAULT_FORM)
//       setTags([])
//     }
//     setNewTag("")
//     setError(null)
//   }, [customer, mode, open])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)

//     if (!formData.name.trim()) return setError("Name is required.")
//     if (!formData.email.trim()) return setError("Email is required.")
//     if (!formData.phone.trim()) return setError("Phone is required.")

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(formData.email)) return setError("Enter a valid email address.")

//     const totalValueNumber = Number(formData.totalValue || 0)
//     if (Number.isNaN(totalValueNumber) || totalValueNumber < 0) {
//       return setError("Total value must be a valid non-negative number.")
//     }

//     if (!formData.services || formData.services.length === 0) {
//       return setError("Please select at least one service.")
//     }

//     const customerData = {
//       ...formData,
//       totalValue: totalValueNumber,
//       tags,
//       lastContactDate: customer?.lastContactDate,
//     }

//     setIsSubmitting(true)
//     try {
//       const success =
//         mode === "add"
//           ? await addCustomer(customerData as any)
//           : customer
//           ? await updateCustomer(customer.id, customerData as any)
//           : false

//       if (success) {
//         onOpenChange(false)
//         setFormData(DEFAULT_FORM)
//         setTags([])
//         setNewTag("")
//       } else {
//         setError("Failed to save customer. Try again.")
//       }
//     } catch (err: any) {
//       setError(err?.message ?? "Failed to save customer.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const addTagHandler = () => {
//     if (newTag.trim() && !tags.includes(newTag.trim())) {
//       setTags([...tags, newTag.trim()])
//     }
//     setNewTag("")
//   }

//   const removeTag = (tagToRemove: string) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove))
//   }

//   const toggleService = (service: string) => {
//     setFormData((prev) => {
//       if (prev.services.includes(service)) {
//         return { ...prev, services: prev.services.filter((s) => s !== service) }
//       }
//       return { ...prev, services: [...prev.services, service] }
//     })
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>{mode === "add" ? "Add New Customer" : "Edit Customer"}</DialogTitle>
//           <DialogDescription>
//             {mode === "add"
//               ? "Add a new customer to your CRM system."
//               : "Update customer information and details."}
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name *</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email *</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone *</Label>
//               <Input
//                 id="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
//               <Input
//                 id="whatsappNumber"
//                 type="tel"
//                 value={formData.whatsappNumber}
//                 onChange={(e) =>
//                   setFormData({ ...formData, whatsappNumber: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           {/* Company + Value */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="company">Company</Label>
//               <Input
//                 id="company"
//                 value={formData.company}
//                 onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="totalValue">Total Value (₹)</Label>
//               <Input
//                 id="totalValue"
//                 type="number"
//                 value={formData.totalValue}
//                 onChange={(e) =>
//                   setFormData({ ...formData, totalValue: e.target.value })
//                 }
//                 min="0"
//               />
//             </div>
//           </div>

//           {/* Address Info */}
//           <div className="space-y-2">
//             <Label htmlFor="address">Address</Label>
//             <Input
//               id="address"
//               value={formData.address}
//               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <Input
//               id="city"
//               value={formData.city}
//               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//               placeholder="City"
//             />
//             <Input
//               id="state"
//               value={formData.state}
//               onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//               placeholder="State"
//             />
//             <Input
//               id="zipCode"
//               value={formData.zipCode}
//               onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
//               placeholder="ZIP"
//             />
//           </div>

//           {/* Status */}
//           <div className="space-y-2">
//             <Label>Status</Label>
//             <select
//               className="border rounded px-3 py-2 text-sm"
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData({ ...formData, status: e.target.value as Customer["status"] })
//               }
//             >
//               <option value="prospect">Prospect</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           {/* Source */}
//           <div className="space-y-2">
//             <Label htmlFor="source">Source</Label>
//             <Input
//               id="source"
//               value={formData.source}
//               onChange={(e) => setFormData({ ...formData, source: e.target.value })}
//             />
//           </div>

//           {/* Services */}
//           <div className="space-y-2">
//             <Label>Services *</Label>
//             <div className="flex flex-wrap gap-2">
//               {SERVICE_OPTIONS.map((service) => {
//                 const selected = formData.services.includes(service)
//                 return (
//                   <button
//                     key={service}
//                     type="button"
//                     onClick={() => toggleService(service)}
//                     className={`text-xs px-3 py-1 rounded-full border transition ${
//                       selected
//                         ? "bg-primary text-primary-foreground border-primary"
//                         : "bg-background text-foreground hover:bg-muted"
//                     }`}
//                   >
//                     {service}
//                   </button>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="space-y-2">
//             <Label>Tags</Label>
//             <div className="flex flex-wrap gap-2 mb-2">
//               {tags.map((tag) => (
//                 <Badge key={tag} variant="secondary" className="flex items-center gap-1">
//                   {tag}
//                   <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
//                 </Badge>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <Input
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//               />
//               <Button type="button" variant="outline" onClick={addTagHandler}>
//                 Add
//               </Button>
//             </div>
//           </div>

//           {/* Notes */}
//           <div className="space-y-2">
//             <Label htmlFor="notes">Notes</Label>
//             <Textarea
//               id="notes"
//               value={formData.notes}
//               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//             />
//           </div>

//           {error && (
//             <p className="text-sm text-destructive border border-destructive/30 rounded p-2">
//               {error}
//             </p>
//           )}

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting
//                 ? mode === "add"
//                   ? "Adding..."
//                   : "Updating..."
//                 : mode === "add"
//                 ? "Add Customer"
//                 : "Update Customer"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

//testing responsive ui
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useCRM } from "@/contexts/crm-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X, User, Building, Phone, Mail, MapPin, Tag, FileText, DollarSign } from "lucide-react"
import type { Customer } from "@/types/crm"

interface CustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
  mode: "add" | "edit"
}

type CustomerFormState = {
  name: string
  email: string
  phone: string
  company: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  status: Customer["status"]
  source: string
  notes: string
  whatsappNumber: string
  totalValue: string
  services: string[]
}

const DEFAULT_FORM: CustomerFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",
  status: "prospect",
  source: "",
  notes: "",
  whatsappNumber: "",
  totalValue: "0",
  services: [],
}

const SERVICE_OPTIONS = [
  "WhatsApp Business Api",
  "CRM",
  "Website development",
]

export function CustomerDialog({ open, onOpenChange, customer, mode }: CustomerDialogProps) {
  const { addCustomer, updateCustomer } = useCRM()
  const [formData, setFormData] = useState<CustomerFormState>(DEFAULT_FORM)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (customer && mode === "edit") {
      setFormData({
        name: customer.name ?? "",
        email: customer.email ?? "",
        phone: customer.phone ?? "",
        company: customer.company ?? "",
        address: customer.address ?? "",
        city: customer.city ?? "",
        state: customer.state ?? "",
        zipCode: customer.zipCode ?? "",
        country: customer.country ?? "India",
        status: customer.status ?? "prospect",
        source: customer.source ?? "",
        notes: customer.notes ?? "",
        whatsappNumber: customer.whatsappNumber ?? "",
        totalValue:
          typeof customer.totalValue === "number"
            ? String(customer.totalValue)
            : customer.totalValue ?? "0",
        services: Array.isArray((customer as any).services)
          ? (customer as any).services
          : ((customer as any).service ? [(customer as any).service] : []),
      })
      setTags(Array.isArray(customer.tags) ? customer.tags : [])
    } else {
      setFormData(DEFAULT_FORM)
      setTags([])
    }
    setNewTag("")
    setError(null)
  }, [customer, mode, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) return setError("Name is required.")
    if (!formData.email.trim()) return setError("Email is required.")
    if (!formData.phone.trim()) return setError("Phone is required.")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return setError("Enter a valid email address.")

    const totalValueNumber = Number(formData.totalValue || 0)
    if (Number.isNaN(totalValueNumber) || totalValueNumber < 0) {
      return setError("Total value must be a valid non-negative number.")
    }

    if (!formData.services || formData.services.length === 0) {
      return setError("Please select at least one service.")
    }

    const customerData = {
      ...formData,
      totalValue: totalValueNumber,
      tags,
      lastContactDate: customer?.lastContactDate,
    }

    setIsSubmitting(true)
    try {
      const success =
        mode === "add"
          ? await addCustomer(customerData as any)
          : customer
          ? await updateCustomer(customer.id, customerData as any)
          : false

      if (success) {
        onOpenChange(false)
        setFormData(DEFAULT_FORM)
        setTags([])
        setNewTag("")
      } else {
        setError("Failed to save customer. Try again.")
      }
    } catch (err: any) {
      setError(err?.message ?? "Failed to save customer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTagHandler = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
    }
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const toggleService = (service: string) => {
    setFormData((prev) => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter((s) => s !== service) }
      }
      return { ...prev, services: [...prev.services, service] }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[98vw] sm:w-[95vw] md:w-[90vw] lg:w-[85vw] max-w-[1200px] h-[95vh] max-h-[95vh] overflow-hidden flex flex-col p-0">
        {/* Fixed Header */}
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b shrink-0">
          <DialogTitle className="text-lg sm:text-xl flex items-center gap-2">
            {mode === "add" ? (
              <>
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Add New Customer
              </>
            ) : (
              <>
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Edit Customer
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {mode === "add"
              ? "Add a new customer to your CRM system."
              : "Update customer information and details."}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          <form onSubmit={handleSubmit} className="space-y-6" id="customer-form">
            {/* Basic Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base flex items-center gap-1">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
                      className="h-9 sm:h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base flex items-center gap-1">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="h-9 sm:h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base flex items-center gap-1">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="h-9 sm:h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber" className="text-sm sm:text-base flex items-center gap-1">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                      WhatsApp Number
                    </Label>
                    <Input
                      id="whatsappNumber"
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsappNumber: e.target.value })
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="h-9 sm:h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company & Financial Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Building className="h-4 w-4 sm:h-5 sm:w-5" />
                  Company & Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm sm:text-base">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name"
                      className="h-9 sm:h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalValue" className="text-sm sm:text-base flex items-center gap-1">
                      <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                      Total Value (₹)
                    </Label>
                    <Input
                      id="totalValue"
                      type="number"
                      value={formData.totalValue}
                      onChange={(e) =>
                        setFormData({ ...formData, totalValue: e.target.value })
                      }
                      min="0"
                      placeholder="0"
                      className="h-9 sm:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">
                    Status
                  </Label>
                  <select
                    className="w-full border border-input rounded-md px-3 py-2 text-sm sm:text-base bg-background h-9 sm:h-10"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as Customer["status"] })
                    }
                  >
                    <option value="prospect">Prospect</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source" className="text-sm sm:text-base">
                    Source
                  </Label>
                  <Input
                    id="source"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="How did they find you?"
                    className="h-9 sm:h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm sm:text-base">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address, building number"
                    className="h-9 sm:h-10"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm sm:text-base">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="h-9 sm:h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm sm:text-base">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="State"
                      className="h-9 sm:h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-sm sm:text-base">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="ZIP"
                      className="h-9 sm:h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services & Tags Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Tag className="h-4 w-4 sm:h-5 sm:w-5" />
                  Services & Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Services */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base flex items-center gap-1">
                    Services <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((service) => {
                      const selected = formData.services.includes(service)
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all ${
                            selected
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-background text-foreground hover:bg-muted hover:border-muted-foreground/30"
                          }`}
                        >
                          {service}
                        </button>
                      )
                    })}
                  </div>
                  {formData.services.length === 0 && (
                    <p className="text-xs text-muted-foreground">Select at least one service</p>
                  )}
                </div>

                <Separator />

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Tags</Label>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors" 
                            onClick={() => removeTag(tag)} 
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      className="h-9 sm:h-10"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTagHandler()
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addTagHandler}
                      className="shrink-0 h-9 sm:h-10"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Additional Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm sm:text-base">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add any additional notes or comments..."
                    className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-destructive font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Fixed Footer */}
        <DialogFooter className="px-4 sm:px-6 py-3 sm:py-4 border-t shrink-0 bg-background">
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto h-9 sm:h-10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              form="customer-form"
              className="w-full sm:w-auto h-9 sm:h-10"
            >
              {isSubmitting
                ? mode === "add"
                  ? "Adding..."
                  : "Updating..."
                : mode === "add"
                ? "Add Customer"
                : "Update Customer"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}