import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import InvoiceForm from "@/common/components/InvoiceForm";
import Navbar from "@/common/components/Navbar";
import { ToastContainer } from "react-toastify";


const Layout: React.FC= () => {

  const [showModal, setShowModal] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams(); 

  //setting as ?modal=true
  const handleOpen = () => {
    searchParams.set("modal", "true");
    setSearchParams(searchParams); 
  };

  const handleClose = () => {
    searchParams.delete("modal");
    setSearchParams(searchParams); 
  };

  useEffect(() => {
    const isModalOpen = searchParams.get("modal") === "true";
    setShowModal(isModalOpen);
  }, [searchParams]); 


  return (
   <>
   <div className="font-poppins bg-slate-900 lg:flex h-full">
    <header >
      <Navbar/>
    </header>
    <main className="bg-slate-900 pt-6 lg:pt-0 px-5 md:px-0 h-full min-h-screen md:w-screen relative overflow-hidden">
    <Outlet context={{ showModal, handleOpen, handleClose }}/> 
    <InvoiceForm key={location.pathname} handleModalClose={handleClose} showModal={showModal} handleClose={handleClose} handleOpen={handleOpen}/>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="color"
        className={"text-xl font-bold font-poppins text-indigo-400/100 bg-slate-800 rounded-lg shadow-lg shadow-black top-6 m-2"}/>
    </main>
    </div>
   </>
  );
};

export default Layout;
