// "use client"

// import { useMemo, useState } from "react"
// import { useCRM } from "@/contexts/crm-context"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { CustomerDialog } from "./customer-dialog"
// import { CustomerDetailDialog } from "./customer-detail-dialog"
// import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Phone, Mail, MessageCircle } from "lucide-react"
// import type { Customer } from "@/types/crm"

// export function CustomersContent() {
//   const { customers, deleteCustomer } = useCRM()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
//   const [isDeleting, setIsDeleting] = useState<string | null>(null)

//   const normalizedSearch = searchTerm.trim().toLowerCase()

//   const filteredCustomers = useMemo(
//     () =>
//       customers.filter((customer) => {
//         if (!normalizedSearch) return true

//         const name = customer.name?.toLowerCase() ?? ""
//         const email = customer.email?.toLowerCase() ?? ""
//         const company = customer.company?.toLowerCase() ?? ""
//         const phone = customer.phone ?? ""
//         const servicesText = Array.isArray((customer as any).services)
//           ? (customer as any).services.join(", ").toLowerCase()
//           : (customer as any).service?.toString().toLowerCase?.() ?? ""

//         return (
//           name.includes(normalizedSearch) ||
//           email.includes(normalizedSearch) ||
//           company.includes(normalizedSearch) ||
//           phone.includes(searchTerm) ||
//           servicesText.includes(normalizedSearch)
//         )
//       }),
//     [customers, normalizedSearch, searchTerm],
//   )

//   const handleEdit = (e: React.MouseEvent, customer: Customer) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setSelectedCustomer(customer)
//     setIsEditDialogOpen(true)
//   }

//   const handleDelete = async (e: React.MouseEvent, customerId: string) => {
//     e.preventDefault()
//     e.stopPropagation()

//     const confirmed = window.confirm(
//       "Are you sure you want to delete this customer?\n\nThis action cannot be undone and will remove all associated data."
//     )

//     if (!confirmed) return

//     setIsDeleting(customerId)
//     try {
//       const success = await deleteCustomer(customerId)
//       if (!success) {
//         alert("Failed to delete customer. Please try again.")
//       }
//     } catch (error) {
//       console.error("Error deleting customer:", error)
//       alert("An error occurred while deleting the customer.")
//     } finally {
//       setIsDeleting(null)
//     }
//   }

//   const handleViewDetails = (e: React.MouseEvent, customer: Customer) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setSelectedCustomer(customer)
//     setIsDetailDialogOpen(true)
//   }

//   const handleCallCustomer = (e: React.MouseEvent, customer: Customer) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (!customer.phone) {
//       alert("No phone number available for this customer.")
//       return
//     }
//     window.location.href = `tel:${customer.phone}`
//   }

//   const handleEmailCustomer = (e: React.MouseEvent, customer: Customer) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (!customer.email) {
//       alert("No email address available for this customer.")
//       return
//     }
//     window.location.href = `mailto:${customer.email}`
//   }

//   const handleWhatsAppCustomer = (e: React.MouseEvent, customer: Customer) => {
//     e.preventDefault()
//     e.stopPropagation()
//     const number = customer.whatsappNumber || customer.phone
//     if (!number) {
//       alert("No WhatsApp number available for this customer.")
//       return
//     }
//     const cleanNumber = number.replace(/\D/g, "")
//     const message = encodeURIComponent("Hi, I'd like to follow up regarding our conversation.")
//     window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank", "noopener,noreferrer")
//   }

//   const getStatusBadge = (status: Customer["status"]) => {
//     const variants: Record<string, string> = {
//       active: "bg-green-100 text-green-800 hover:bg-green-100",
//       inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
//       prospect: "bg-blue-100 text-blue-800 hover:bg-blue-100",
//     }
//     return variants[status] || variants.active
//   }

//   const formatLastContact = (value: Customer["lastContactDate"]) => {
//     if (!value) return "Never"
//     if (value instanceof Date) return value.toLocaleDateString()
//     return String(value)
//   }

