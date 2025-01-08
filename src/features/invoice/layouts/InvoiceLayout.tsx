import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import InvoiceForm from "@/common/components/InvoiceForm";


const Layout: React.FC= () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("showModalInvoice") || "false")
  );
  
  const { id: invoiceId } = useParams();

  useEffect(() => {
    sessionStorage.setItem("showModalInvoice", JSON.stringify(showModal));
  }, [showModal]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modalState = params.get("modal");
    return modalState === "true" ? setShowModal(true) : setShowModal(false)
  }, [location, invoiceId]);

  const handleClose = () => { 
    setShowModal(false)
    navigate("?modal=false", { replace: true });
  }

  return (
   <>
   <Outlet /> 
   <InvoiceForm key={location.pathname} handleModalClose={handleClose} showModal={showModal} handleClose={handleClose}/>
   </>
  );
};

export default Layout;
