import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import InvoiceList from "../components/InvoiceList";
import { FaFileInvoice } from "react-icons/fa6";
import Button from "@/common/components/button/Button";
import { FaCirclePlus } from "react-icons/fa6";
import InvoiceFilter from "../components/InvoiceFilter";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useOutletContext } from "react-router-dom";
import useInvoiceInfo from "../hooks/useInvoiceInfo";

const HomePage = () => {

  const { invoicesData, setInvoicesData, allInvoices}= useInvoiceInfo();

  const [showFilterList, setShowFilterList] = useState<boolean>(false); //for displaying filter list (drop down, filter by status list)
  const filterRef = useRef<HTMLDivElement | null>(null);

  const [filteredInvoicesData, setFilteredInvoicesData] = useState(invoicesData); //filtered data for invoice filter list

  useClickAway(filterRef, () => {
    setShowFilterList(false);
  });

  const { handleOpen } = useOutletContext<{handleOpen: () => void }>(); //getting handleOpen from Layout

  useEffect(() => {
    if (allInvoices) {
      setInvoicesData(allInvoices);
    }
  }, [allInvoices, setInvoicesData]);

  useEffect(() => {
    // Only update filtered data if invoicesData is available
    if (invoicesData && invoicesData.length > 0) {
      setFilteredInvoicesData(invoicesData);
    }
  }, [invoicesData]);

    //function for closing the filter list
    const handleCloseFilter = () => {
        setShowFilterList((prevState: boolean)=> !prevState)
      }
   
    //on clicking drop down buttons function
    const handleStatusClick = (filterName: "pending" | "paid" | "all") => {
        if(invoicesData) {
          setFilteredInvoicesData(filterName === "all" ? invoicesData : invoicesData.filter((invoice) => invoice.status === filterName));
          setShowFilterList(false);
        }
      };
  


  return (
    <div className={`mt-6 md:pt-6 md:px-16 md:flex md:flex-col md:items-stretch md:mx-auto lg:m-10 xl:w-[1100px] xl:mx-auto`}>
      <div className="text-slate-100 flex items-start justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">Invoices</h3>
          <p className="flex items-center justify-between gap-1 text-slate-500"><span className="hidden md:block">There are </span>{filteredInvoicesData?.length} <span className="hidden md:block">total </span>invoices</p>
        </div>
        <div className="flex gap-3 md:gap-6 items-center">
          
          {/* Drop-down buttons */}
          <div className="flex items-center gap-3 md:gap-5" onClick={handleCloseFilter}>       
              <div className="flex items-center justify-between gap-1 md:font-bold relative">Filter <span className="hidden md:block">by status</span> 

              {/* All filter button */}
              {showFilterList && <InvoiceFilter filterRef={filterRef} handleStatusClick={handleStatusClick}/>}

              </div>
              {showFilterList ? <FaChevronUp className="text-indigo-500/100"/> : <FaChevronDown className="text-indigo-500/100"/>}
          </div>         

          {/* Button for creating a new Invoice */}
          <Button variant="newInvoiceBtn" onClick={handleOpen}>
            <FaCirclePlus className="text-4xl md:text-5xl ml-1 md:ml-0"/>
            <p className="font-bold">New</p>
            <p className=" hidden md:block font-bold">Invoice</p>
          </Button>
        </div>
      </div>
      <div className="pb-20">
        {filteredInvoicesData && filteredInvoicesData?.length > 0 ? <InvoiceList invoicesData={filteredInvoicesData}/> : <p className="text-center font-bold w-full text-indigo-500/100 mt-10 flex justify-center items-center gap-3"><FaFileInvoice />No invoice to show</p>}
      </div>
    </div>
  );
};

export default HomePage;

