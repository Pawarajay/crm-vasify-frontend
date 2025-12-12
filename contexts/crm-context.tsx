// // "use client"

// // import type React from "react"
// // import { createContext, useContext, useEffect, useState } from "react"
// // import type { Customer, Lead, Deal, Task, Invoice, RenewalReminder, Renewal } from "@/types/crm"
// // import { customersApi, leadsApi, dealsApi, tasksApi, invoicesApi, renewalsApi } from "@/lib/api"

// // // Add User type
// // interface User {
// //   id: string
// //   name: string
// //   email: string
// //   role: string
// // }

// // interface CRMContextType {
// //   customers: Customer[]
// //   leads: Lead[]
// //   deals: Deal[]
// //   tasks: Task[]
// //   invoices: Invoice[]
// //   renewalReminders: RenewalReminder[]
// //   renewals: Renewal[]
// //   users: User[]

// //   isLoading: boolean
// //   error: string | null

// //   addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
// //   updateCustomer: (id: string, customer: Partial<Customer>) => Promise<boolean>
// //   deleteCustomer: (id: string) => Promise<boolean>

// //   addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
// //   updateLead: (id: string, lead: Partial<Lead>) => Promise<boolean>
// //   deleteLead: (id: string) => Promise<boolean>
// //   convertLead: (id: string, customerData?: any) => Promise<boolean>

// //   addDeal: (deal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
// //   updateDeal: (id: string, deal: Partial<Deal>) => Promise<boolean>
// //   deleteDeal: (id: string) => Promise<boolean>

// //   addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
// //   updateTask: (id: string, task: Partial<Task>) => Promise<boolean>
// //   deleteTask: (id: string) => Promise<boolean>

// //   addInvoice: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
// //   updateInvoice: (id: string, invoice: Partial<Invoice>) => Promise<boolean>
// //   deleteInvoice: (id: string) => Promise<boolean>

// //   addRenewalReminder: (reminder: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
// //   updateRenewalReminder: (id: string, reminder: Partial<RenewalReminder>) => Promise<boolean>
// //   deleteRenewalReminder: (id: string) => Promise<boolean>

// //   addRenewal: (renewal: Omit<Renewal, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
// //   updateRenewal: (id: string, renewal: Partial<Renewal>) => Promise<boolean>
// //   deleteRenewal: (id: string) => Promise<boolean>

// //   refreshData: () => Promise<void>
// //   refreshCustomers: () => Promise<void>
// //   refreshLeads: () => Promise<void>
// //   refreshDeals: () => Promise<void>
// //   refreshTasks: () => Promise<void>
// //   refreshInvoices: () => Promise<void>
// //   refreshRenewals: () => Promise<void>
// //   refreshUsers: () => Promise<void>
// // }

// // const CRMContext = createContext<CRMContextType | undefined>(undefined)

// // // Helpers
// // // const toDate = (value: unknown): Date | null => {
// // //   if (!value) return null
// // //   if (value instanceof Date) return value
// // //   const d = new Date(value as string)
// // //   return Number.isNaN(d.getTime()) ? null : d
// // // }

// // const toDate = (value: unknown): Date | null => {
// //   if (!value) return null
// //   if (value instanceof Date) return value
// //   const d = new Date(value as string)
// //   return Number.isNaN(d.getTime()) ? null : d
// // }

// // // Normalize a raw customer from API/DB into app Customer type
// // // const normalizeCustomer = (raw: any): Customer => ({
// // //   id: String(raw.id),
// // //   name: raw.name,
// // //   email: raw.email,
// // //   phone: raw.phone,
// // //   company: raw.company,
// // //   address: raw.address,
// // //   city: raw.city,
// // //   state: raw.state,
// // //   zipCode: raw.zip_code ?? raw.zipCode,
// // //   country: raw.country,
// // //   status: raw.status,
// // //   source: raw.source,
// // //   tags: Array.isArray(raw.tags) ? raw.tags : (() => {
// // //     try {
// // //       return raw.tags ? JSON.parse(raw.tags) : []
// // //     } catch {
// // //       return []
// // //     }
// // //   })(),
// // //   notes: raw.notes,
// // //   totalValue:
// // //     typeof raw.totalValue === "number"
// // //       ? raw.totalValue
// // //       : typeof raw.total_value === "number"
// // //       ? raw.total_value
// // //       : Number(raw.totalValue ?? raw.total_value ?? 0) || 0,
// // //   whatsappNumber: raw.whatsapp_number ?? raw.whatsappNumber,
// // //   lastContactDate: toDate(raw.lastContactDate ?? raw.last_contact_date) ?? (raw.lastContactDate ?? raw.last_contact_date),
// // //   createdAt: toDate(raw.createdAt ?? raw.created_at) ?? (raw.createdAt ?? raw.created_at),
// // //   updatedAt: toDate(raw.updatedAt ?? raw.updated_at) ?? (raw.updatedAt ?? raw.updated_at),
// // // })

// // const normalizeCustomer = (raw: any): Customer => ({
// //   id: String(raw.id),
// //   name: raw.name,
// //   email: raw.email,
// //   phone: raw.phone,
// //   company: raw.company,
// //   address: raw.address,
// //   city: raw.city,
// //   state: raw.state,
// //   zipCode: raw.zip_code ?? raw.zipCode,
// //   country: raw.country,
// //   status: raw.status,
// //   source: raw.source,
// //   tags: Array.isArray(raw.tags)
// //     ? raw.tags
// //     : (() => {
// //         try {
// //           return raw.tags ? JSON.parse(raw.tags) : []
// //         } catch {
// //           return []
// //         }
// //       })(),
// //   notes: raw.notes,
// //   totalValue:
// //     typeof raw.totalValue === "number"
// //       ? raw.totalValue
// //       : typeof raw.total_value === "number"
// //       ? raw.total_value
// //       : Number(raw.totalValue ?? raw.total_value ?? 0) || 0,
// //   whatsappNumber: raw.whatsapp_number ?? raw.whatsappNumber,
// //   lastContactDate:
// //     toDate(raw.lastContactDate ?? raw.last_contact_date) ??
// //     (raw.lastContactDate ?? raw.last_contact_date),
// //   createdAt:
// //     toDate(raw.createdAt ?? raw.created_at) ??
// //     (raw.createdAt ?? raw.created_at),
// //   updatedAt:
// //     toDate(raw.updatedAt ?? raw.updated_at) ??
// //     (raw.updatedAt ?? raw.updated_at),

// //   // NEW: single service per row
// //   service: raw.service ?? null,
// // })

// // export function CRMProvider({ children }: { children: React.ReactNode }) {
// //   const [customers, setCustomers] = useState<Customer[]>([])
// //   const [leads, setLeads] = useState<Lead[]>([])
// //   const [deals, setDeals] = useState<Deal[]>([])
// //   const [tasks, setTasks] = useState<Task[]>([])
// //   const [invoices, setInvoices] = useState<Invoice[]>([])
// //   const [renewalReminders, setRenewalReminders] = useState<RenewalReminder[]>([])
// //   const [renewals, setRenewals] = useState<Renewal[]>([])
// //   const [users, setUsers] = useState<User[]>([])

// //   const [isLoading, setIsLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   useEffect(() => {
// //     void refreshData()
// //   }, [])

// //   const refreshData = async () => {
// //     setIsLoading(true)
// //     setError(null)

// //     try {
// //       await Promise.all([
// //         refreshCustomers(),
// //         refreshLeads(),
// //         refreshDeals(),
// //         refreshTasks(),
// //         refreshInvoices(),
// //         refreshRenewals(),
// //         refreshUsers(),
// //       ])
// //     } catch (err) {
// //       console.error("Failed to load CRM data:", err)
// //       setError(err instanceof Error ? err.message : "Failed to load CRM data")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const refreshUsers = async () => {
// //     try {
// //       const response = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         },
// //       )

// //       if (response.ok) {
// //         const data = await response.json()
// //         setUsers(data.users || [])
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch users:", err)
// //       setUsers([
// //         { id: "user1", name: "Default User", email: "user@example.com", role: "admin" },
// //       ])
// //     }
// //   }

// //   const refreshCustomers = async () => {
// //     try {
// //       const response = await customersApi.getAll({ limit: 100 })
// //       const list = (response.customers || []) as any[]
// //       setCustomers(list.map((c) => normalizeCustomer(c)))
// //     } catch (err) {
// //       console.error("Failed to fetch customers:", err)
// //       throw err
// //     }
// //   }

// //   const refreshLeads = async () => {
// //     try {
// //       const response = await leadsApi.getAll({ limit: 100 })
// //       const list = (response.leads || []) as Lead[]
// //       setLeads(
// //         list.map((l) => ({
// //           ...l,
// //           createdAt: toDate(l.createdAt) ?? l.createdAt,
// //           updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
// //           lastContactDate: toDate(l.lastContactDate) ?? l.lastContactDate,
// //         })),
// //       )
// //     } catch (err) {
// //       console.error("Failed to fetch leads:", err)
// //       throw err
// //     }
// //   }

// //   const refreshDeals = async () => {
// //     try {
// //       const response = await dealsApi.getAll({ limit: 100 })
// //       const list = (response.deals || []) as Deal[]
// //       setDeals(
// //         list.map((d) => ({
// //           ...d,
// //           createdAt: toDate(d.createdAt) ?? d.createdAt,
// //           updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
// //           expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
// //           value: typeof d.value === "number" ? d.value : Number(d.value ?? 0) || 0,
// //         })),
// //       )
// //     } catch (err) {
// //       console.error("Failed to fetch deals:", err)
// //       throw err
// //     }
// //   }

