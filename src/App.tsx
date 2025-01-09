import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchInvoicesThunk } from "./features/invoice/services/invoice.service"
import { AppDispatch } from "./store/store"
import Router from "./router"



const App = () => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchInvoicesThunk()); // Fetch invoices on app load
  }, [dispatch]);

  return (
    <Router/>
  )
}

export default App

