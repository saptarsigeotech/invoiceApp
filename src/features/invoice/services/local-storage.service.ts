import { StorageService } from "../interface/storage.service";
import { InvoiceType } from "@/types/types";
import { calculateDueDate, generateRandomId } from "@/features/invoice/utils/invoice.utils";
import { initialInvoices } from "@/features/invoice/data/initialInvoices.data";

const localStorageKey = "allInvoices";

export class LocalStorageService implements StorageService {

  //fetch invoice method
  async fetchInvoices(): Promise<InvoiceType[]> {
    const storedInvoices = localStorage.getItem(localStorageKey);
    if (storedInvoices) {
      return JSON.parse(storedInvoices);
    }
    localStorage.setItem(localStorageKey, JSON.stringify(initialInvoices));
    return initialInvoices;
  }
  //add invoice method
  async addInvoice(invoice: Omit<InvoiceType, 'id' | 'dueData' | 'dueAmount'>): Promise<InvoiceType> {
    const invoices = await this.fetchInvoices();
    const newInvoice: InvoiceType = {
      id: generateRandomId(),
      ...invoice,
      dueDate: calculateDueDate(invoice.invoiceDate ?? "", invoice.paymentTerms ?? 0),
      dueAmount: invoice.itemList?.reduce((total, item) => total + (item.quantity ?? 0) * (item.price ?? 0), 0) || 0,
      status: invoice.status ?? "pending",
    };
    invoices.push(newInvoice);
    localStorage.setItem(localStorageKey, JSON.stringify(invoices));
    return newInvoice;
  }

  //update invoice method
  async updateInvoice(id: string, updates: Partial<InvoiceType>): Promise<InvoiceType> {
    const invoices = await this.fetchInvoices();
    const index = invoices.findIndex((invoice) => invoice.id === id);
    
    if (index === -1) throw new Error("Invoice not found.");
    
    const existingInvoice = invoices[index];
 
    const updatedInvoice = {
      ...existingInvoice,
      ...updates,
      dueDate: calculateDueDate(updates.invoiceDate ?? existingInvoice.invoiceDate, updates.paymentTerms ?? existingInvoice.paymentTerms),
      dueAmount: updates.itemList?.reduce((total, item) => total + (item.quantity ?? 0) * (item.price ?? 0), 0) || existingInvoice.dueAmount,
    };

    invoices[index] = updatedInvoice;
    localStorage.setItem(localStorageKey, JSON.stringify(invoices));
    return updatedInvoice;
  }

  //remove invoice method
  async removeInvoice(id: string): Promise<void> {
    const invoices = await this.fetchInvoices();
    const filteredInvoices = invoices.filter((invoice) => invoice.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(filteredInvoices));
  }

  //markAsPaid status method
  async markAsPaid(id: string): Promise<void> {
    const invoices = await this.fetchInvoices();
    const invoice = invoices.find((invoice) => invoice.id === id);
    if (!invoice) throw new Error("Invoice not found.");
    invoice.status = invoice.status === "pending" ? "paid" : "pending";
    localStorage.setItem(localStorageKey, JSON.stringify(invoices));
  }
}