// //   const refreshTasks = async () => {
// //     try {
// //       const response = await tasksApi.getAll({ limit: 100 })
// //       const list = (response.tasks || []) as Task[]
// //       setTasks(
// //         list.map((t) => ({
// //           ...t,
// //           createdAt: toDate(t.createdAt) ?? t.createdAt,
// //           updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
// //           dueDate: toDate(t.dueDate) ?? t.dueDate,
// //           completedAt: toDate(t.completedAt) ?? t.completedAt,
// //         })),
// //       )
// //     } catch (err) {
// //       console.error("Failed to fetch tasks:", err)
// //       throw err
// //     }
// //   }

// //   const refreshInvoices = async () => {
// //     try {
// //       const response = await invoicesApi.getAll({ limit: 100 })
// //       const list = (response.invoices || []) as Invoice[]
// //       setInvoices(
// //         list.map((inv) => ({
// //           ...inv,
// //           createdAt: toDate(inv.createdAt) ?? inv.createdAt,
// //           updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
// //           invoiceDate: toDate(inv.invoiceDate) ?? inv.invoiceDate,
// //           dueDate: toDate(inv.dueDate) ?? inv.dueDate,
// //           total: typeof inv.total === "number" ? inv.total : Number(inv.total ?? 0) || 0,
// //         })),
// //       )
// //     } catch (err) {
// //       console.error("Failed to fetch invoices:", err)
// //       throw err
// //     }
// //   }

// //   const refreshRenewals = async () => {
// //     try {
// //       const [renewalsResponse, remindersResponse] = await Promise.all([
// //         renewalsApi.getAll({ limit: 100 }),
// //         renewalsApi.getReminders(),
// //       ])

// //       const renewalsList = (renewalsResponse.renewals || []) as Renewal[]
// //       const remindersList = (remindersResponse.reminders || []) as RenewalReminder[]

// //       setRenewals(
// //         renewalsList.map((r) => ({
// //           ...r,
// //           createdAt: toDate(r.createdAt) ?? r.createdAt,
// //           updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
// //           startDate: toDate(r.startDate) ?? r.startDate,
// //           endDate: toDate(r.endDate) ?? r.endDate,
// //           amount: typeof r.amount === "number" ? r.amount : Number(r.amount ?? 0) || 0,
// //         })),
// //       )

// //       setRenewalReminders(
// //         remindersList.map((rr) => ({
// //           ...rr,
// //           createdAt: toDate(rr.createdAt) ?? rr.createdAt,
// //           updatedAt: toDate(rr.updatedAt) ?? rr.updatedAt,
// //           expiryDate: toDate(rr.expiryDate) ?? rr.expiryDate,
// //           lastReminderSent: toDate(rr.lastReminderSent) ?? rr.lastReminderSent,
// //           reminderDays: Array.isArray(rr.reminderDays)
// //             ? rr.reminderDays
// //             : (() => {
// //                 try {
// //                   return JSON.parse((rr.reminderDays as unknown as string) || "[]") as number[]
// //                 } catch {
// //                   return []
// //                 }
// //               })(),
// //         })),
// //       )
// //     } catch (err) {
// //       console.error("Failed to fetch renewals:", err)
// //       throw err
// //     }
// //   }

// //   // Customer CRUD
// //   // const addCustomer = async (
// //   //   customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">,
// //   // ): Promise<boolean> => {
// //   //   try {
// //   //     const payload = {
// //   //       ...customerData,
// //   //       totalValue:
// //   //         customerData.totalValue !== undefined &&
// //   //         customerData.totalValue !== null &&
// //   //         customerData.totalValue !== ""
// //   //           ? Number(customerData.totalValue)
// //   //           : 0,
// //   //     }

// //   //     const response = await customersApi.create(payload)
// //   //     if (response.customer) {
// //   //       const c = normalizeCustomer(response.customer)
// //   //       // new at top
// //   //       setCustomers((prev) => [c, ...prev])
// //   //       return true
// //   //     }
// //   //     return false
// //   //   } catch (err) {
// //   //     console.error("Failed to add customer:", err)
// //   //     throw err
// //   //   }
// //   // }

// //   const addCustomer = async (
// //   customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">,
// // ): Promise<boolean> => {
// //   try {
// //     const payload = {
// //       ...customerData,
// //       totalValue:
// //         customerData.totalValue !== undefined &&
// //         customerData.totalValue !== null &&
// //         customerData.totalValue !== ""
// //           ? Number(customerData.totalValue)
// //           : 0,
// //     }

// //     const response = await customersApi.create(payload)

// //     // backend: { message, customers: [...] } or fallback to single
// //     const rawList: any[] = Array.isArray(response.customers)
// //       ? response.customers
// //       : response.customer
// //       ? [response.customer]
// //       : []

// //     if (rawList.length === 0) {
// //       return false
// //     }

// //     const normalizedList = rawList.map((c) => normalizeCustomer(c))

// //     // prepend new rows
// //     setCustomers((prev) => [...normalizedList, ...prev])

// //     return true
// //   } catch (err) {
// //     console.error("Failed to add customer:", err)
// //     return false
// //   }
// // }

// //   const updateCustomer = async (
// //     id: string,
// //     customerData: Partial<Customer>,
// //   ): Promise<boolean> => {
// //     try {
// //       const payload: any = { ...customerData }
// //       if ("totalValue" in payload) {
// //         const v = payload.totalValue
// //         payload.totalValue =
// //           v !== undefined && v !== null && v !== "" ? Number(v) : 0
// //       }

// //       const response = await customersApi.update(id, payload)
// //       if (response.customer) {
// //         const c = normalizeCustomer(response.customer)
// //         setCustomers((prev) =>
// //           prev.map((customer) => (customer.id === id ? c : customer)),
// //         )
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to update customer:", err)
// //       throw err
// //     }
// //   }

// //   const deleteCustomer = async (id: string): Promise<boolean> => {
// //     try {
// //       await customersApi.delete(id)
// //       setCustomers((prev) => prev.filter((customer) => customer.id !== id))
// //       return true
// //     } catch (err) {
// //       console.error("Failed to delete customer:", err)
// //       return false
// //     }
// //   }

// //   // Lead CRUD (unchanged)
// //   // const addLead = async (
// //   //   leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">,
// //   // ): Promise<boolean> => {
// //   //   try {
// //   //     const response = await leadsApi.create(leadData)
// //   //     if (response.lead) {
// //   //       const l = response.lead as Lead
// //   //       setLeads((prev) => [
// //   //         ...prev,
// //   //         { ...l, createdAt: toDate(l.createdAt) ?? l.createdAt },
// //   //       ])
// //   //       return true
// //   //     }
// //   //     return false
// //   //   } catch (err) {
// //   //     console.error("Failed to add lead:", err)
// //   //     return false
// //   //   }
// //   // }

// //   const addLead = async (
// //   leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">,
// // ): Promise<boolean> => {
// //   try {
// //     const response = await leadsApi.create(leadData)
// //     console.log("addLead response:", response)

// //     if (response.lead) {
// //       const l = response.lead as Lead
// //       setLeads((prev) => [
// //         ...prev,
// //         {
// //           ...l,
// //           createdAt: toDate(l.createdAt) ?? l.createdAt,
// //           updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
// //           lastContactDate: toDate((l as any).lastContactDate) ?? (l as any).lastContactDate,
// //         },
// //       ])
// //       return true
// //     }
// //     return false
// //   } catch (err) {
// //     console.error("Failed to add lead (caught):", err)
// //     return false
// //   }
// // }


// //   const updateLead = async (id: string, leadData: Partial<Lead>): Promise<boolean> => {
// //     try {
// //       const response = await leadsApi.update(id, leadData)
// //       if (response.lead) {
// //         const l = response.lead as Lead
// //         setLeads((prev) =>
// //           prev.map((lead) =>
// //             lead.id === id
// //               ? {
// //                   ...l,
// //                   createdAt: toDate(l.createdAt) ?? l.createdAt,
// //                   updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
// //                 }
// //               : lead,
// //           ),
// //         )
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to update lead:", err)
// //       return false
// //     }
// //   }

// //   const deleteLead = async (id: string): Promise<boolean> => {
// //     try {
// //       await leadsApi.delete(id)
// //       setLeads((prev) => prev.filter((lead) => lead.id !== id))
// //       return true
// //     } catch (err) {
// //       console.error("Failed to delete lead:", err)
// //       return false
// //     }
// //   }

// //   // const convertLead = async (id: string, customerData?: any): Promise<boolean> => {
// //   //   try {
// //   //     const response = await leadsApi.convertToCustomer(id, customerData)
// //   //     if (response.customer) {
// //   //       const c = normalizeCustomer(response.customer)
// //   //       setLeads((prev) => prev.filter((lead) => lead.id !== id))
// //   //       setCustomers((prev) => [...prev, c])
// //   //       return true
// //   //     }
// //   //     return false
// //   //   } catch (err) {
// //   //     console.error("Failed to convert lead:", err)
// //   //     return false
// //   //   }
// //   // }

  
// // const convertLead = async (id: string, customerData?: any): Promise<boolean> => {
// //   try {
// //     const response = await leadsApi.convertToCustomer(id, customerData)

// //     const rawList: any[] = Array.isArray(response.customers)
// //       ? response.customers
// //       : response.customer
// //       ? [response.customer]
// //       : []

// //     if (rawList.length === 0) {
// //       return false
// //     }

// //     const normalizedList = rawList.map((c) => normalizeCustomer(c))