//   const renderServices = (customer: Customer) => {
//     if (Array.isArray((customer as any).services) && (customer as any).services.length > 0) {
//       return (customer as any).services.join(", ")
//     }
//     if ((customer as any).service) {
//       return (customer as any).service
//     }
//     return "—"
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold font-serif">Customers</h1>
//           <p className="text-muted-foreground">Manage your customer relationships</p>
//         </div>
//         <Button onClick={() => setIsAddDialogOpen(true)}>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Customer
//         </Button>
//       </div>

//       {/* Search and Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Customer Directory</CardTitle>
//           <CardDescription>Search and manage all your customers</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-4 mb-6">
//             <div className="relative flex-1 max-w-sm">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search customers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <div className="text-sm text-muted-foreground">
//               {filteredCustomers.length} of {customers.length} customers
//             </div>
//           </div>

//           {/* Customers Table */}
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Company</TableHead>
//                   <TableHead>Contact</TableHead>
//                   <TableHead>Service</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Total Value</TableHead>
//                   <TableHead>Last Contact</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredCustomers.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
//                       {searchTerm
//                         ? "No customers found matching your search."
//                         : "No customers yet. Add your first customer!"}
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredCustomers.map((customer) => (
//                     <TableRow
//                       key={customer.id}
//                       className="hover:bg-muted/50"
//                     >
//                       <TableCell>
//                         <div className="flex items-center space-x-3">
//                           <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
//                             <span className="text-sm font-medium text-primary">
//                               {customer.name?.charAt(0)?.toUpperCase() ?? "C"}
//                             </span>
//                           </div>
//                           <div>
//                             <div className="font-medium">{customer.name || "Unnamed"}</div>
//                             <div className="text-sm text-muted-foreground">
//                               {customer.email || "No email"}
//                             </div>
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="font-medium">{customer.company || "—"}</div>
//                         <div className="text-sm text-muted-foreground">
//                           {[customer.city, customer.state].filter(Boolean).join(", ") || "—"}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center space-x-2">
//                           <Phone className="h-3 w-3 text-muted-foreground" />
//                           <span className="text-sm">{customer.phone || "No phone"}</span>
//                         </div>
//                         {customer.whatsappNumber && (
//                           <div className="flex items-center space-x-2 mt-1">
//                             <MessageCircle className="h-3 w-3 text-green-600" />
//                             <span className="text-sm text-green-600">WhatsApp</span>
//                           </div>
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <div className="text-sm">
//                           {renderServices(customer)}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={getStatusBadge(customer.status)}>
//                           {customer.status ?? "active"}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="font-medium">
//                           {typeof customer.totalValue === "number"
//                             ? `₹${customer.totalValue.toLocaleString()}`
//                             : "—"}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="text-sm">{formatLastContact(customer.lastContactDate)}</div>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-8 w-8 p-0 hover:bg-accent"
//                               disabled={isDeleting === customer.id}
//                             >
//                               <span className="sr-only">Open menu</span>
//                               <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end" className="w-48">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>

//                             <DropdownMenuItem
//                               onSelect={(e) => {
//                                 e.preventDefault()
//                                 handleViewDetails(e as any, customer)
//                               }}
//                               className="cursor-pointer"
//                             >
//                               <Eye className="mr-2 h-4 w-4" />
//                               View Details
//                             </DropdownMenuItem>

//                             <DropdownMenuItem
//                               onSelect={(e) => {
//                                 e.preventDefault()
//                                 handleEdit(e as any, customer)
//                               }}
//                               className="cursor-pointer"
//                             >
//                               <Edit className="mr-2 h-4 w-4" />
//                               Edit Customer
//                             </DropdownMenuItem>

//                             <DropdownMenuSeparator />

//                             <DropdownMenuItem
//                               onSelect={(e) => {
//                                 e.preventDefault()
//                                 handleCallCustomer(e as any, customer)
//                               }}
//                               disabled={!customer.phone}
//                               className="cursor-pointer"
//                             >
//                               <Phone className="mr-2 h-4 w-4" />
//                               Call
//                             </DropdownMenuItem>

//                             <DropdownMenuItem
//                               onSelect={(e) => {
//                                 e.preventDefault()
//                                 handleEmailCustomer(e as any, customer)
//                               }}
//                               disabled={!customer.email}
//                               className="cursor-pointer"
//                             >
//                               <Mail className="mr-2 h-4 w-4" />
//                               Email
//                             </DropdownMenuItem>

//                             <DropdownMenuItem
//                               onSelect={(e) => {
//                                 e.preventDefault()
//                                 handleWhatsAppCustomer(e as any, customer)
//                               }}
//                               disabled={!customer.whatsappNumber && !customer.phone}
//                               className="cursor-pointer"
//                             >
//                               <MessageCircle className="mr-2 h-4 w-4" />
//                               WhatsApp
//                             </DropdownMenuItem>

//                             <DropdownMenuSeparator />

//                             <DropdownMenuItem
//                               onSelect={(e) => {
//                                 e.preventDefault()
//                                 handleDelete(e as any, customer.id)
//                               }}
//                               className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
//                               disabled={isDeleting === customer.id}
//                             >
//                               <Trash2 className="mr-2 h-4 w-4" />
//                               {isDeleting === customer.id ? "Deleting..." : "Delete Customer"}
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Dialogs */}
//       <CustomerDialog
//         open={isAddDialogOpen}
//         onOpenChange={setIsAddDialogOpen}
//         customer={null}
//         mode="add"
//       />

//       <CustomerDialog
//         open={isEditDialogOpen}
//         onOpenChange={(open) => {
//           setIsEditDialogOpen(open)
//           if (!open) {
//             setSelectedCustomer(null)
//           }
//         }}
//         customer={selectedCustomer}
//         mode="edit"
//       />

//       <CustomerDetailDialog
//         open={isDetailDialogOpen}
//         onOpenChange={(open) => {
//           setIsDetailDialogOpen(open)
//           if (!open) {
//             setSelectedCustomer(null)
//           }
//         }}
//         customer={selectedCustomer}
//         onCallCustomer={(customer) => handleCallCustomer({} as any, customer)}
//         onEmailCustomer={(customer) => handleEmailCustomer({} as any, customer)}
//         onWhatsAppCustomer={(customer) => handleWhatsAppCustomer({} as any, customer)}
//         onScheduleMeeting={(customer) => {
//           alert(`Meeting scheduling feature coming soon for ${customer.name}`)
//         }}
//       />
//     </div>
//   )
// }


//testing responsive UI
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
import { CustomerDialog } from "./customer-dialog"
import { CustomerDetailDialog } from "./customer-detail-dialog"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Phone, Mail, MessageCircle, Users, Building } from "lucide-react"
import type { Customer } from "@/types/crm"

