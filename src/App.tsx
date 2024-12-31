import { Routes, Route } from "react-router-dom"
import Navbar from "./common/components/Navbar"
import HomePage from "./features/HomePage/HomePage"
import ViewInvoice from "./features/ViewInvoicePage/ViewInvoice"

const App = () => {

  return (
    <div className="font-poppins bg-slate-900 lg:flex h-full">
    <header className="">
      <Navbar/>
    </header>
    <main className="bg-slate-900 pt-6 px-5 md:px-0 h-full min-h-screen md:w-screen relative overflow-hidden">
     <Routes>
     <Route path="/" element={<HomePage/>}/>
      <Route path="/viewInvoice/:id" element={<ViewInvoice/>}/>
     </Routes>
    </main>
    </div>
  )
}

export default App