// //     // update lead status locally to closed-won
// //     setLeads((prev) =>
// //       prev.map((lead) =>
// //         lead.id === id ? { ...lead, status: "closed-won" } : lead,
// //       ),
// //     )

// //     // prepend new customer(s)
// //     setCustomers((prev) => [...normalizedList, ...prev])

// //     return true
// //   } catch (err) {
// //     console.error("Failed to convert lead:", err)
// //     return false
// //   }
// // }

// //   // Deal CRUD (unchanged)
// //   const addDeal = async (
// //     dealData: Omit<Deal, "id" | "createdAt" | "updatedAt">,
// //   ): Promise<boolean> => {
// //     try {
// //       const formattedDealData = {
// //         ...dealData,
// //         expectedCloseDate: dealData.expectedCloseDate
// //           ? dealData.expectedCloseDate instanceof Date
// //             ? dealData.expectedCloseDate.toISOString()
// //             : dealData.expectedCloseDate
// //           : null,
// //         ...(dealData.actualCloseDate && {
// //           actualCloseDate:
// //             dealData.actualCloseDate instanceof Date
// //               ? dealData.actualCloseDate.toISOString()
// //               : dealData.actualCloseDate,
// //         }),
// //         products: Array.isArray(dealData.products) ? dealData.products : [],
// //       }

// //       const response = await dealsApi.create(formattedDealData)

// //       if (response.deal) {
// //         const d = response.deal as Deal
// //         setDeals((prev) => [
// //           ...prev,
// //           {
// //             ...d,
// //             createdAt: toDate(d.createdAt) ?? d.createdAt,
// //             updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
// //             expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
// //           },
// //         ])
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to add deal:", err)
// //       return false
// //     }
// //   }

// //   const updateDeal = async (id: string, dealData: Partial<Deal>): Promise<boolean> => {
// //     try {
// //       const formattedDealData: any = { ...dealData }

// //       if (dealData.expectedCloseDate) {
// //         formattedDealData.expectedCloseDate =
// //           dealData.expectedCloseDate instanceof Date
// //             ? dealData.expectedCloseDate.toISOString()
// //             : dealData.expectedCloseDate
// //       }

// //       if (dealData.actualCloseDate) {
// //         formattedDealData.actualCloseDate =
// //           dealData.actualCloseDate instanceof Date
// //             ? dealData.actualCloseDate.toISOString()
// //             : dealData.actualCloseDate
// //       }

// //       const response = await dealsApi.update(id, formattedDealData)

// //       if (response.deal) {
// //         const d = response.deal as Deal
// //         setDeals((prev) =>
// //           prev.map((deal) =>
// //             deal.id === id
// //               ? {
// //                   ...d,
// //                   createdAt: toDate(d.createdAt) ?? d.createdAt,
// //                   updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
// //                   expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
// //                 }
// //               : deal,
// //           ),
// //         )
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to update deal:", err)
// //       return false
// //     }
// //   }

// //   const deleteDeal = async (id: string): Promise<boolean> => {
// //     try {
// //       await dealsApi.delete(id)
// //       setDeals((prev) => prev.filter((deal) => deal.id !== id))
// //       return true
// //     } catch (err) {
// //       console.error("Failed to delete deal:", err)
// //       return false
// //     }
// //   }

// //   // Task CRUD (unchanged)
// //   const addTask = async (
// //     taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
// //   ): Promise<boolean> => {
// //     try {
// //       const response = await tasksApi.create(taskData)
// //       if (response.task) {
// //         const t = response.task as Task
// //         setTasks((prev) => [
// //           ...prev,
// //           {
// //             ...t,
// //             createdAt: toDate(t.createdAt) ?? t.createdAt,
// //             updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
// //           },
// //         ])
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to add task:", err)
// //       return false
// //     }
// //   }

// //   const updateTask = async (id: string, taskData: Partial<Task>): Promise<boolean> => {
// //     try {
// //       const response = await tasksApi.update(id, taskData)
// //       if (response.task) {
// //         const t = response.task as Task
// //         setTasks((prev) =>
// //           prev.map((task) =>
// //             task.id === id
// //               ? {
// //                   ...t,
// //                   createdAt: toDate(t.createdAt) ?? t.createdAt,
// //                   updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
// //                 }
// //               : task,
// //           ),
// //         )
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to update task:", err)
// //       return false
// //     }
// //   }

// //   const deleteTask = async (id: string): Promise<boolean> => {
// //     try {
// //       await tasksApi.delete(id)
// //       setTasks((prev) => prev.filter((task) => task.id !== id))
// //       return true
// //     } catch (err) {
// //       console.error("Failed to delete task:", err)
// //       return false
// //     }
// //   }

// //   // Invoice CRUD (unchanged)
// //   const addInvoice = async (
// //     invoiceData: Omit<Invoice, "id" | "createdAt" | "updatedAt">,
// //   ): Promise<boolean> => {
// //     try {
// //       const response = await invoicesApi.create(invoiceData)
// //       if (response.invoice) {
// //         const inv = response.invoice as Invoice
// //         setInvoices((prev) => [
// //           ...prev,
// //           {
// //             ...inv,
// //             createdAt: toDate(inv.createdAt) ?? inv.createdAt,
// //             updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
// //           },
// //         ])
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to add invoice:", err)
// //       return false
// //     }
// //   }

// //   const updateInvoice = async (
// //     id: string,
// //     invoiceData: Partial<Invoice>,
// //   ): Promise<boolean> => {
// //     try {
// //       const response = await invoicesApi.update(id, invoiceData)
// //       if (response.invoice) {
// //         const inv = response.invoice as Invoice
// //         setInvoices((prev) =>
// //           prev.map((invoice) =>
// //             invoice.id === id
// //               ? {
// //                   ...inv,
// //                   createdAt: toDate(inv.createdAt) ?? inv.createdAt,
// //                   updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
// //                 }
// //               : invoice,
// //           ),
// //         )
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to update invoice:", err)
// //       return false
// //     }
// //   }

// //   const deleteInvoice = async (id: string): Promise<boolean> => {
// //     try {
// //       await invoicesApi.delete(id)
// //       setInvoices((prev) => prev.filter((invoice) => invoice.id !== id))
// //       return true
// //     } catch (err) {
// //       console.error("Failed to delete invoice:", err)
// //       return false
// //     }
// //   }

// //   // Renewal reminder CRUD (partial)
// //   const addRenewalReminder = async (
// //     reminderData: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">,
// //   ): Promise<boolean> => {
// //     try {
// //       const response = await renewalsApi.createReminder(reminderData)
// //       if (response.reminder) {
// //         const rr = response.reminder as RenewalReminder
// //         setRenewalReminders((prev) => [
// //           ...prev,
// //           {
// //             ...rr,
// //             createdAt: toDate(rr.createdAt) ?? rr.createdAt,
// //             updatedAt: toDate(rr.updatedAt) ?? rr.updatedAt,
// //           },
// //         ])
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to add renewal reminder:", err)
// //       return false
// //     }
// //   }

// //   const updateRenewalReminder = async (
// //     _id: string,
// //     _reminderData: Partial<RenewalReminder>,
// //   ): Promise<boolean> => {
// //     console.warn("Update renewal reminder not implemented in backend yet")
// //     return false
// //   }

// //   const deleteRenewalReminder = async (_id: string): Promise<boolean> => {
// //     console.warn("Delete renewal reminder not implemented in backend yet")
// //     return false
// //   }

// //   // Renewal CRUD (unchanged)
// //   const addRenewal = async (
// //     renewalData: Omit<Renewal, "id" | "createdAt" | "updatedAt">,
// //   ): Promise<boolean> => {
// //     try {
// //       const response = await renewalsApi.create(renewalData)
// //       if (response.renewal) {
// //         const r = response.renewal as Renewal
// //         setRenewals((prev) => [
// //           ...prev,
// //           {
// //             ...r,
// //             createdAt: toDate(r.createdAt) ?? r.createdAt,
// //             updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
// //           },
// //         ])
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to add renewal:", err)
// //       return false
// //     }
// //   }

// //   const updateRenewal = async (
// //     id: string,
// //     renewalData: Partial<Renewal>,
// //   ): Promise<boolean> => {
// //     try {
// //       const response = await renewalsApi.update(id, renewalData)
// //       if (response.renewal) {
// //         const r = response.renewal as Renewal
// //         setRenewals((prev) =>
// //           prev.map((renewal) =>
// //             renewal.id === id
// //               ? {
// //                   ...r,
// //                   createdAt: toDate(r.createdAt) ?? r.createdAt,
// //                   updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
// //                 }
// //               : renewal,
// //           ),
// //         )
// //         return true
// //       }
// //       return false
// //     } catch (err) {
// //       console.error("Failed to update renewal:", err)
// //       return false
// //     }
// //   }

// //   const deleteRenewal = async (id: string): Promise<boolean> => {
// //     try {
// //       await renewalsApi.delete(id)
// //       setRenewals((prev) => prev.filter((renewal) => renewal.id !== id))
// //       return true
// //     } catch (err) {
// //       console.error("Failed to delete renewal:", err)
// //       return false
// //     }
// //   }

