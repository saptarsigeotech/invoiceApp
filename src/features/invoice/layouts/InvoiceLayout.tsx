import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import InvoiceForm from "@/common/components/InvoiceForm";


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
   <Outlet context={{ showModal, handleOpen, handleClose }}/> 
   <InvoiceForm key={location.pathname} handleModalClose={handleClose} showModal={showModal} handleClose={handleClose} handleOpen={handleOpen}/>
   </>
  );
};

export default Layout;
