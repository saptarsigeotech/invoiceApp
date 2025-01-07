import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import InvoiceList from "../components/InvoiceList";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Modal from "@/common/components/Modal";
import { InvoiceType } from "@/types/types";
import { FaFileInvoice } from "react-icons/fa6";
import InvoiceForm from "@/common/components/InvoiceForm";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/common/components/Button/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { useClickAway } from "react-use";
import DropDown from "../components/DropDown";



const HomePage = () => {

  const [showModal, setShowModal] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("showModalAddInvoice") || "false")
  );
  
  useEffect(() => {
    sessionStorage.setItem("showModalAddInvoice", JSON.stringify(showModal));
  }, [showModal]);

  const [showFilterList, setShowFilterList] = useState<boolean>(false); //for displaying filter list (drop down, filter by status list)
  const filterRef = useRef<HTMLDivElement | null>(null);

  const currentInvoicesData  = useSelector((state: RootState) => state.invoices.invoices) //getting all invoices from store

  const [invoicesData, setInvoicesData] = useState<InvoiceType[] | []>(currentInvoicesData) //useState for displaying invoices list

  const [filteredInvoicesData, setFilteredInvoicesData] = useState(invoicesData); //filtered data for dropdown list

  //used for closing filter after clicking anywhere of the componenet
  useClickAway(filterRef, () => {
    setShowFilterList(false);
  });
    
  useEffect(()=>{
    setInvoicesData(currentInvoicesData)
    setFilteredInvoicesData(invoicesData)
  },[currentInvoicesData, invoicesData])

    const location = useLocation(); 
    const navigate = useNavigate(); //hook for navigating to diferrent paths/ routes

  // Sync modal state with URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modalState = params.get("modal");
    if (modalState === "true") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [location]);

  //on clicking "edit" button modal of the edit page will be opened
  const handleAdd = () => {
    setShowModal(true)
    navigate(`?modal=true`, { replace: true }); // Update URL with modal=true
  }


    // function for closing modal 
    const handleClose = () => { 
      setShowModal((prevState: boolean)=> !prevState)
      navigate("?modal=false", { replace: true });
    }

    //function for closing the filter list
    const handleCloseFilter = () => {
      setShowFilterList((prevState: boolean)=> !prevState)
    }


    //on clicking drop down buttons function
    const handleStatusClick = (filterName: "pending" | "paid" | "all") => {
      setFilteredInvoicesData(filterName === "all" ? invoicesData : invoicesData.filter((invoice) => invoice.status === filterName));
      setShowFilterList(false);
    };

  return (
    <div className={`mt-6 md:pt-6 md:px-16 md:flex md:flex-col md:items-stretch md:mx-auto lg:m-10 xl:w-[1100px] xl:mx-auto ${showModal ? "bg-opacity-10 overflow-y-auto" : "bg-opacity-100"}`}>
      <div className="text-slate-100 flex items-start justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">Invoices</h3>
          <p className="flex items-center justify-between gap-1 text-slate-500"><span className="hidden md:block">There are </span>{filteredInvoicesData?.length} <span className="hidden md:block">total </span>invoices</p>
        </div>
        <div className="flex gap-3 md:gap-6 items-center">
          {/* Drop-down buttons */}
          <button className="flex items-center gap-3 md:gap-5" onClick={handleCloseFilter}>       
              <div className="flex items-center justify-between gap-1 md:font-bold relative">Filter <span className="hidden md:block">by status</span> 

              {/* All filter button */}
              {showFilterList && <DropDown filterRef={filterRef} handleStatusClick={handleStatusClick}/>}

              </div>
              {showFilterList ? <FaChevronUp className="text-indigo-500/100"/> : <FaChevronDown className="text-indigo-500/100"/>}
          </button>         

          

          {/* Button for creating a new Invoice */}
          <Button variant="newInvoiceBtn" onClick={handleAdd}>
            <FaCirclePlus className="text-4xl md:text-5xl ml-1 md:ml-0"/>
            <p className="font-bold">New</p>
            <p className=" hidden md:block font-bold">Invoice</p>
          </Button>
        </div>
      </div>
      <div className="pb-20">
        {filteredInvoicesData?.length > 0 ? <InvoiceList invoicesData={filteredInvoicesData}/> : <p className="text-center font-bold w-full text-indigo-500/100 mt-10 flex justify-center items-center gap-3"><FaFileInvoice />No invoice to show</p>}
      </div>
      <div>
        {showModal && <Modal showModal={showModal} handleClose={handleClose}>
          <InvoiceForm handleModalClose={handleClose}/>
        </Modal>}
      </div>
    </div>
  );
};

export default HomePage;