// //   const value: CRMContextType = {
// //     customers,
// //     leads,
// //     deals,
// //     tasks,
// //     invoices,
// //     renewalReminders,
// //     renewals,
// //     users,
// //     isLoading,
// //     error,
// //     addCustomer,
// //     updateCustomer,
// //     deleteCustomer,
// //     addLead,
// //     updateLead,
// //     deleteLead,
// //     convertLead,
// //     addDeal,
// //     updateDeal,
// //     deleteDeal,
// //     addTask,
// //     updateTask,
// //     deleteTask,
// //     addInvoice,
// //     updateInvoice,
// //     deleteInvoice,
// //     addRenewalReminder,
// //     updateRenewalReminder,
// //     deleteRenewalReminder,
// //     addRenewal,
// //     updateRenewal,
// //     deleteRenewal,
// //     refreshData,
// //     refreshCustomers,
// //     refreshLeads,
// //     refreshDeals,
// //     refreshTasks,
// //     refreshInvoices,
// //     refreshRenewals,
// //     refreshUsers,
// //   }

// //   return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>
// // }

// // export function useCRM() {
// //   const context = useContext(CRMContext)
// //   if (context === undefined) {
// //     throw new Error("useCRM must be used within a CRMProvider")
// //   }
// //   return context
// // }


// //testing


// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"
// import type { Customer, Lead, Deal, Task, Invoice, RenewalReminder, Renewal } from "@/types/crm"
// import { customersApi, leadsApi, dealsApi, tasksApi, invoicesApi, renewalsApi } from "@/lib/api"

// // Add User type
// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
// }

// interface CRMContextType {
//   customers: Customer[]
//   leads: Lead[]
//   deals: Deal[]
//   tasks: Task[]
//   invoices: Invoice[]
//   renewalReminders: RenewalReminder[]
//   renewals: Renewal[]
//   users: User[]

//   isLoading: boolean
//   error: string | null

//   addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
//   updateCustomer: (id: string, customer: Partial<Customer>) => Promise<boolean>
//   deleteCustomer: (id: string) => Promise<boolean>

//   addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
//   updateLead: (id: string, lead: Partial<Lead>) => Promise<boolean>
//   deleteLead: (id: string) => Promise<boolean>
//   convertLead: (id: string, customerData?: any) => Promise<boolean>

//   addDeal: (deal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
//   updateDeal: (id: string, deal: Partial<Deal>) => Promise<boolean>
//   deleteDeal: (id: string) => Promise<boolean>

//   addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
//   updateTask: (id: string, task: Partial<Task>) => Promise<boolean>
//   deleteTask: (id: string) => Promise<boolean>

//   addInvoice: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
//   updateInvoice: (id: string, invoice: Partial<Invoice>) => Promise<boolean>
//   deleteInvoice: (id: string) => Promise<boolean>

//   addRenewalReminder: (reminder: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
//   updateRenewalReminder: (id: string, reminder: Partial<RenewalReminder>) => Promise<boolean>
//   deleteRenewalReminder: (id: string) => Promise<boolean>

//   addRenewal: (renewal: Omit<Renewal, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
//   updateRenewal: (id: string, renewal: Partial<Renewal>) => Promise<boolean>
//   deleteRenewal: (id: string) => Promise<boolean>

//   refreshData: () => Promise<void>
//   refreshCustomers: () => Promise<void>
//   refreshLeads: () => Promise<void>
//   refreshDeals: () => Promise<void>
//   refreshTasks: () => Promise<void>
//   refreshInvoices: () => Promise<void>
//   refreshRenewals: () => Promise<void>
//   refreshUsers: () => Promise<void>
// }

// const CRMContext = createContext<CRMContextType | undefined>(undefined)

// // Helpers
// const toDate = (value: unknown): Date | null => {
//   if (!value) return null
//   if (value instanceof Date) return value
//   const d = new Date(value as string)
//   return Number.isNaN(d.getTime()) ? null : d
// }

// const normalizeCustomer = (raw: any): Customer => ({
//   id: String(raw.id),
//   name: raw.name,
//   email: raw.email,
//   phone: raw.phone,
//   company: raw.company,
//   address: raw.address,
//   city: raw.city,
//   state: raw.state,
//   zipCode: raw.zip_code ?? raw.zipCode,
//   country: raw.country,
//   status: raw.status,
//   source: raw.source,
//   tags: Array.isArray(raw.tags)
//     ? raw.tags
//     : (() => {
//         try {
//           return raw.tags ? JSON.parse(raw.tags) : []
//         } catch {
//           return []
//         }
//       })(),
//   notes: raw.notes,
//   totalValue:
//     typeof raw.totalValue === "number"
//       ? raw.totalValue
//       : typeof raw.total_value === "number"
//       ? raw.total_value
//       : Number(raw.totalValue ?? raw.total_value ?? 0) || 0,
//   whatsappNumber: raw.whatsapp_number ?? raw.whatsappNumber,
//   lastContactDate:
//     toDate(raw.lastContactDate ?? raw.last_contact_date) ??
//     (raw.lastContactDate ?? raw.last_contact_date),
//   createdAt:
//     toDate(raw.createdAt ?? raw.created_at) ??
//     (raw.createdAt ?? raw.created_at),
//   updatedAt:
//     toDate(raw.updatedAt ?? raw.updated_at) ??
//     (raw.updatedAt ?? raw.updated_at),
//   // single service per row
//   service: raw.service ?? null,
// })

// export function CRMProvider({ children }: { children: React.ReactNode }) {
//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [leads, setLeads] = useState<Lead[]>([])
//   const [deals, setDeals] = useState<Deal[]>([])
//   const [tasks, setTasks] = useState<Task[]>([])
//   const [invoices, setInvoices] = useState<Invoice[]>([])
//   const [renewalReminders, setRenewalReminders] = useState<RenewalReminder[]>([])
//   const [renewals, setRenewals] = useState<Renewal[]>([])
//   const [users, setUsers] = useState<User[]>([])

//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     void refreshData()
//   }, [])

//   const refreshData = async () => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       await Promise.all([
//         refreshCustomers(),
//         refreshLeads(),
//         refreshDeals(),
//         refreshTasks(),
//         refreshInvoices(),
//         refreshRenewals(),
//         refreshUsers(),
//       ])
//     } catch (err) {
//       console.error("Failed to load CRM data:", err)
//       setError(err instanceof Error ? err.message : "Failed to load CRM data")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const refreshUsers = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         },
//       )

//       if (response.ok) {
//         const data = await response.json()
//         setUsers(data.users || [])
//       }
//     } catch (err) {
//       console.error("Failed to fetch users:", err)
//       setUsers([
//         { id: "user1", name: "Default User", email: "user@example.com", role: "admin" },
//       ])
//     }
//   }

//   const refreshCustomers = async () => {
//     try {
//       const response = await customersApi.getAll({ limit: 100 })
//       const list = (response.customers || []) as any[]
//       setCustomers(list.map((c) => normalizeCustomer(c)))
//     } catch (err) {
//       console.error("Failed to fetch customers:", err)
//       throw err
//     }
//   }

//   const refreshLeads = async () => {
//     try {
//       const response = await leadsApi.getAll({ limit: 100 })
//       const list = (response.leads || []) as Lead[]
//       setLeads(
//         list.map((l) => ({
//           ...l,
//           createdAt: toDate(l.createdAt) ?? l.createdAt,
//           updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
//           lastContactDate: toDate(l.lastContactDate) ?? l.lastContactDate,
//         })),
//       )
//     } catch (err) {
//       console.error("Failed to fetch leads:", err)
//       throw err
//     }
//   }

//   const refreshDeals = async () => {
//     try {
//       const response = await dealsApi.getAll({ limit: 100 })
//       const list = (response.deals || []) as Deal[]
//       setDeals(
//         list.map((d) => ({
//           ...d,
//           createdAt: toDate(d.createdAt) ?? d.createdAt,
//           updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
//           expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
//           value: typeof d.value === "number" ? d.value : Number(d.value ?? 0) || 0,
//         })),
//       )
//     } catch (err) {
//       console.error("Failed to fetch deals:", err)
//       throw err
//     }
//   }

//   const refreshTasks = async () => {
//     try {
//       const response = await tasksApi.getAll({ limit: 100 })
//       const list = (response.tasks || []) as Task[]
//       setTasks(
//         list.map((t) => ({
//           ...t,
//           createdAt: toDate(t.createdAt) ?? t.createdAt,
//           updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
//           dueDate: toDate(t.dueDate) ?? t.dueDate,
//           completedAt: toDate(t.completedAt) ?? t.completedAt,
//         })),
//       )
//     } catch (err) {
//       console.error("Failed to fetch tasks:", err)
//       throw err
//     }
//   }

//   const refreshInvoices = async () => {
//     try {
//       const response = await invoicesApi.getAll({ limit: 100 })
//       const list = (response.invoices || []) as Invoice[]
//       setInvoices(
//         list.map((inv) => ({
//           ...inv,
//           createdAt: toDate(inv.createdAt) ?? inv.createdAt,
//           updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
//           invoiceDate: toDate(inv.invoiceDate) ?? inv.invoiceDate,
//           dueDate: toDate(inv.dueDate) ?? inv.dueDate,
//           total: typeof inv.total === "number" ? inv.total : Number(inv.total ?? 0) || 0,
//         })),
//       )
//     } catch (err) {
//       console.error("Failed to fetch invoices:", err)
//       throw err
//     }
//   }

//   const refreshRenewals = async () => {
//     try {
//       const [renewalsResponse, remindersResponse] = await Promise.all([
//         renewalsApi.getAll({ limit: 100 }),
//         renewalsApi.getReminders(),
//       ])

//       const renewalsList = (renewalsResponse.renewals || []) as Renewal[]
//       const remindersList = (remindersResponse.reminders || []) as RenewalReminder[]

