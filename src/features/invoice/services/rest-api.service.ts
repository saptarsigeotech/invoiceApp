// src/common/services/storage/ApiService.ts
import { StorageService } from "../interface/storage.service";
import { InvoiceType } from "@/types/types";

const API_URL = null //need to provide API url here

export class RestApiService implements StorageService {
  async fetchInvoices() {
    const response = await fetch(`${API_URL}/invoices`);
    if (!response.ok) throw new Error("Failed to fetch invoices.");
    return response.json();
  }

  async addInvoice(invoice: Omit<InvoiceType, "id" | "dueData" | "dueAmount">): Promise<InvoiceType> {
    const response = await fetch(`${API_URL}/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice),
    });
    if (!response.ok) throw new Error("Failed to add invoice.");
    return response.json();
  }

  async updateInvoice(id: string, updates: Omit<InvoiceType, 'id' | 'dueData' | 'dueAmount'>): Promise<InvoiceType> {
    const response = await fetch(`${API_URL}/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update invoice.");
    return response.json();
  }

  async removeInvoice(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/invoices/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete invoice.");
  }

  async markAsPaid(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/invoices/${id}/status`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to update invoice status.");
  }
}
