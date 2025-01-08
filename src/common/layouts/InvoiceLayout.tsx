import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  modalChild: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, modalChild }) => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("showModalInvoice") || "false")
  );
  
  useEffect(() => {
    sessionStorage.setItem("showModalInvoice", JSON.stringify(showModal));
  }, [showModal]);

  const handleClose = () => { 
    setShowModal((prevState: boolean)=> !prevState)
    navigate("?modal=false", { replace: true });
  }

  return (
   <>
   {children}
   <div>
        {showModal && <Modal showModal={showModal} handleClose={handleClose}>
          {modalChild}
        </Modal>}
    </div>
   </>
  );
};

export default Layout;