//       setRenewals(
//         renewalsList.map((r) => ({
//           ...r,
//           createdAt: toDate(r.createdAt) ?? r.createdAt,
//           updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
//           startDate: toDate(r.startDate) ?? r.startDate,
//           endDate: toDate(r.endDate) ?? r.endDate,
//           amount: typeof r.amount === "number" ? r.amount : Number(r.amount ?? 0) || 0,
//         })),
//       )

//       setRenewalReminders(
//         remindersList.map((rr) => ({
//           ...rr,
//           createdAt: toDate(rr.createdAt) ?? rr.createdAt,
//           updatedAt: toDate(rr.updatedAt) ?? rr.updatedAt,
//           expiryDate: toDate(rr.expiryDate) ?? rr.expiryDate,
//           lastReminderSent: toDate(rr.lastReminderSent) ?? rr.lastReminderSent,
//           reminderDays: Array.isArray(rr.reminderDays)
//             ? rr.reminderDays
//             : (() => {
//                 try {
//                   return JSON.parse((rr.reminderDays as unknown as string) || "[]") as number[]
//                 } catch {
//                   return []
//                 }
//               })(),
//         })),
//       )
//     } catch (err) {
//       console.error("Failed to fetch renewals:", err)
//       throw err
//     }
//   }

//   // Customer CRUD
//   const addCustomer = async (
//     customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">,
//   ): Promise<boolean> => {
//     try {
//       const payload = {
//         ...customerData,
//         totalValue:
//           customerData.totalValue !== undefined &&
//           customerData.totalValue !== null &&
//           customerData.totalValue !== ""
//             ? Number(customerData.totalValue)
//             : 0,
//       }

//       const response = await customersApi.create(payload)

//       const rawList: any[] = Array.isArray(response.customers)
//         ? response.customers
//         : response.customer
//         ? [response.customer]
//         : []

//       if (rawList.length === 0) {
//         return false
//       }

//       const normalizedList = rawList.map((c) => normalizeCustomer(c))
//       setCustomers((prev) => [...normalizedList, ...prev])

//       return true
//     } catch (err) {
//       console.error("Failed to add customer:", err)
//       return false
//     }
//   }

//   const updateCustomer = async (
//     id: string,
//     customerData: Partial<Customer>,
//   ): Promise<boolean> => {
//     try {
//       const payload: any = { ...customerData }
//       if ("totalValue" in payload) {
//         const v = payload.totalValue
//         payload.totalValue =
//           v !== undefined && v !== null && v !== "" ? Number(v) : 0
//       }

//       const response = await customersApi.update(id, payload)
//       if (response.customer) {
//         const c = normalizeCustomer(response.customer)
//         setCustomers((prev) =>
//           prev.map((customer) => (customer.id === id ? c : customer)),
//         )
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to update customer:", err)
//       throw err
//     }
//   }

//   const deleteCustomer = async (id: string): Promise<boolean> => {
//     try {
//       await customersApi.delete(id)
//       setCustomers((prev) => prev.filter((customer) => customer.id !== id))
//       return true
//     } catch (err) {
//       console.error("Failed to delete customer:", err)
//       return false
//     }
//   }

//   // Lead CRUD
//   // const addLead = async (
//   //   leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">,
//   // ): Promise<boolean> => {
//   //   try {
//   //     const response = await leadsApi.create(leadData)
//   //     if (response.lead) {
//   //       const l = response.lead as Lead
//   //       setLeads((prev) => [
//   //         ...prev,
//   //         {
//   //           ...l,
//   //           createdAt: toDate(l.createdAt) ?? l.createdAt,
//   //           updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
//   //           lastContactDate: toDate((l as any).lastContactDate) ?? (l as any).lastContactDate,
//   //         },
//   //       ])
//   //       return true
//   //     }
//   //     return false
//   //   } catch (err) {
//   //     console.error("Failed to add lead:", err)
//   //     return false
//   //   }
//   // }

//  const addLead = async (
//   leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">,
// ): Promise<boolean> => {
//   try {
//     const response = await leadsApi.create(leadData)

//     // Support different response shapes: { lead }, { data: { lead } }, or raw lead
//     const rawLead: any =
//       (response && (response.lead || response.data?.lead)) ||
//       (response && !("lead" in response) && !("leads" in response) ? response : null)

//     if (!rawLead) {
//       console.error("addLead: no lead in response", response)
//       return false
//     }

//     const l = rawLead as Lead

//     const normalized: Lead = {
//       ...l,
//       // ensure numeric
//       estimatedValue:
//         typeof l.estimatedValue === "number"
//           ? l.estimatedValue
//           : Number((l as any).estimated_value ?? l.estimatedValue ?? 0) || 0,
//       // convert dates to Date where possible
//       createdAt:
//         l.createdAt instanceof Date
//           ? l.createdAt
//           : l.createdAt
//           ? new Date(l.createdAt as unknown as string)
//           : l.createdAt,
//       updatedAt:
//         l.updatedAt instanceof Date
//           ? l.updatedAt
//           : l.updatedAt
//           ? new Date(l.updatedAt as unknown as string)
//           : l.updatedAt,
//       expectedCloseDate:
//         l.expectedCloseDate instanceof Date
//           ? l.expectedCloseDate
//           : l.expectedCloseDate
//           ? new Date(l.expectedCloseDate as unknown as string)
//           : l.expectedCloseDate,
//       lastContactDate:
//         (l as any).lastContactDate instanceof Date
//           ? (l as any).lastContactDate
//           : (l as any).lastContactDate
//           ? new Date((l as any).lastContactDate as unknown as string)
//           : (l as any).lastContactDate,
//     }

//     setLeads((prev) => [...prev, normalized])

//     return true
//   } catch (err) {
//     console.error("Failed to add lead:", err)
//     return false
//   }
// }

//   const updateLead = async (id: string, leadData: Partial<Lead>): Promise<boolean> => {
//     try {
//       const response = await leadsApi.update(id, leadData)
//       if (response.lead) {
//         const l = response.lead as Lead
//         setLeads((prev) =>
//           prev.map((lead) =>
//             lead.id === id
//               ? {
//                   ...l,
//                   createdAt: toDate(l.createdAt) ?? l.createdAt,
//                   updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
//                 }
//               : lead,
//           ),
//         )
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to update lead:", err)
//       return false
//     }
//   }

//   const deleteLead = async (id: string): Promise<boolean> => {
//     try {
//       await leadsApi.delete(id)
//       setLeads((prev) => prev.filter((lead) => lead.id !== id))
//       return true
//     } catch (err) {
//       console.error("Failed to delete lead:", err)
//       return false
//     }
//   }

//   const convertLead = async (id: string, customerData?: any): Promise<boolean> => {
//     try {
//       const response = await leadsApi.convertToCustomer(id, customerData)

//       const rawList: any[] = Array.isArray(response.customers)
//         ? response.customers
//         : response.customer
//         ? [response.customer]
//         : []

//       if (rawList.length === 0) {
//         return false
//       }

//       const normalizedList = rawList.map((c) => normalizeCustomer(c))

//       // update lead status locally to closed-won so cards/stats stay in sync
//       setLeads((prev) =>
//         prev.map((lead) =>
//           lead.id === id ? { ...lead, status: "closed-won" } : lead,
//         ),
//       )

//       // prepend new customer(s)
//       setCustomers((prev) => [...normalizedList, ...prev])

//       return true
//     } catch (err) {
//       console.error("Failed to convert lead:", err)
//       return false
//     }
//   }

//   // Deal CRUD (unchanged) ...
//   // [rest of deals, tasks, invoices, renewals code stays exactly as in your file]

//   // Deal CRUD (unchanged)
//   const addDeal = async (
//     dealData: Omit<Deal, "id" | "createdAt" | "updatedAt">,
//   ): Promise<boolean> => {
//     try {
//       const formattedDealData = {
//         ...dealData,
//         expectedCloseDate: dealData.expectedCloseDate
//           ? dealData.expectedCloseDate instanceof Date
//             ? dealData.expectedCloseDate.toISOString()
//             : dealData.expectedCloseDate
//           : null,
//         ...(dealData.actualCloseDate && {
//           actualCloseDate:
//             dealData.actualCloseDate instanceof Date
//               ? dealData.actualCloseDate.toISOString()
//               : dealData.actualCloseDate,
//         }),
//         products: Array.isArray(dealData.products) ? dealData.products : [],
//       }

//       const response = await dealsApi.create(formattedDealData)

//       if (response.deal) {
//         const d = response.deal as Deal
//         setDeals((prev) => [
//           ...prev,
//           {
//             ...d,
//             createdAt: toDate(d.createdAt) ?? d.createdAt,
//             updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
//             expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
//           },
//         ])
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to add deal:", err)
//       return false
//     }
//   }

//   const updateDeal = async (id: string, dealData: Partial<Deal>): Promise<boolean> => {
//     try {
//       const formattedDealData: any = { ...dealData }

//       if (dealData.expectedCloseDate) {
//         formattedDealData.expectedCloseDate =
//           dealData.expectedCloseDate instanceof Date
//             ? dealData.expectedCloseDate.toISOString()
//             : dealData.expectedCloseDate
//       }

//       if (dealData.actualCloseDate) {
//         formattedDealData.actualCloseDate =
//           dealData.actualCloseDate instanceof Date
//             ? dealData.actualCloseDate.toISOString()
//             : dealData.actualCloseDate
//       }

//       const response = await dealsApi.update(id, formattedDealData)

//       if (response.deal) {
//         const d = response.deal as Deal
//         setDeals((prev) =>
//           prev.map((deal) =>
//             deal.id === id
//               ? {
//                   ...d,
//                   createdAt: toDate(d.createdAt) ?? d.createdAt,
//                   updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
//                   expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
//                 }
//               : deal,
//           ),
//         )
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to update deal:", err)
//       return false
//     }
//   }

