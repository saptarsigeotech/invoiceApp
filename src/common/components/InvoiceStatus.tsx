import { capitalize } from "@/features/invoice/utils/invoice.utils"
import { InvoiceStatusProps } from "@/types/types"

const InvoiceStatus = ({status} : InvoiceStatusProps) => {
  return (
    <div className={`lg:w-36 ${status === "pending" ? "bg-yellow-500 text-orange-500": status === "paid" ? "bg-green-700 text-green-500" : status === "draft" ? "bg-slate-100" : ""} h-12 w-28 rounded-md bg-opacity-10 inset-0 flex justify-center items-center gap-2 font-bold`}>
        <div className={`w-2 h-2 rounded-full ${status === "pending" ? "bg-orange-500": status === "paid" ? "bg-green-500" : status === "draft" ? "bg-slate-100" : ""}`}></div>
        <p className="bg-opacity-100">{capitalize(status)}</p> 
    </div>
  )
}

export default InvoiceStatus

