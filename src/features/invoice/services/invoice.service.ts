import { InvoiceType } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorageService } from "./local-storage.service";
import { RestApiService } from './rest-api.service';

enum Services {
 localStorage,
 RestAPI
}

const ServiceMap: Record<Services, typeof LocalStorageService>= {
  [Services.localStorage]: LocalStorageService,
  [Services.RestAPI]: RestApiService
}

//generate storage service:
export const generateStorageService = (arg: Services) => {
  return new ServiceMap[arg];
}

const storageService = generateStorageService(Services.localStorage); //create a service class and use as a parameter

//handelling async operations
export const fetchInvoicesThunk = createAsyncThunk("invoices/fetch", async () => {
  return await storageService.fetchInvoices();
});

export const addInvoiceThunk = createAsyncThunk("invoices/add", async (invoice: Omit<InvoiceType, 'id' | 'dueData' | 'dueAmount'>) => {
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