//   const deleteDeal = async (id: string): Promise<boolean> => {
//     try {
//       await dealsApi.delete(id)
//       setDeals((prev) => prev.filter((deal) => deal.id !== id))
//       return true
//     } catch (err) {
//       console.error("Failed to delete deal:", err)
//       return false
//     }
//   }

//   // Task CRUD (unchanged)
//   const addTask = async (
//     taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
//   ): Promise<boolean> => {
//     try {
//       const response = await tasksApi.create(taskData)
//       if (response.task) {
//         const t = response.task as Task
//         setTasks((prev) => [
//           ...prev,
//           {
//             ...t,
//             createdAt: toDate(t.createdAt) ?? t.createdAt,
//             updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
//           },
//         ])
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to add task:", err)
//       return false
//     }
//   }

//   const updateTask = async (id: string, taskData: Partial<Task>): Promise<boolean> => {
//     try {
//       const response = await tasksApi.update(id, taskData)
//       if (response.task) {
//         const t = response.task as Task
//         setTasks((prev) =>
//           prev.map((task) =>
//             task.id === id
//               ? {
//                   ...t,
//                   createdAt: toDate(t.createdAt) ?? t.createdAt,
//                   updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
//                 }
//               : task,
//           ),
//         )
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to update task:", err)
//       return false
//     }
//   }

//   const deleteTask = async (id: string): Promise<boolean> => {
//     try {
//       await tasksApi.delete(id)
//       setTasks((prev) => prev.filter((task) => task.id !== id))
//       return true
//     } catch (err) {
//       console.error("Failed to delete task:", err)
//       return false
//     }
//   }

//   // Invoice CRUD (unchanged)
//   const addInvoice = async (
//     invoiceData: Omit<Invoice, "id" | "createdAt" | "updatedAt">,
//   ): Promise<boolean> => {
//     try {
//       const response = await invoicesApi.create(invoiceData)
//       if (response.invoice) {
//         const inv = response.invoice as Invoice
//         setInvoices((prev) => [
//           ...prev,
//           {
//             ...inv,
//             createdAt: toDate(inv.createdAt) ?? inv.createdAt,
//             updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
//           },
//         ])
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to add invoice:", err)
//       return false
//     }
//   }

//   const updateInvoice = async (
//     id: string,
//     invoiceData: Partial<Invoice>,
//   ): Promise<boolean> => {
//     try {
//       const response = await invoicesApi.update(id, invoiceData)
//       if (response.invoice) {
//         const inv = response.invoice as Invoice
//         setInvoices((prev) =>
//           prev.map((invoice) =>
//             invoice.id === id
//               ? {
//                   ...inv,
//                   createdAt: toDate(inv.createdAt) ?? inv.createdAt,
//                   updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
//                 }
//               : invoice,
//           ),
//         )
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to update invoice:", err)
//       return false
//     }
//   }

//   const deleteInvoice = async (id: string): Promise<boolean> => {
//     try {
//       await invoicesApi.delete(id)
//       setInvoices((prev) => prev.filter((invoice) => invoice.id !== id))
//       return true
//     } catch (err) {
//       console.error("Failed to delete invoice:", err)
//       return false
//     }
//   }

//   // Renewal reminder CRUD (partial)
//   const addRenewalReminder = async (
//     reminderData: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">,
//   ): Promise<boolean> => {
//     try {
//       const response = await renewalsApi.createReminder(reminderData)
//       if (response.reminder) {
//         const rr = response.reminder as RenewalReminder
//         setRenewalReminders((prev) => [
//           ...prev,
//           {
//             ...rr,
//             createdAt: toDate(rr.createdAt) ?? rr.createdAt,
//             updatedAt: toDate(rr.updatedAt) ?? rr.updatedAt,
//           },
//         ])
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to add renewal reminder:", err)
//       return false
//     }
//   }

//   const updateRenewalReminder = async (
//     _id: string,
//     _reminderData: Partial<RenewalReminder>,
//   ): Promise<boolean> => {
//     console.warn("Update renewal reminder not implemented in backend yet")
//     return false
//   }

//   const deleteRenewalReminder = async (_id: string): Promise<boolean> => {
//     console.warn("Delete renewal reminder not implemented in backend yet")
//     return false
//   }

//   // Renewal CRUD (unchanged)
//   const addRenewal = async (
//     renewalData: Omit<Renewal, "id" | "createdAt" | "updatedAt">,
//   ): Promise<boolean> => {
//     try {
//       const response = await renewalsApi.create(renewalData)
//       if (response.renewal) {
//         const r = response.renewal as Renewal
//         setRenewals((prev) => [
//           ...prev,
//           {
//             ...r,
//             createdAt: toDate(r.createdAt) ?? r.createdAt,
//             updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
//           },
//         ])
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to add renewal:", err)
//       return false
//     }
//   }

//   const updateRenewal = async (
//     id: string,
//     renewalData: Partial<Renewal>,
//   ): Promise<boolean> => {
//     try {
//       const response = await renewalsApi.update(id, renewalData)
//       if (response.renewal) {
//         const r = response.renewal as Renewal
//         setRenewals((prev) =>
//           prev.map((renewal) =>
//             renewal.id === id
//               ? {
//                   ...r,
//                   createdAt: toDate(r.createdAt) ?? r.createdAt,
//                   updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
//                 }
//               : renewal,
//           ),
//         )
//         return true
//       }
//       return false
//     } catch (err) {
//       console.error("Failed to update renewal:", err)
//       return false
//     }
//   }

//   const deleteRenewal = async (id: string): Promise<boolean> => {
//     try {
//       await renewalsApi.delete(id)
//       setRenewals((prev) => prev.filter((renewal) => renewal.id !== id))
//     } catch (err) {
//       console.error("Failed to delete renewal:", err)
//       return false
//     }
//     return true
//   }

//   const value: CRMContextType = {
//     customers,
//     leads,
//     deals,
//     tasks,
//     invoices,
//     renewalReminders,
//     renewals,
//     users,
//     isLoading,
//     error,
//     addCustomer,
//     updateCustomer,
//     deleteCustomer,
//     addLead,
//     updateLead,
//     deleteLead,
//     convertLead,
//     addDeal,
//     updateDeal,
//     deleteDeal,
//     addTask,
//     updateTask,
//     deleteTask,
//     addInvoice,
//     updateInvoice,
//     deleteInvoice,
//     addRenewalReminder,
//     updateRenewalReminder,
//     deleteRenewalReminder,
//     addRenewal,
//     updateRenewal,
//     deleteRenewal,
//     refreshData,
//     refreshCustomers,
//     refreshLeads,
//     refreshDeals,
//     refreshTasks,
//     refreshInvoices,
//     refreshRenewals,
//     refreshUsers,
//   }

//   return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>
// }

// export function useCRM() {
//   const context = useContext(CRMContext)
//   if (context === undefined) {
//     throw new Error("useCRM must be used within a CRMProvider")
//   }
//   return context
// }


//testing 2


"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Customer, Lead, Deal, Task, Invoice, RenewalReminder, Renewal } from "@/types/crm"
import { customersApi, leadsApi, dealsApi, tasksApi, invoicesApi, renewalsApi } from "@/lib/api"

// Add User type
interface User {
  id: string
  name: string
  email: string
  role: string
}

interface CRMContextType {
  customers: Customer[]
  leads: Lead[]
  deals: Deal[]
  tasks: Task[]
  invoices: Invoice[]
  renewalReminders: RenewalReminder[]
  renewals: Renewal[]
  users: User[]

  isLoading: boolean
  error: string | null

  addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<boolean>
  deleteCustomer: (id: string) => Promise<boolean>

  addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateLead: (id: string, lead: Partial<Lead>) => Promise<boolean>
  deleteLead: (id: string) => Promise<boolean>
  convertLead: (id: string, customerData?: any) => Promise<boolean>

