
import { useNavigate } from "react-router-dom"
import { FaChevronLeft } from "react-icons/fa";
import { formatToPound } from "@/features/invoice/utils/invoice.utils";
import Button from "@/common/components/button/Button";
import useEdit from "../hooks/useEdit";

const ViewInvoice = () => {

  const navigate = useNavigate(); //hook for navigating to diferrent paths/ routes

// const showModal=true;
const tableHeadStyle: string = "text-right text-slate-500"; //style for table heads

const {invoiceId, currentInvoice, calculateDueAmount, capitalize, handleEdit, handleDelete, handleMarkAsPaid, showModal} = useEdit();

const { projectDescription, streetAddress, country, invoiceDate, dueDate, clientName, clientEmail, clientStreetAddress, clientCountry, itemList, status} = currentInvoice || {};
  return (
    <div className={`text-slate-100 flex flex-col gap-6 font-bold md:w-[70%] xl:w-[40%] mx-auto lg:mt-6 ${showModal ? "bg-opacity-10" : "bg-opacity-100"}`}>
      <div className="flex items-center justify-start gap-3 font-bold">
        <Button variant="goBackBtn" onClick={() => navigate("/")}><FaChevronLeft className="text-indigo-500/100"/>Go Back</Button>
      </div>
      
      <div className="bg-slate-800 flex flex-col md:flex-row md:item-center md:justify-between gap-4 p-4 rounded-xl md:p-8 shadow-md shadow-slate-950">
        <div className="flex justify-start items-center gap-4">
        {/* displaying the status of the invoice like homepage */}
          <p className="text-slate-500">Status</p> 
          <div className={`${status === "pending" ? "bg-yellow-500 text-orange-500": status === "paid" ? "bg-green-700 text-green-500" : status === "draft" ? "bg-slate-100" : ""} h-12 w-28 rounded-md bg-opacity-10 inset-0 flex justify-center items-center gap-2 font-bold`}>
            <div className={`w-2 h-2 rounded-full ${status === "pending" ? "bg-orange-500": status === "paid" ? "bg-green-500" : status === "draft" ? "bg-slate-100" : ""}`}></div>
            <p className="bg-opacity-100">{typeof status === "string" && capitalize(status)}</p> 
          </div>
        </div>
        <div className="flex justify-end gap-4 font-bold mt-4 md:mt-0">
          
          <Button variant="edit" onClick={handleEdit}>Edit</Button>
          <Button variant="delete" onClick={() => handleDelete(invoiceId)}>Delete</Button>
          <Button variant="markAsPaid" onClick={() => handleMarkAsPaid(invoiceId)}>{status === "paid" ? "Mark as Pending" : "Mark as Paid" }</Button>
          
          
        </div>
      </div>

      {/* lower big div showing details */}
      <div className="bg-slate-800 p-4 rounded-xl flex flex-col gap-10 md:p-8 shadow-md shadow-slate-950">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xl"><span className="text-slate-600 font-normal">#</span>{invoiceId}</p>
            <p className="text-slate-500">{projectDescription}</p>
          </div>
          <div>
            <p className="text-wrap w-28 text-right text-slate-500">{streetAddress}, {country}</p>
          </div>
        </div>

        <div className="flex justify-between md:justify-start md:grid md:grid-cols-3">
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <p className="text-slate-500 font-normal">Invoice Date</p> 
              <p className="text-lg">{invoiceDate}</p>
            </div>
            <div>
               <p className="text-slate-500 font-normal">Payment Due</p> 
               <p className="text-lg">{dueDate}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-1 gap-4 justify-between md:justify-start text-right md:text-left md:col-span-2 md:grid md:grid-cols-2">
              <div className="space-x-2">
                <p className="text-slate-500 font-normal">Bill To</p>
                <h3>{clientName}</h3>
                <p  className="text-wrap md:w-1/2">{clientStreetAddress}, {clientCountry}</p>
              </div>
            <div>
              <p className="text-slate-500 font-normal">Sent To</p>
              <p className="break-words">{clientEmail}</p>
            </div>
          </div>
          
        </div>

        {/* Item list */}
        <div className="w-full bg-slate-700 rounded-lg text-sm md:text-md">
          <div className="p-2 font-normal">
          <table className="table-auto border-separate border-spacing-2 w-full">
            <thead>
              <tr>
                <th className="text-left text-slate-500">Item Name</th>
                <th className="text-center text-slate-500">QTY.</th>
                <th className={tableHeadStyle}>Price</th>
                <th className={tableHeadStyle}>Total</th>
             </tr>
            </thead>
            <tbody>
              {itemList?.length > 0 && itemList?.map((item, index) => (
                <tr key={index} className="w-full">
                  <td className="text-left">{item.itemName}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right break-all">{formatToPound(item.price ?? 0)}</td>
                  <td className="text-right break-all">{formatToPound((item.price ?? 0) * (item.quantity ?? 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-950 rounded-b-lg">
            <p className="text-slate-500">Amount Due</p>
            <h3 className="text-xl overflow-x-auto break-all text-right">{itemList?.length > 0 ? formatToPound(calculateDueAmount(itemList)) : 0}</h3>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ViewInvoice


