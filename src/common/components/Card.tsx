import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { formatToPound, dateFormat } from "../../features/invoice/utils/invoice.utils";
import { InvoiceForCard } from "@/types/types";
import InvoiceStatus from "./InvoiceStatus";

const Card = (props: InvoiceForCard ) => { //this component is a blueprint for every invoice that is displayed on the homepage

  const {id, clientName, dueDate, dueAmount, status} = props; //destructuring from props

  return (
    <Link to={`viewInvoice/${id}`}>
    <div className="p-8 bg-slate-800 rounded-lg text-md flex flex-col md:flex-row md:justify-between gap-4 md:text-lg shadow-md shadow-slate-950">
      <div className="flex items-center justify-between w-full md:w-1/3">
        <p className="font-bold"><span className="text-slate-600 font-normal">#</span>{id}</p>
        <p className="text-md md:text-md text-right lg:text-left text-wrap w-1/2 truncate">{clientName}</p>
      </div>
      <div className="flex items-center justify-between md:w-2/3 lg:gap-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:gap-16 items-start gap-3 w-1/2 md:w-2/3 md:ml-3 lg:ml-6">
          <p className="lg:text-left md:w-2/3 ">Due {dateFormat(dueDate)}</p>
          <p className="text-2xl font-bold w-full md:w-1/3 md:text-right truncate overflow-hidden">{formatToPound(dueAmount)}</p>
        </div>
        <InvoiceStatus status={status}/>
        <FaChevronRight className="hidden md:block text-indigo-500/100 hover:text-indigo-300"/>
      </div>
    </div>
    </Link>
  )
}

export default Card
