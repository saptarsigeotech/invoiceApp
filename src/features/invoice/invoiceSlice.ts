// import { InvoiceType } from '@/types/types';
// import { createSlice} from '@reduxjs/toolkit';
// import { generateRandomId } from '../../common/utils/utils';
// import { calculateDueDate } from '../../common/utils/utils';
// import { toast } from 'react-toastify';



// const initialState: {invoices : InvoiceType[]} = {
//     invoices: localStorage.getItem("allInvoices") ? JSON.parse(localStorage.getItem("allInvoices") || '[]') : null
// }

// export const invoiceSlice = createSlice({
//     name: 'invoice',
//     initialState,
//     reducers: {
//         addInvoice: (state, action) => {
//             const newInvoice: InvoiceType = {
//                 id: generateRandomId(),
//                 city: action.payload.city,
//                 clientCity: action.payload.clientCity,
//                 clientCountry: action.payload.clientCountry,
//                 clientEmail: action.payload.clientEmail,
//                 clientName: action.payload.clientName,
//                 clientPostCode: action.payload.clientPostCode,
//                 clientStreetAddress: action.payload.clientStreetAddress,
//                 country: action.payload.clientCountry,
//                 invoiceDate: action.payload.invoiceDate,
//                 paymentTerms: action.payload.paymentTerms,
//                 dueDate: calculateDueDate(action.payload.invoiceDate, action.payload.paymentTerms),
//                 postCode: action.payload.postCode,
//                 projectDescription: action.payload.projectDescription,
//                 streetAddress: action.payload.streetAddress,
//                 itemList: action.payload.itemList,
//                 dueAmount: action.payload.itemList?.length> 0 && action.payload.itemList?.map((item: {quantity: number , price: number}) => item.quantity * item.price).reduce((total: number, currVal: number) => total + currVal),
//                 status: "pending",
//             }
//             state.invoices.push(newInvoice);
//             localStorage.setItem("allInvoices", JSON.stringify(state.invoices));
//         },
//         removeInvoice: (state, action) => {
//             const isConfirmed = window.confirm("Are you sure you want to delete this invoice?");
//             if (isConfirmed) {
//               alert(`Invoice id ${action.payload} deleted`);
//               state.invoices = state.invoices?.filter((invoice) => invoice.id !== action.payload);
//               localStorage.setItem("allInvoices", JSON.stringify(state.invoices));
//             } else {
//               alert(`Invoice id ${action.payload} is not deleted`);
//             }
//         },

//         updateInvoice: (state, action) => {
//             const { id, updatedInvoice } = action.payload;
            
//             //index of the invoice to update
//             const index = state.invoices?.findIndex((invoice) => invoice.id === id);
//             if (index !== -1) {
//                 // Update the invoice at the found index with the new values
//                 state.invoices[index] = {
//                     ...state.invoices[index],
//                     ...updatedInvoice,   
//                     dueAmount: updatedInvoice.itemList?.length > 0 && updatedInvoice.itemList?.map((item: {quantity: number, price: number}) => item.quantity * item.price).reduce((total: number, currVal: number) => total + currVal),
//                     dueDate: calculateDueDate(updatedInvoice.invoiceDate, updatedInvoice.paymentTerms), // Recalculate due date
//                 };
//             }
//             localStorage.setItem("allInvoices", JSON.stringify(state.invoices));
//         },

//         markAsPaid: (state, action) => {
//                 const currentInvoice = state.invoices?.find((invoice) => invoice.id === action.payload);
//                 if(currentInvoice) {
//                     switch(currentInvoice.status) {
//                         case "pending":
//                             currentInvoice.status = "paid";
//                             toast("Invoice status mark as paid");
//                           break;
//                         case "paid":
//                             currentInvoice.status = "pending";
//                             toast("Invoice status mark as pending");
//                           break;
//                       }
//                 }
//                 localStorage.setItem("allInvoices", JSON.stringify(state.invoices)); 
//         }
//     }
// })

// export const { addInvoice , removeInvoice, markAsPaid, updateInvoice } = invoiceSlice.actions;

// export default invoiceSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInvoices, addInvoice, updateInvoice, removeInvoice, markAsPaid } from "@/common/services/invoiceService";
import { InvoiceType } from "@/types/types";
// import { initialInvoices } from "@/data/initialInvoices.data";
import { toast } from 'react-toastify';

export const fetchInvoicesThunk = createAsyncThunk("invoices/fetch", async () => {
  // return await fetchInvoices();
  const invoices = await fetchInvoices();
  console.log("Fetched Invoices in Thunk:", invoices); // Debug Log
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

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [] as InvoiceType[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoicesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoicesThunk.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.loading = false;
      })
      .addCase(fetchInvoicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch invoices.";
      })
      .addCase(addInvoiceThunk.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })
      .addCase(updateInvoiceThunk.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(removeInvoiceThunk.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
      })
      .addCase(markAsPaidThunk.fulfilled, (state, action) => {
        const invoice = state.invoices.find((invoice) => invoice.id === action.payload);
        if (invoice) {
          invoice.status = invoice.status === "pending" ? "paid" : "pending";
          toast(`Invoice status mark as ${invoice.status}`);
        }
      });
  },
});

export default invoiceSlice.reducer;