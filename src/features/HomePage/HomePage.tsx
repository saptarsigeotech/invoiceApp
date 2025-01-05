import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import InvoiceList from "./InvoiceList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Modal from "@/common/components/Modal";
import { InvoiceType } from "@/types/types";
import { FaFileInvoice } from "react-icons/fa6";
import { MdOutlineDensitySmall } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { GiSandsOfTime } from "react-icons/gi";
import InvoiceForm from "@/common/components/InvoiceForm";
import { useLocation, useNavigate } from "react-router-dom";


const HomePage = () => {

  const [showModal, setShowModal] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("showModalAddInvoice") || "false")
  );
  
  useEffect(() => {
    sessionStorage.setItem("showModalAddInvoice", JSON.stringify(showModal));
  }, [showModal]);

  const [showFilterList, setShowFilterList] = useState<boolean>(false); //for displaying filter list (drop down, filter by status list)

  const currentInvoicesData  = useSelector((state: RootState) => state.invoices.invoices) //getting all invoices from store
  console.log("Invoices in Component:", currentInvoicesData)

  const [invoicesData, setInvoicesData] = useState<InvoiceType[] | []>(currentInvoicesData) //useState for displaying invoices list

  const [filteredInvoicesData, setFilteredInvoicesData] = useState(invoicesData); //filtered data for dropdown list
    
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
    const handleStatusClick = (filterName: string) => {
      switch (filterName) {
        case "pending":
          setFilteredInvoicesData(invoicesData.filter((invoice) => invoice.status === "pending"));
          break;
        case "paid":
          setFilteredInvoicesData(invoicesData.filter((invoice) => invoice.status === "paid"));
          break;
        case "draft":
          setFilteredInvoicesData(invoicesData.filter((invoice) => invoice.status === "draft"));
          break;
        case "all":
          setFilteredInvoicesData(invoicesData); // Reset to full data when "all" is clicked
          break;
        default:
          setFilteredInvoicesData(invoicesData); // Reset to full data when nothing is clicked
          setShowFilterList(false)
          break;
        
      }

    }

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
              <p className="flex items-center justify-between gap-1 md:font-bold relative">Filter <span className="hidden md:block">by status</span> 

              {/* All filter button */}
              {showFilterList && <div className="absolute top-12 w-44 bg-slate-900 shadow-black shadow-md rounded-lg border-slate-700 border-t-2">
                <ul className="w-full p-4 flex flex-col justify-center items-start gap-3 font-bold">
                    <button onClick={() => handleStatusClick("pending")} className="w-full">
                      <li className="bg-yellow-500 text-orange-500 w-full p-3 rounded-md bg-opacity-10 text-center hover:bg-slate-100 transition-all flex items-center">
                      <GiSandsOfTime />
                      <div className="ml-auto mr-auto">Pending</div>
                      </li>
                    </button>
                    <button onClick={() => handleStatusClick("paid")} className="w-full">
                      <li className="bg-green-700 text-green-500 w-full p-3 rounded-md bg-opacity-10 text-center hover:bg-slate-100 transition-all flex items-center">
                      <AiOutlineFileDone />
                      <div className="ml-auto mr-auto">Paid</div>
                      </li>
                    </button>

                    <button onClick={() => handleStatusClick("all")} className="w-full">
                      <li className="bg-indigo-500 text-indigo-500/100 w-full p-3 rounded-md bg-opacity-10 text-center hover:bg-indigo-400 transition-all hover:text-slate-800 flex items-center">
                      <MdOutlineDensitySmall/>
                        <div className="ml-auto mr-auto">All</div>
                      </li>
                    </button>
                  </ul>
              </div>}

              </p>
              {showFilterList ? <FaChevronUp className="text-indigo-500/100"/> : <FaChevronDown className="text-indigo-500/100"/>}
          </button>         

          

          {/* Button for creating a new Invoice */}
          <button className="bg-indigo-500/100 h-12 w-28 md:h-[60px] md:w-48 rounded-full flex items-center gap-2 p-1 md:p-2 hover:bg-indigo-600 transition-all" onClick={handleAdd}>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-slate-100 text-indigo-500/100 text-2xl font-bold flex justify-center items-center gap-3">+</div>
            <p className="font-bold">New</p>
            <p className=" hidden md:block font-bold">Invoice</p>
          </button>
        </div>
      </div>
      <div className="pb-20">
        {filteredInvoicesData?.length > 0 ? <InvoiceList invoicesData={filteredInvoicesData}/> : <p className="text-center font-bold w-full text-indigo-500/100 mt-10 flex justify-center items-center gap-3"><FaFileInvoice />No invoice to show</p>}
      </div>
      <div>
        {showModal && <Modal showModal={showModal}>
          <InvoiceForm handleModalClose={handleClose}/>
        </Modal>}
      </div>
    </div>
  );
};

export default HomePage;
