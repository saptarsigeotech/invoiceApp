import { RootState } from "@/store/store";
import { InvoiceType } from "@/types/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const useInvoiceInfo = () => {

  const invoiceId = useParams().id; //extracting the id of the invoice from the URL
  
  const storeInvoicesData = useSelector((state : RootState) => state.invoices.invoices) // getting all invoices from redux store with useSelector hook

  const currentInvoice = storeInvoicesData?.filter((invoice) => invoice.id === invoiceId)[0]; //extracting the invoice from the by filtering the id

  const [invoicesData, setInvoicesData] = useState<InvoiceType[] | []>(storeInvoicesData) //useState for displaying invoices list

  if(invoiceId){
    return {invoiceId, currentInvoice}
  }
  else{
    return { invoicesData, setInvoicesData, storeInvoicesData}
  }

}

export default useInvoiceInfo;