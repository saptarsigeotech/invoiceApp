import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { markAsPaidThunk, removeInvoiceThunk } from "../services/invoice.service";

const useEdit = () => {

  const invoiceId = useParams().id; //extracting the id of the invoice from the URL
  const storeInvoiceData = useSelector((state : RootState) => state.invoices.invoices) // getting all invoices from redux store with useSelector hook
  const currentInvoice = storeInvoiceData?.filter((invoice) => invoice.id === invoiceId)[0]; //extracting the invoice from the by filtering the id

  //destructuring invoice information from the current invoice
  const calculateDueAmount = (arr: { price: number | null, quantity: number | null }[]) : number => arr?.map(item => (item.price?? 0) * (item.quantity ?? 0)).reduce((total: number, currVal: number) => total + currVal); //calulating the amount due for particular invoice
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1); //function for capitalizing a string

 //on clicking "edit" button modal of the edit page will be opened
  const handleEdit = () => {
    // setShowModal(true)
    navigate(`?modal=true`, { replace: true }); // Update URL with modal=true
  }

  const dispatch = useDispatch< AppDispatch >(); //hook for using reducer functions 
  const navigate = useNavigate(); //hook for navigating to diferrent paths/ routes

  //function for deleting the invoice
  const handleDelete = (id: string | undefined) => {
      if(id){
      dispatch(removeInvoiceThunk(id));
      navigate("/");
      } 
  }

  //function to make the status of invoice as paid
  const handleMarkAsPaid = (id: string | undefined) => {
    if(id) return dispatch(markAsPaidThunk(id));
  }

const showModal=true;

return {invoiceId, currentInvoice, calculateDueAmount, capitalize, handleEdit, handleDelete, handleMarkAsPaid, showModal}
}

export default useEdit;