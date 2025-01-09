import { RootState } from "@/store/store";
import { InvoiceType } from "@/types/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const useInvoiceInfo = () => {

  const invoiceId = useParams().id; //extracting the id of the invoice from the URL
  
  const allInvoices = useSelector((state : RootState) => state.invoices.invoices) // getting all invoices from redux store with useSelector hook

  const currentInvoice = allInvoices?.filter((invoice) => invoice.id === invoiceId)[0]; //extracting the invoice from the by filtering the id

  const [invoicesData, setInvoicesData] = useState<InvoiceType[] | []>(allInvoices) //useState for displaying invoices list

  if(invoiceId){
    return {invoiceId, currentInvoice}
  }
  else{
    return { invoicesData, setInvoicesData, allInvoices}
  }

}

export default useInvoiceInfo;