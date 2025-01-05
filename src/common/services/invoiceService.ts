// import { InvoiceType } from "@/types/types";
// import { initialInvoices } from "@/data/initialInvoices.data";
// import axios from "axios";

// const useLocalStorage = !process.env.REACT_APP_API_URL; // Determines backend or localStorage
// const BASE_URL = process.env.REACT_APP_API_URL || ""; // Backend API base URL or empty for localStorage

// const LOCAL_STORAGE_KEY = "allInvoices";

// // Helper to load data from localStorage or initialize
// const loadFromLocalStorage = (): InvoiceType[] => {
//   const storedInvoices = localStorage.getItem(LOCAL_STORAGE_KEY);
//   return storedInvoices ? JSON.parse(storedInvoices) : initialInvoices;
// };

// // Helper to save data to localStorage
// const saveToLocalStorage = (invoices: InvoiceType[]): void => {
//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invoices));
// };

// // **Service Methods**

// export const getInvoices = async (): Promise<InvoiceType[]> => {
//   if (useLocalStorage) {
//     return loadFromLocalStorage(); // Fetch from localStorage
//   } else {
//     const response = await axios.get(`${BASE_URL}/invoices`);
//     return response.data; // Fetch from backend
//   }
// };

// export const addInvoice = async (newInvoice: InvoiceType): Promise<void> => {
//   if (useLocalStorage) {
//     const invoices = loadFromLocalStorage();
//     invoices.push(newInvoice);
//     saveToLocalStorage(invoices); // Save to localStorage
//   } else {
//     await axios.post(`${BASE_URL}/invoices`, newInvoice); // Save to backend
//   }
// };

// export const updateInvoice = async (id: string, updatedInvoice: Partial<InvoiceType>): Promise<void> => {
//   if (useLocalStorage) {
//     const invoices = loadFromLocalStorage();
//     const index = invoices.findIndex((invoice) => invoice.id === id);
//     if (index !== -1) {
//       invoices[index] = { ...invoices[index], ...updatedInvoice };
//       saveToLocalStorage(invoices); // Save to localStorage
//     }
//   } else {
//     await axios.put(`${BASE_URL}/invoices/${id}`, updatedInvoice); // Update in backend
//   }
// };

// export const deleteInvoice = async (id: string): Promise<void> => {
//   if (useLocalStorage) {
//     const invoices = loadFromLocalStorage();
//     const filteredInvoices = invoices.filter((invoice) => invoice.id !== id);
//     saveToLocalStorage(filteredInvoices); // Save to localStorage
//   } else {
//     await axios.delete(`${BASE_URL}/invoices/${id}`); // Delete from backend
//   }
// };

// export const markAsPaid = async (id: string): Promise<void> => {
//   if (useLocalStorage) {
//     const invoices = loadFromLocalStorage();
//     const index = invoices.findIndex((invoice) => invoice.id === id);
//     if (index !== -1) {
//       invoices[index].status = invoices[index].status === "pending" ? "paid" : "pending";
//       saveToLocalStorage(invoices); // Save to localStorage
//     }
//   } else {
//     await axios.patch(`${BASE_URL}/invoices/${id}/mark-as-paid`); // Mark as paid in backend
//   }
// };


import { InvoiceType } from '@/types/types';
import { generateRandomId, calculateDueDate } from '@/common/utils/utils';
import { initialInvoices } from '@/data/initialInvoices.data';

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
  const newInvoice:  InvoiceType = {
    ...invoice,
    id: generateRandomId(),
    dueDate: calculateDueDate(invoice.invoiceDate ?? "", invoice.paymentTerms ?? 0),
    dueAmount: invoice.itemList?.reduce((total, item) => total + (item.quantity?? 0) * (item.price ?? 0), 0) || 0,
    status: "pending",
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