import { InvoiceType } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorageService } from "./storage/LocalStorageService";
import { ApiService } from "./storage/ApiService";
import { StorageService } from "./storage/StorageService";


export function createStorageService(): StorageService {
  const storageType = "localStorage"; //define the storage option

  switch (storageType) {
    //define a case here to use the service
    case "localStorage":
      return new LocalStorageService();
    case "api": 
      return new ApiService();
    default:
      throw new Error("Invalid storage type.");
  }
}

const storageService = createStorageService();

//handelling async operations
export const fetchInvoicesThunk = createAsyncThunk("invoices/fetch", async () => {
  return await storageService.fetchInvoices();
});

export const addInvoiceThunk = createAsyncThunk("invoices/add", async (invoice: Partial<InvoiceType>) => {
  return await storageService.addInvoice(invoice);
});

export const updateInvoiceThunk = createAsyncThunk("invoices/update", async ({ id, updates }: { id: string; updates: Partial<InvoiceType> }) => {
  return await storageService.updateInvoice(id, updates);
});

export const removeInvoiceThunk = createAsyncThunk("invoices/remove", async (id: string) => {
  await storageService.removeInvoice(id);
  return id;
});

export const markAsPaidThunk = createAsyncThunk("invoices/markAsPaid", async (id: string) => {
  await storageService.markAsPaid(id);
  return id;
});