export function CustomersContent() {
  const { customers, deleteCustomer } = useCRM()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) => {
        if (!normalizedSearch) return true

        const name = customer.name?.toLowerCase() ?? ""
        const email = customer.email?.toLowerCase() ?? ""
        const company = customer.company?.toLowerCase() ?? ""
        const phone = customer.phone ?? ""
        const servicesText = Array.isArray((customer as any).services)
          ? (customer as any).services.join(", ").toLowerCase()
          : (customer as any).service?.toString().toLowerCase?.() ?? ""

        return (
          name.includes(normalizedSearch) ||
          email.includes(normalizedSearch) ||
          company.includes(normalizedSearch) ||
          phone.includes(searchTerm) ||
          servicesText.includes(normalizedSearch)
        )
      }),
    [customers, normalizedSearch, searchTerm],
  )

  const handleEdit = (e: React.MouseEvent, customer: Customer) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (e: React.MouseEvent, customerId: string) => {
    e.preventDefault()
    e.stopPropagation()

    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?\n\nThis action cannot be undone and will remove all associated data."
    )

    if (!confirmed) return

    setIsDeleting(customerId)
    try {
      const success = await deleteCustomer(customerId)
      if (!success) {
        alert("Failed to delete customer. Please try again.")
      }
    } catch (error) {
      console.error("Error deleting customer:", error)
      alert("An error occurred while deleting the customer.")
    } finally {
      setIsDeleting(null)
    }
  }

  const handleViewDetails = (e: React.MouseEvent, customer: Customer) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCustomer(customer)
    setIsDetailDialogOpen(true)
  }

  const handleCallCustomer = (e: React.MouseEvent, customer: Customer) => {
    e.preventDefault()
    e.stopPropagation()
    if (!customer.phone) {
      alert("No phone number available for this customer.")
      return
    }
    window.location.href = `tel:${customer.phone}`
  }

  const handleEmailCustomer = (e: React.MouseEvent, customer: Customer) => {
    e.preventDefault()
    e.stopPropagation()
    if (!customer.email) {
      alert("No email address available for this customer.")
      return
    }
    window.location.href = `mailto:${customer.email}`
  }

  const handleWhatsAppCustomer = (e: React.MouseEvent, customer: Customer) => {
    e.preventDefault()
    e.stopPropagation()
    const number = customer.whatsappNumber || customer.phone
    if (!number) {
      alert("No WhatsApp number available for this customer.")
      return
    }
    const cleanNumber = number.replace(/\D/g, "")
    const message = encodeURIComponent("Hi, I'd like to follow up regarding our conversation.")
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank", "noopener,noreferrer")
  }

  const getStatusBadge = (status: Customer["status"]) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800 hover:bg-green-100",
      inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      prospect: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    }
    return variants[status] || variants.active
  }

  const formatLastContact = (value: Customer["lastContactDate"]) => {
    if (!value) return "Never"
    if (value instanceof Date) return value.toLocaleDateString()
    return String(value)
  }

  const renderServices = (customer: Customer) => {
    if (Array.isArray((customer as any).services) && (customer as any).services.length > 0) {
      return (customer as any).services.join(", ")
    }
    if ((customer as any).service) {
      return (customer as any).service
    }
    return "—"
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif flex items-center gap-2">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            Customers
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your customer relationships
          </p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="w-full sm:w-auto h-9 sm:h-10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Customer Directory</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Search and manage all your customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9 sm:h-10"
              />
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
              <span className="font-medium">{filteredCustomers.length}</span> of{" "}
              <span className="font-medium">{customers.length}</span> customers
            </div>
          </div>

          {/* Customers Table - Desktop */}
          <div className="hidden lg:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Customer</TableHead>
                  <TableHead className="w-[150px]">Company</TableHead>
                  <TableHead className="w-[140px]">Contact</TableHead>
                  <TableHead className="w-[180px]">Service</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[120px]">Total Value</TableHead>
                  <TableHead className="w-[120px]">Last Contact</TableHead>
                  <TableHead className="text-right w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-12 w-12 text-muted-foreground/50" />
                        <p className="text-base font-medium">
                          {searchTerm
                            ? "No customers found matching your search."
                            : "No customers yet. Add your first customer!"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={(e) => handleViewDetails(e, customer)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-sm font-medium text-primary">
                              {customer.name?.charAt(0)?.toUpperCase() ?? "C"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{customer.name || "Unnamed"}</div>
                            <div className="text-sm text-muted-foreground truncate">
                              {customer.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium truncate">{customer.company || "—"}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {[customer.city, customer.state].filter(Boolean).join(", ") || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="text-sm truncate">{customer.phone || "No phone"}</span>
                        </div>
                        {customer.whatsappNumber && (
                          <div className="flex items-center space-x-2 mt-1">
                            <MessageCircle className="h-3 w-3 text-green-600 shrink-0" />
                            <span className="text-sm text-green-600">WhatsApp</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm truncate">
                          {renderServices(customer)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(customer.status)}>
                          {customer.status ?? "active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {typeof customer.totalValue === "number"
                            ? `₹${customer.totalValue.toLocaleString()}`
                            : "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatLastContact(customer.lastContactDate)}</div>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-accent"
                              disabled={isDeleting === customer.id}
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleViewDetails(e as any, customer)
                              }}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleEdit(e as any, customer)
                              }}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Customer
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleCallCustomer(e as any, customer)
                              }}
                              disabled={!customer.phone}
                              className="cursor-pointer"
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleEmailCustomer(e as any, customer)
                              }}
                              disabled={!customer.email}
                              className="cursor-pointer"
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Email
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleWhatsAppCustomer(e as any, customer)
                              }}
                              disabled={!customer.whatsappNumber && !customer.phone}
                              className="cursor-pointer"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              WhatsApp
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleDelete(e as any, customer.id)
                              }}
                              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                              disabled={isDeleting === customer.id}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {isDeleting === customer.id ? "Deleting..." : "Delete Customer"}
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

          {/* Customers Cards - Mobile/Tablet */}
          <div className="lg:hidden space-y-3">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-12 w-12 text-muted-foreground/50" />
                  <p className="text-sm sm:text-base font-medium">
                    {searchTerm
                      ? "No customers found matching your search."
                      : "No customers yet. Add your first customer!"}
                  </p>
                </div>
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <Card 
                  key={customer.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={(e) => handleViewDetails(e, customer)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-base sm:text-lg font-medium text-primary">
                            {customer.name?.charAt(0)?.toUpperCase() ?? "C"}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm sm:text-base truncate">
                            {customer.name || "Unnamed"}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground truncate">
                            {customer.email || "No email"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Badge className={getStatusBadge(customer.status)}>
                          {customer.status ?? "active"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              disabled={isDeleting === customer.id}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleViewDetails(e as any, customer)
                              }}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleEdit(e as any, customer)
                              }}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Customer
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleCallCustomer(e as any, customer)
                              }}
                              disabled={!customer.phone}
                              className="cursor-pointer"
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleEmailCustomer(e as any, customer)
                              }}
                              disabled={!customer.email}
                              className="cursor-pointer"
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Email
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleWhatsAppCustomer(e as any, customer)
                              }}
                              disabled={!customer.whatsappNumber && !customer.phone}
                              className="cursor-pointer"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              WhatsApp
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleDelete(e as any, customer.id)
                              }}
                              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                              disabled={isDeleting === customer.id}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {isDeleting === customer.id ? "Deleting..." : "Delete"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                      {customer.company && (
                        <div className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="truncate">{customer.company}</span>
                        </div>
                      )}
                      {customer.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="truncate">{customer.phone}</span>
                        </div>
                      )}
                      {customer.whatsappNumber && (
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-3 w-3 text-green-600 shrink-0" />
                          <span className="text-green-600 truncate">WhatsApp Available</span>
                        </div>
                      )}
                      {typeof customer.totalValue === "number" && (
                        <div className="flex items-center gap-2 font-medium">
                          <span>₹{customer.totalValue.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {renderServices(customer) !== "—" && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">Services:</span> {renderServices(customer)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CustomerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        customer={null}
        mode="add"
      />

      <CustomerDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) {
            setSelectedCustomer(null)
          }
        }}
        customer={selectedCustomer}
        mode="edit"
      />

      <CustomerDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={(open) => {
          setIsDetailDialogOpen(open)
          if (!open) {
            setSelectedCustomer(null)
          }
        }}
        customer={selectedCustomer}
        onCallCustomer={(customer) => handleCallCustomer({} as any, customer)}
        onEmailCustomer={(customer) => handleEmailCustomer({} as any, customer)}
        onWhatsAppCustomer={(customer) => handleWhatsAppCustomer({} as any, customer)}
        onScheduleMeeting={(customer) => {
          alert(`Meeting scheduling feature coming soon for ${customer.name}`)
        }}
      />
    </div>
  )
}