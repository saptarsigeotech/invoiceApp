import { InvoiceType } from "@/types/types";

export interface StorageService {
    fetchInvoices(): Promise<InvoiceType[]>;
    addInvoice(invoice: Partial<InvoiceType>): Promise<InvoiceType>;
    updateInvoice(id: string, updates: Partial<InvoiceType>): Promise<InvoiceType>;
    removeInvoice(id: string): Promise<void>;
    markAsPaid(id: string): Promise<void>;
  }

