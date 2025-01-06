import { InvoiceType } from '@/types/types';
import { generateRandomId, calculateDueDate } from '@/common/utils/utils';
import { initialInvoices } from '@/data/initialInvoices.data';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = null
// const API_URL = process.env.REACT_APP_API_URL 
const useLocalStorage = !API_URL;
console.log("Using Local Storage:", useLocalStorage);

const localStorageKey = "allInvoices";

export const fetchInvoices = async (): Promise<InvoiceType[]> => {
  if (useLocalStorage) {
    const storedInvoices = localStorage.getItem(localStorageKey);
    if (storedInvoices) {
      // Return the existing invoices in localStorage
      return JSON.parse(storedInvoices);
    } else {
      // Initialize localStorage with `initialInvoices` only once
      localStorage.setItem(localStorageKey, JSON.stringify(initialInvoices));
      return initialInvoices;
    }
  } else {
    const response = await fetch(`${API_URL}/invoices`);
    if (!response.ok) throw new Error("Failed to fetch invoices.");
    return response.json();
  }
};

export const addInvoice = async (invoice: Partial<InvoiceType>): Promise<InvoiceType> => {
  const newInvoice: InvoiceType = {
    id: generateRandomId(),
    city: invoice.city ?? "", // Provide default value for required string fields
    clientCity: invoice.clientCity ?? "",
    clientCountry: invoice.clientCountry ?? "",
    clientEmail: invoice.clientEmail ?? "",
    clientName: invoice.clientName ?? "",
    clientPostCode: invoice.clientPostCode ?? 0, // Default for number field
    clientStreetAddress: invoice.clientStreetAddress ?? "",
    country: invoice.country ?? "",
    invoiceDate: invoice.invoiceDate ?? "",
    paymentTerms: invoice.paymentTerms ?? 0,
    dueDate: calculateDueDate(invoice.invoiceDate ?? "", invoice.paymentTerms ?? 0),
    postCode: invoice.postCode ?? 0,
    projectDescription: invoice.projectDescription ?? "",
    streetAddress: invoice.streetAddress ?? "",
    itemList: invoice.itemList ?? [], // Default to empty array
    dueAmount: invoice.itemList?.reduce((total, item) => total + (item.quantity ?? 0) * (item.price ?? 0), 0) || 0,
    status: invoice.status ?? "pending", // Default status
  };

  if (useLocalStorage) {
    const invoices = await fetchInvoices();
    invoices.push(newInvoice);
    localStorage.setItem(localStorageKey, JSON.stringify(invoices));
    return newInvoice;
  } else {
    const response = await fetch(`${API_URL}/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInvoice),
    });
    if (!response.ok) throw new Error("Failed to add invoice.");
    return response.json();
  }
};

export const updateInvoice = async (id: string, updates: Partial<InvoiceType>): Promise<InvoiceType> => {
  if (useLocalStorage) {
    const invoices = await fetchInvoices();
    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) throw new Error("Invoice not found.");

    invoices[index] = {
      ...invoices[index],
      ...updates,
      dueDate: calculateDueDate(updates.invoiceDate || invoices[index].invoiceDate, updates.paymentTerms || invoices[index].paymentTerms),
      dueAmount: updates.itemList?.reduce((total, item) => total + (item.quantity?? 0) * (item.price ?? 0), 0) || invoices[index].dueAmount,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(invoices));
    return invoices[index];
  } else {
    const response = await fetch(`${API_URL}/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update invoice.");
    return response.json();
  }
};

export const removeInvoice = async (id: string): Promise<void> => {
  if (useLocalStorage) {
    const invoices = await fetchInvoices();
    const filteredInvoices = invoices.filter((invoice) => invoice.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(filteredInvoices));
  } else {
    const response = await fetch(`${API_URL}/invoices/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete invoice.");
  }
};

export const markAsPaid = async (id: string): Promise<void> => {
  if (useLocalStorage) {
    const invoices = await fetchInvoices();
    const invoice = invoices.find((invoice) => invoice.id === id);
    if (!invoice) throw new Error("Invoice not found.");
    invoice.status = invoice.status === "pending" ? "paid" : "pending";
    localStorage.setItem(localStorageKey, JSON.stringify(invoices));
  } else {
    const response = await fetch(`${API_URL}/invoices/${id}/status`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to update invoice status.");
  }
};

//handeling asyn operations
export const fetchInvoicesThunk = createAsyncThunk("invoices/fetch", async () => {
  // return await fetchInvoices();
  const invoices = await fetchInvoices();
  // console.log("Fetched Invoices in Thunk:", invoices); // Debug Log
  return invoices;
});

export const addInvoiceThunk = createAsyncThunk("invoices/add", async (invoice: Partial<InvoiceType>) => {
  return await addInvoice(invoice);
});

export const updateInvoiceThunk = createAsyncThunk("invoices/update", async ({ id, updates }: { id: string; updates: Partial<InvoiceType> }) => {
  return await updateInvoice(id, updates);
});

export const removeInvoiceThunk = createAsyncThunk("invoices/remove", async (id: string) => {
  await removeInvoice(id);
  return id;
});

export const markAsPaidThunk = createAsyncThunk("invoices/markAsPaid", async (id: string) => {
  await markAsPaid(id);
  return id;
});