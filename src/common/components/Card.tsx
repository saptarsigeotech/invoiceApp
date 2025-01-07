import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { formatToPound, dateFormat } from "../utils/invoice.utils";
import { InvoiceForCard } from "@/types/types";

const Card = (props: InvoiceForCard ) => { //this component is a blueprint for every invoice that is displayed on the homepage

  const {id, clientName, dueDate, dueAmount, status} = props; //destructuring from props

  const capitalize = (str: string | undefined) => typeof str === "string" && str.charAt(0).toUpperCase() + str.slice(1); //function for capitalizing a string

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
        <div className={`lg:w-36 ${status === "pending" ? "bg-yellow-500 text-orange-500": status === "paid" ? "bg-green-700 text-green-500" : status === "draft" ? "bg-slate-100" : ""} h-12 w-28 rounded-md bg-opacity-10 inset-0 flex justify-center items-center gap-2 font-bold`}>
          <div className={`w-2 h-2 rounded-full  ${status === "pending" ? "bg-orange-500": status === "paid" ? "bg-green-500" : status === "draft" ? "bg-slate-100" : ""}`}></div>
          <p className="bg-opacity-100">{capitalize(status)}</p>
        </div>
        <FaChevronRight className="hidden md:block text-indigo-500/100 hover:text-indigo-300"/>
      </div>
    </div>
    </Link>
  )
}

export default Card
