import { Routes, Route } from "react-router-dom"
import Navbar from "./common/components/Navbar"
import HomePage from "./features/invoice/pages/HomePage"
import ViewInvoice from "./features/invoice/pages/ViewInvoice"
import NotFoundPage from "./router/errorBoundary/NotFoundPage"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchInvoicesThunk } from "./features/invoice/services/invoice.service"
import { AppDispatch } from "./store/store"
import Layout from "./features/invoice/layouts/InvoiceLayout"


const App = () => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchInvoicesThunk()); // Fetch invoices on app load
  }, [dispatch]);

  return (
    <div className="font-poppins bg-slate-900 lg:flex h-full">
    <header >
      <Navbar/>
    </header>
    <main className="bg-slate-900 pt-6 lg:pt-0 px-5 md:px-0 h-full min-h-screen md:w-screen relative overflow-hidden">
    <Routes>
      <Route path="/" element={<Layout/> }>
            <Route path="/" element={<HomePage/>}/>
            <Route path="viewInvoice/:id" element={<ViewInvoice/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>} /> {/* Catch-all route */}
    </Routes>  
    </main>
    </div>
  )
}

export default App
