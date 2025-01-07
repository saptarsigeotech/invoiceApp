
import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoicesThunk, addInvoiceThunk, updateInvoiceThunk, removeInvoiceThunk, markAsPaidThunk} from "@/common/services/invoiceService";
import { InvoiceType } from "@/types/types";
import { toast } from 'react-toastify';


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
        toast("Invoice created successfully!")
      })
      .addCase(updateInvoiceThunk.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
          toast(`Invoice ${action.payload.id} updated successfully!`)
        }
      })
      .addCase(removeInvoiceThunk.fulfilled, (state, action) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this invoice?");
            if (isConfirmed) {
              toast(`Invoice id ${action.payload} deleted`);
              state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
            } else {
              toast(`Invoice id ${action.payload} is not deleted`);
            }
        
      })
      .addCase(markAsPaidThunk.fulfilled, (state, action) => {
        const invoice = state.invoices.find((invoice) => invoice.id === action.payload);
        if (invoice) {
          invoice.status = invoice.status === "pending" ? "paid" : "pending";
          toast(`Invoice status marked as ${invoice.status}`);
        }
      });
  },
});

export default invoiceSlice.reducer;