  addDeal: (deal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateDeal: (id: string, deal: Partial<Deal>) => Promise<boolean>
  deleteDeal: (id: string) => Promise<boolean>

  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateTask: (id: string, task: Partial<Task>) => Promise<boolean>
  deleteTask: (id: string) => Promise<boolean>

  addInvoice: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateInvoice: (id: string, invoice: Partial<Invoice>) => Promise<boolean>
  deleteInvoice: (id: string) => Promise<boolean>

  addRenewalReminder: (reminder: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateRenewalReminder: (id: string, reminder: Partial<RenewalReminder>) => Promise<boolean>
  deleteRenewalReminder: (id: string) => Promise<boolean>

  addRenewal: (renewal: Omit<Renewal, "id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateRenewal: (id: string, renewal: Partial<Renewal>) => Promise<boolean>
  deleteRenewal: (id: string) => Promise<boolean>

  refreshData: () => Promise<void>
  refreshCustomers: () => Promise<void>
  refreshLeads: () => Promise<void>
  refreshDeals: () => Promise<void>
  refreshTasks: () => Promise<void>
  refreshInvoices: () => Promise<void>
  refreshRenewals: () => Promise<void>
  refreshUsers: () => Promise<void>
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

// Helpers
const toDate = (value: unknown): Date | null => {
  if (!value) return null
  if (value instanceof Date) return value
  const d = new Date(value as string)
  return Number.isNaN(d.getTime()) ? null : d
}

const normalizeCustomer = (raw: any): Customer => ({
  id: String(raw.id),
  name: raw.name,
  email: raw.email,
  phone: raw.phone,
  company: raw.company,
  address: raw.address,
  city: raw.city,
  state: raw.state,
  zipCode: raw.zip_code ?? raw.zipCode,
  country: raw.country,
  status: raw.status,
  source: raw.source,
  tags: Array.isArray(raw.tags)
    ? raw.tags
    : (() => {
        try {
          return raw.tags ? JSON.parse(raw.tags) : []
        } catch {
          return []
        }
      })(),
  notes: raw.notes,
  totalValue:
    typeof raw.totalValue === "number"
      ? raw.totalValue
      : typeof raw.total_value === "number"
      ? raw.total_value
      : Number(raw.totalValue ?? raw.total_value ?? 0) || 0,
  whatsappNumber: raw.whatsapp_number ?? raw.whatsappNumber,
  lastContactDate:
    toDate(raw.lastContactDate ?? raw.last_contact_date) ??
    (raw.lastContactDate ?? raw.last_contact_date),
  createdAt:
    toDate(raw.createdAt ?? raw.created_at) ??
    (raw.createdAt ?? raw.created_at),
  updatedAt:
    toDate(raw.updatedAt ?? raw.updated_at) ??
    (raw.updatedAt ?? raw.updated_at),
  // single service per row
  service: raw.service ?? null,
})

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [renewalReminders, setRenewalReminders] = useState<RenewalReminder[]>([])
  const [renewals, setRenewals] = useState<Renewal[]>([])
  const [users, setUsers] = useState<User[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void refreshData()
  }, [])

  const refreshData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await Promise.all([
        refreshCustomers(),
        refreshLeads(),
        refreshDeals(),
        refreshTasks(),
        refreshInvoices(),
        refreshRenewals(),
        refreshUsers(),
      ])
    } catch (err) {
      console.error("Failed to load CRM data:", err)
      setError(err instanceof Error ? err.message : "Failed to load CRM data")
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      }
    } catch (err) {
      console.error("Failed to fetch users:", err)
      setUsers([
        { id: "user1", name: "Default User", email: "user@example.com", role: "admin" },
      ])
    }
  }

  const refreshCustomers = async () => {
    try {
      const response = await customersApi.getAll({ limit: 100 })
      const list = (response.customers || []) as any[]
      setCustomers(list.map((c) => normalizeCustomer(c)))
    } catch (err) {
      console.error("Failed to fetch customers:", err)
      throw err
    }
  }

  const refreshLeads = async () => {
    try {
      const response = await leadsApi.getAll({ limit: 100 })
      const list = (response.leads || []) as Lead[]
      setLeads(
        list.map((l) => ({
          ...l,
          createdAt: toDate(l.createdAt) ?? l.createdAt,
          updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
          lastContactDate: toDate(l.lastContactDate) ?? l.lastContactDate,
        })),
      )
    } catch (err) {
      console.error("Failed to fetch leads:", err)
      throw err
    }
  }

  const refreshDeals = async () => {
    try {
      const response = await dealsApi.getAll({ limit: 100 })
      const list = (response.deals || []) as Deal[]
      setDeals(
        list.map((d) => ({
          ...d,
          createdAt: toDate(d.createdAt) ?? d.createdAt,
          updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
          expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
          value: typeof d.value === "number" ? d.value : Number(d.value ?? 0) || 0,
        })),
      )
    } catch (err) {
      console.error("Failed to fetch deals:", err)
      throw err
    }
  }

  const refreshTasks = async () => {
    try {
      const response = await tasksApi.getAll({ limit: 100 })
      const list = (response.tasks || []) as Task[]
      setTasks(
        list.map((t) => ({
          ...t,
          createdAt: toDate(t.createdAt) ?? t.createdAt,
          updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
          dueDate: toDate(t.dueDate) ?? t.dueDate,
          completedAt: toDate(t.completedAt) ?? t.completedAt,
        })),
      )
    } catch (err) {
      console.error("Failed to fetch tasks:", err)
      throw err
    }
  }

  const refreshInvoices = async () => {
    try {
      const response = await invoicesApi.getAll({ limit: 100 })
      const list = (response.invoices || []) as Invoice[]
      setInvoices(
        list.map((inv) => ({
          ...inv,
          createdAt: toDate(inv.createdAt) ?? inv.createdAt,
          updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
          invoiceDate: toDate(inv.invoiceDate) ?? inv.invoiceDate,
          dueDate: toDate(inv.dueDate) ?? inv.dueDate,
          total: typeof inv.total === "number" ? inv.total : Number(inv.total ?? 0) || 0,
        })),
      )
    } catch (err) {
      console.error("Failed to fetch invoices:", err)
      throw err
    }
  }

  const refreshRenewals = async () => {
    try {
      const [renewalsResponse, remindersResponse] = await Promise.all([
        renewalsApi.getAll({ limit: 100 }),
        renewalsApi.getReminders(),
      ])

      const renewalsList = (renewalsResponse.renewals || []) as Renewal[]
      const remindersList = (remindersResponse.reminders || []) as RenewalReminder[]

      setRenewals(
        renewalsList.map((r) => ({
          ...r,
          createdAt: toDate(r.createdAt) ?? r.createdAt,
          updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
          startDate: toDate(r.startDate) ?? r.startDate,
          endDate: toDate(r.endDate) ?? r.endDate,
          amount: typeof r.amount === "number" ? r.amount : Number(r.amount ?? 0) || 0,
        })),
      )

      setRenewalReminders(
        remindersList.map((rr) => ({
          ...rr,
          createdAt: toDate(rr.createdAt) ?? rr.createdAt,
          updatedAt: toDate(rr.updatedAt) ?? rr.updatedAt,
          expiryDate: toDate(rr.expiryDate) ?? rr.expiryDate,
          lastReminderSent: toDate(rr.lastReminderSent) ?? rr.lastReminderSent,
          reminderDays: Array.isArray(rr.reminderDays)
            ? rr.reminderDays
            : (() => {
                try {
                  return JSON.parse((rr.reminderDays as unknown as string) || "[]") as number[]
                } catch {
                  return []
                }
              })(),
        })),
      )
    } catch (err) {
      console.error("Failed to fetch renewals:", err)
      throw err
    }
  }

  // Customer CRUD
  const addCustomer = async (
    customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    try {
      const payload = {
        ...customerData,
        totalValue:
          customerData.totalValue !== undefined &&
          customerData.totalValue !== null &&
          customerData.totalValue !== ""
            ? Number(customerData.totalValue)
            : 0,
      }

      const response = await customersApi.create(payload)

      const rawList: any[] = Array.isArray(response.customers)
        ? response.customers
        : response.customer
        ? [response.customer]
        : []

      if (rawList.length === 0) {
        return false
      }

      const normalizedList = rawList.map((c) => normalizeCustomer(c))
      setCustomers((prev) => [...normalizedList, ...prev])

      return true
    } catch (err) {
      console.error("Failed to add customer:", err)
      return false
    }
  }

  const updateCustomer = async (
    id: string,
    customerData: Partial<Customer>,
  ): Promise<boolean> => {
    try {
      const payload: any = { ...customerData }
      if ("totalValue" in payload) {
        const v = payload.totalValue
        payload.totalValue =
          v !== undefined && v !== null && v !== "" ? Number(v) : 0
      }

      const response = await customersApi.update(id, payload)
      if (response.customer) {
        const c = normalizeCustomer(response.customer)
        setCustomers((prev) =>
          prev.map((customer) => (customer.id === id ? c : customer)),
        )
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update customer:", err)
      throw err
    }
  }

  const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
      await customersApi.delete(id)
      setCustomers((prev) => prev.filter((customer) => customer.id !== id))
      return true
    } catch (err) {
      console.error("Failed to delete customer:", err)
      return false
    }
  }

  // Lead CRUD
  const addLead = async (
    leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    try {
      const response = await leadsApi.create(leadData)

      const rawLead: any =
        (response && (response.lead || response.data?.lead)) ||
        (response && !("lead" in response) && !("leads" in response) ? response : null)

      if (!rawLead) {
        console.error("addLead: no lead in response", response)
        return false
      }

      const l = rawLead as Lead

      const normalized: Lead = {
        ...l,
        estimatedValue:
          typeof l.estimatedValue === "number"
            ? l.estimatedValue
            : Number((l as any).estimated_value ?? l.estimatedValue ?? 0) || 0,
        createdAt:
          l.createdAt instanceof Date
            ? l.createdAt
            : l.createdAt
            ? new Date(l.createdAt as unknown as string)
            : l.createdAt,
        updatedAt:
          l.updatedAt instanceof Date
            ? l.updatedAt
            : l.updatedAt
            ? new Date(l.updatedAt as unknown as string)
            : l.updatedAt,
        expectedCloseDate:
          l.expectedCloseDate instanceof Date
            ? l.expectedCloseDate
            : l.expectedCloseDate
            ? new Date(l.expectedCloseDate as unknown as string)
            : l.expectedCloseDate,
        lastContactDate:
          (l as any).lastContactDate instanceof Date
            ? (l as any).lastContactDate
            : (l as any).lastContactDate
            ? new Date((l as any).lastContactDate as unknown as string)
            : (l as any).lastContactDate,
      }

      setLeads((prev) => [...prev, normalized])

      return true
    } catch (err) {
      console.error("Failed to add lead:", err)
      return false
    }
  }

  const updateLead = async (id: string, leadData: Partial<Lead>): Promise<boolean> => {
    try {
      const response = await leadsApi.update(id, leadData)
      if (response.lead) {
        const l = response.lead as Lead
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id
              ? {
                  ...l,
                  createdAt: toDate(l.createdAt) ?? l.createdAt,
                  updatedAt: toDate(l.updatedAt) ?? l.updatedAt,
                }
              : lead,
          ),
        )
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update lead:", err)
      return false
    }
  }

  const deleteLead = async (id: string): Promise<boolean> => {
    try {
      await leadsApi.delete(id)
      setLeads((prev) => prev.filter((lead) => lead.id !== id))
      return true
    } catch (err) {
      console.error("Failed to delete lead:", err)
      return false
    }
  }

  const convertLead = async (id: string, customerData?: any): Promise<boolean> => {
    try {
      const response = await leadsApi.convertToCustomer(id, customerData)

      const rawList: any[] = Array.isArray(response.customers)
        ? response.customers
        : response.customer
        ? [response.customer]
        : []

      if (rawList.length === 0) {
        return false
      }

      const normalizedList = rawList.map((c) => normalizeCustomer(c))

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status: "closed-won" } : lead,
        ),
      )

      setCustomers((prev) => [...normalizedList, ...prev])

      return true
    } catch (err) {
      console.error("Failed to convert lead:", err)
      return false
    }
  }

  // Deal CRUD (now using leadId)
  const addDeal = async (
    dealData: Omit<Deal, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    try {
      const formattedDealData = {
        ...dealData,
        expectedCloseDate: dealData.expectedCloseDate
          ? dealData.expectedCloseDate instanceof Date
            ? dealData.expectedCloseDate.toISOString()
            : dealData.expectedCloseDate
          : null,
        ...(dealData.actualCloseDate && {
          actualCloseDate:
            dealData.actualCloseDate instanceof Date
              ? dealData.actualCloseDate.toISOString()
              : dealData.actualCloseDate,
        }),
        products: Array.isArray(dealData.products) ? dealData.products : [],
      }

      const response = await dealsApi.create(formattedDealData)

      const created: any =
        response && (response.deal || response.data?.deal) ? (response.deal || response.data.deal) : null

      if (!created) {
        console.error("addDeal: no deal in response", response)
        return false
      }

      const d = created as Deal

      setDeals((prev) => [
        ...prev,
        {
          ...d,
          value: typeof d.value === "number" ? d.value : Number(d.value ?? 0) || 0,
          createdAt: toDate(d.createdAt) ?? d.createdAt,
          updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
          expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
        },
      ])

      return true
    } catch (err) {
      console.error("Failed to add deal:", err)
      return false
    }
  }

  const updateDeal = async (id: string, dealData: Partial<Deal>): Promise<boolean> => {
    try {
      const formattedDealData: any = { ...dealData }

      if (dealData.expectedCloseDate) {
        formattedDealData.expectedCloseDate =
          dealData.expectedCloseDate instanceof Date
            ? dealData.expectedCloseDate.toISOString()
            : dealData.expectedCloseDate
      }

      if (dealData.actualCloseDate) {
        formattedDealData.actualCloseDate =
          dealData.actualCloseDate instanceof Date
            ? dealData.actualCloseDate.toISOString()
            : dealData.actualCloseDate
      }

      const response = await dealsApi.update(id, formattedDealData)

      const updated: any =
        response && (response.deal || response.data?.deal) ? (response.deal || response.data.deal) : null

      if (!updated) {
        console.error("updateDeal: no deal in response", response)
        return false
      }

      const d = updated as Deal

      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === id
            ? {
                ...d,
                value: typeof d.value === "number" ? d.value : Number(d.value ?? 0) || 0,
                createdAt: toDate(d.createdAt) ?? d.createdAt,
                updatedAt: toDate(d.updatedAt) ?? d.updatedAt,
                expectedCloseDate: toDate(d.expectedCloseDate) ?? d.expectedCloseDate,
              }
            : deal,
        ),
      )

      return true
    } catch (err) {
      console.error("Failed to update deal:", err)
      return false
    }
  }

  const deleteDeal = async (id: string): Promise<boolean> => {
    try {
      await dealsApi.delete(id)
      setDeals((prev) => prev.filter((deal) => deal.id !== id))
      return true
    } catch (err) {
      console.error("Failed to delete deal:", err)
      return false
    }
  }

  // Task CRUD (unchanged)
  const addTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    try {
      const response = await tasksApi.create(taskData)
      if (response.task) {
        const t = response.task as Task
        setTasks((prev) => [
          ...prev,
          {
            ...t,
            createdAt: toDate(t.createdAt) ?? t.createdAt,
            updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
          },
        ])
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to add task:", err)
      return false
    }
  }

  const updateTask = async (id: string, taskData: Partial<Task>): Promise<boolean> => {
    try {
      const response = await tasksApi.update(id, taskData)
      if (response.task) {
        const t = response.task as Task
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...t,
                  createdAt: toDate(t.createdAt) ?? t.createdAt,
                  updatedAt: toDate(t.updatedAt) ?? t.updatedAt,
                }
              : task,
          ),
        )
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update task:", err)
      return false
    }
  }

  const deleteTask = async (id: string): Promise<boolean> => {
    try {
      await tasksApi.delete(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
      return true
    } catch (err) {
      console.error("Failed to delete task:", err)
      return false
    }
  }

  // Invoice CRUD (unchanged)
  const addInvoice = async (
    invoiceData: Omit<Invoice, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    try {
      const response = await invoicesApi.create(invoiceData)
      if (response.invoice) {
        const inv = response.invoice as Invoice
        setInvoices((prev) => [
          ...prev,
          {
            ...inv,
            createdAt: toDate(inv.createdAt) ?? inv.createdAt,
            updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
          },
        ])
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to add invoice:", err)
      return false
    }
  }

  const updateInvoice = async (
    id: string,
    invoiceData: Partial<Invoice>,
  ): Promise<boolean> => {
    try {
      const response = await invoicesApi.update(id, invoiceData)
      if (response.invoice) {
        const inv = response.invoice as Invoice
        setInvoices((prev) =>
          prev.map((invoice) =>
            invoice.id === id
              ? {
                  ...inv,
                  createdAt: toDate(inv.createdAt) ?? inv.createdAt,
                  updatedAt: toDate(inv.updatedAt) ?? inv.updatedAt,
                }
              : invoice,
          ),
        )
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update invoice:", err)
      return false
    }
  }

  const deleteInvoice = async (id: string): Promise<boolean> => {
    try {
      await invoicesApi.delete(id)
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== id))
      return true
    } catch (err) {
      console.error("Failed to delete invoice:", err)
      return false
    }
  }

  // Renewal reminder CRUD (partial)
  const addRenewalReminder = async (
    reminderData: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    try {
      const response = await renewalsApi.createReminder(reminderData)
      if (response.reminder) {
        const rr = response.reminder as RenewalReminder
        setRenewalReminders((prev) => [
          ...prev,
          {
            ...rr,
            createdAt: toDate(rr.createdAt) ?? rr.createdAt,
            updatedAt: toDate(rr.updatedAt) ?? rr.updatedAt,
          },
        ])
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to add renewal reminder:", err)
      return false
    }
  }

  const updateRenewalReminder = async (
    _id: string,
    _reminderData: Partial<RenewalReminder>,
  ): Promise<boolean> => {
    console.warn("Update renewal reminder not implemented in backend yet")
    return false
  }

  const deleteRenewalReminder = async (_id: string): Promise<boolean> => {
    console.warn("Delete renewal reminder not implemented in backend yet")
    return false
  }

  // Renewal CRUD (unchanged)
  const addRenewal = async (
    renewalData: Omit<Renewal, "id" | "createdAt" | "updatedAt">,
  ): Promise<boolean> => {
    try {
      const response = await renewalsApi.create(renewalData)
      if (response.renewal) {
        const r = response.renewal as Renewal
        setRenewals((prev) => [
          ...prev,
          {
            ...r,
            createdAt: toDate(r.createdAt) ?? r.createdAt,
            updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
          },
        ])
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to add renewal:", err)
      return false
    }
  }

  const updateRenewal = async (
    id: string,
    renewalData: Partial<Renewal>,
  ): Promise<boolean> => {
    try {
      const response = await renewalsApi.update(id, renewalData)
      if (response.renewal) {
        const r = response.renewal as Renewal
        setRenewals((prev) =>
          prev.map((renewal) =>
            renewal.id === id
              ? {
                  ...r,
                  createdAt: toDate(r.createdAt) ?? r.createdAt,
                  updatedAt: toDate(r.updatedAt) ?? r.updatedAt,
                }
              : renewal,
          ),
        )
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update renewal:", err)
      return false
    }
  }

  const deleteRenewal = async (id: string): Promise<boolean> => {
    try {
      await renewalsApi.delete(id)
      setRenewals((prev) => prev.filter((renewal) => renewal.id !== id))
    } catch (err) {
      console.error("Failed to delete renewal:", err)
      return false
    }
    return true
  }

  const value: CRMContextType = {
    customers,
    leads,
    deals,
    tasks,
    invoices,
    renewalReminders,
    renewals,
    users,
    isLoading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addLead,
    updateLead,
    deleteLead,
    convertLead,
    addDeal,
    updateDeal,
    deleteDeal,
    addTask,
    updateTask,
    deleteTask,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addRenewalReminder,
    updateRenewalReminder,
    deleteRenewalReminder,
    addRenewal,
    updateRenewal,
    deleteRenewal,
    refreshData,
    refreshCustomers,
    refreshLeads,
    refreshDeals,
    refreshTasks,
    refreshInvoices,
    refreshRenewals,
    refreshUsers,
  }

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (context === undefined) {
    throw new Error("useCRM must be used within a CRMProvider")
  }
  return context
}
