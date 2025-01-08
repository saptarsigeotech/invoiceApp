import { MutableRefObject } from 'react'
import { AiOutlineFileDone } from 'react-icons/ai'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdOutlineDensitySmall } from 'react-icons/md'

const InvoiceFilter = ({filterRef, handleStatusClick}: {filterRef: MutableRefObject<HTMLDivElement | null>, handleStatusClick: (filter: "pending" | "paid" | "all") => void}) => {
  return (
    <div ref={filterRef} className="absolute top-12 w-44 bg-slate-900 shadow-black shadow-md rounded-lg border-slate-700 border-t-2">
                <div className="w-full p-4 flex flex-col justify-center items-start gap-3 font-bold">
                    <div className="w-full" onClick={() => handleStatusClick("pending")}>
                      <li className="bg-yellow-500 text-orange-500 focus:border-2 focus:border-red w-full p-3 rounded-md bg-opacity-10 text-center hover:bg-slate-100 transition-all flex items-center">
                      <GiSandsOfTime />
                      <div className="mx-auto">Pending</div>
                      </li>
                    </div>

                    <div className="w-full" onClick={() => handleStatusClick("paid")}>
                      <li className="bg-green-700 text-green-500 w-full p-3 rounded-md bg-opacity-10 text-center hover:bg-slate-100 transition-all flex items-center">
                      <AiOutlineFileDone />
                      <div className="mx-auto">Paid</div>
                      </li>
                    </div>

                    <div className="w-full" onClick={() => handleStatusClick("all")}>
                      <li className="bg-indigo-500 text-indigo-500/100 w-full p-3 rounded-md bg-opacity-10 text-center hover:bg-indigo-400 transition-all hover:text-slate-800 flex items-center">
                      <MdOutlineDensitySmall/>
                        <div className="mx-auto">All</div>
                      </li>
                    </div>
                </div>
              </div>
  )
}

export default InvoiceFilter
