import { Routes, Route } from "react-router-dom"
import Navbar from "./common/components/Navbar"
import HomePage from "./features/Pages/HomePage/HomePage"
import ViewInvoice from "./features/Pages/ViewInvoicePage/ViewInvoice"
import NotFoundPage from "./common/components/errorBoundary/NotFoundPage"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchInvoicesThunk } from "./common/services/invoiceService"
import { AppDispatch } from "./store/store"


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
     <Route path="invoiceApp" element={<HomePage/>}/>
      <Route path="invoiceApp/viewInvoice/:id" element={<ViewInvoice/>}/>
      <Route path="*" element={<NotFoundPage/>} /> {/* Catch-all route */}
     </Routes>    
    </main>
    </div>
  )
}

export default App
