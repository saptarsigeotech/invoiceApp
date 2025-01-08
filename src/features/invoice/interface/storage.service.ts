import { InvoiceType } from "@/types/types";

export interface StorageService {
  fetchInvoices(): Promise<InvoiceType[]>;
  addInvoice(invoice: Omit<InvoiceType, 'id' | 'dueData' | 'dueAmount'>): Promise<InvoiceType>;
  updateInvoice(id: string, updates: Partial<InvoiceType>): Promise<InvoiceType>;
  removeInvoice(id: string): Promise<void>;
  markAsPaid(id: string): Promise<void>;
}

