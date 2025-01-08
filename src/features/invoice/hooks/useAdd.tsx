import { RootState } from '@/store/store';
import { InvoiceType } from '@/types/types';
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useClickAway } from 'react-use';

const useAdd = () => {

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

    // const location = useLocation(); 
    const navigate = useNavigate(); //hook for navigating to diferrent paths/ routes

    const handleAdd = () => {
    // setShowModal(true)
    navigate(`?modal=true`, { replace: true });
 // Update URL with modal=true
  } 
  const showModal=true;


    // function for closing modal 
    const handleClose = () => { 
    //   setShowModal((prevState: boolean)=> !prevState)
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

  return {handleCloseFilter,showFilterList,filterRef,filteredInvoicesData,handleStatusClick,handleClose,handleAdd, showModal}
}

export default useAdd;
