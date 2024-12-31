import { useFieldArray, useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { addInvoice, updateInvoice } from "@/features/invoice/invoiceSlice";
import { formatToPound } from "../utils/utils";
import { UserFormPorps, InvoiceType } from "@/types/types";

const UserForm = (props: UserFormPorps)=> {

  const {handleModalClose, id} = props; //destructuring props

  const dispatch = useDispatch(); //using dispatch for disptaching the action for reducers 

  const currentInvoice = useSelector((state : RootState ) =>(id ? state.invoices?.filter((invoice) => invoice.id === id)[0]: null)) // getting all invoices from redux store with useSelector hook


//react hook form data
  const { register, handleSubmit, formState , reset, control, watch } = useForm<InvoiceType>(); //hook from react-hook-form
  const {errors, isSubmitting } = formState;
  const {fields, append, remove} = useFieldArray({
    name: 'itemList',
    control
  });

  useEffect(() => {
    if (currentInvoice) {
      reset(currentInvoice); // Reset form values to the current invoice data
    }
  }, [currentInvoice, reset]);

  // Handle form submission
  async function onSubmit(updatedData: InvoiceType){
    // Dispatch the editInvoice action with the updated data
    if (currentInvoice) {      
      await new Promise ((resolve) => setTimeout(resolve, 3000))
          console.log("Submitting the form", updatedData);
          dispatch(updateInvoice({ id: id, updatedInvoice: updatedData }));   
    }else{
        await new Promise ((resolve) => setTimeout(resolve, 5000))
            console.log("Submitting the form", updatedData);
            dispatch(addInvoice(updatedData));
    }
    reset();
    handleModalClose(); 
  };

  //style for error elements
  const errorStyle: string = "text-red-700 mt-1 text-sm"; 
  //style for input elements
  const inputStyle: string = "bg-slate-700 w-full h-8 rounded-md px-3 md:px-5 py-4 md:py-6 mt-2 border-1 md:border-2 border-slate-700 focus:outline-none focus:ring focus:ring-indigo-500/100 bg-opacity-50 placeholder-gray-600";
  //style for label elements
  const labelStyle: string = "text-slate-500 font-normal";
  //style for item input elemets
  const itemInputStyle: string = "bg-slate-700 px-3 md:px-5 py-2 md:py-4 mt-2 border-1 md:border-2 border-slate-700 rounded-md bg-opacity-50 focus:outline-none focus:ring focus:ring-indigo-500/100 text-sm font-normal"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-slate-100 flex flex-col gap-8 px-10 py-10" noValidate>
          <h1 className="text-2xl font-bold">{id ? <p>Edit <span className="text-slate-500 font-normal">#</span>{id}</p> : "Add Invoice"}</h1>
         
         {/* Bill From */}
          <div className="flex flex-col gap-5">
            <p className="text-indigo-500/100 font-bold">Bill From</p>
            <div>
              <label className={labelStyle}>Street Address</label>
              <input type="text" placeholder="biller street address" {...register("streetAddress", {required: {value: true, message: "street address is required"} })} className={inputStyle}/>
              {errors.streetAddress && <p className={errorStyle}>{errors.streetAddress.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              <div>
                <label className={labelStyle}>City</label>
                <input type="text" placeholder="biller city name" {...register("city", {required: {value: true, message: "city name is required"} })} className={inputStyle}/>
                {errors.city && <p className={errorStyle}>{errors.city.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Post Code</label>
                <input type="number" placeholder="biller postcode" {...register("postCode", {required: {value: true, message: "post code is required"}})} className={inputStyle}/>
                {errors.postCode && <p className={errorStyle}>{errors.postCode.message}</p>}
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className={labelStyle}>Country</label>
                <input type="text" placeholder="biller country name" {...register("country",{required: {value: true, message: "country name is required"}})} className={inputStyle}/>
                {errors.country && <p className={errorStyle}>{errors.country.message}</p>}
              </div>
            </div>
          </div>
    
          {/* Bill To */}
          <div className="flex flex-col gap-5">
          <p className="text-indigo-500/100 font-bold">Bill To</p>
            <div>
              <label className={labelStyle}>Client's Name</label>
              <input type="text" placeholder="client name" {...register("clientName" ,{required: {value: true, message: "client name is required"}})} className={inputStyle}/>
              {errors.clientName && <p className={errorStyle}>{errors.clientName.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>Client's Email</label>
              <input type="email" placeholder="johndoe@gmail.com" {...register("clientEmail" ,{required: {value: true, message: "client email is required"}, pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',},})} className={inputStyle}/>
              {errors.clientEmail && <p className={errorStyle}>{errors.clientEmail.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>Street Address</label>
              <input type="text" placeholder="client street address" {...register("clientStreetAddress",{required: {value: true, message: "client street address is required"}})} className={inputStyle}/>
              {errors.clientStreetAddress && <p className={errorStyle}>{errors.clientStreetAddress.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              <div>
                <label className={labelStyle}>City</label>
                <input type="text" placeholder="client city name" {...register("clientCity",{required: {value: true, message: "client city is required"}})} className={inputStyle}/>
                {errors.clientCity && <p className={errorStyle}>{errors.clientCity.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Post Code</label>
                <input type="number" placeholder="client postcode" {...register("clientPostCode",{required: {value: true, message: "client post code is required"}})} className={inputStyle}/>
                {errors.clientPostCode && <p className={errorStyle}>{errors.clientPostCode.message}</p>}
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className={labelStyle}>Country</label>
                <input type="text" placeholder="client country name" {...register("clientCountry",{required: {value: true, message: "client country is required"}})} className={inputStyle}/>
                {errors.clientCountry && <p className={errorStyle}>{errors.clientCountry.message}</p>}
              </div>
            </div>
          </div>
    
          {/* Invoice Date, Payment terms, project Description */}
    
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-2 md:gap-5">
              <div>
                <label className={labelStyle}>Invoice Date</label>
                <input type="date" {...register("invoiceDate", {required: {value: true, message: "invoice date is required"}})} className={inputStyle}/>
                {errors.invoiceDate && <p className={errorStyle}>{errors.invoiceDate.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Payment Terms</label>
                <div className="flex items-start">
                  <input type="number" placeholder="30"{...register("paymentTerms", {required: {value: true, message: "payment terms is required"},  min: {value: 0, message: "Payment terms cannot be negative"},})} className={inputStyle}/>
                  <p className="bg-slate-95000 px-1 md:px-2 py-1 md:py-4 mt-2 ml-1 text-slate-500">Days</p>
                </div>
                {errors.paymentTerms && <p className={errorStyle}>{errors.paymentTerms.message}</p>}
              </div>
            </div>
            <div>
              <label className={labelStyle}>Project Description</label>
                <input type="text" placeholder="web dev project" {...register("projectDescription", {required: {value: true, message: "project description is required"}, })} className={inputStyle}/>
                {errors.projectDescription && <p className={errorStyle}>{errors.projectDescription.message}</p>}
            </div>
          </div>
    
          {/* Item List */}
          <div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">Item List</h3>
    
              {/* Listing inovice items dynamically */}
              {fields.length > 0 && 
              <div className="grid grid-cols-9 gap-3 text-slate-500">
                <p className="col-span-4 md:col-span-3">Item Name</p>
                <p className="col-span-2 3xl:col-span-1">Qty.</p>
                <p className="col-span-3 md:col-span-2 3xl:col-span-2">Price</p>
                <p className="col-span-0 md:col-span-1 3xl:col-span-2 hidden md:block">Total</p>
              </div>   
              }
             
    
                <div className="flex flex-col gap-3 md:gap-5 my-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-9 gap-3 md:gap-5 items-center font-bold text-slate-200">
    
                      <input type="text" className={`col-span-4 md:col-span-3 ${itemInputStyle}`}{...register(`itemList.${index}.itemName` as const, {required: {value: true, message: "Item name is required"}})}/>
                      

                     
                      <input type="number" className={`col-span-2 3xl:col-span-1 ${itemInputStyle}`} {...register(`itemList.${index}.quantity` as const, {required: {value: true, message: "Item quantity is required"}})}/>
                      

                     
                      <input type="number" className={`col-span-3 md:col-span-2 3xl:col-span-2 ${itemInputStyle}`} {...register(`itemList.${index}.price` as const, {required: {value: true, message: "Item price is required"}})}/>
                      

                      <p className="col-span-8 md:col-span-1 3xl:col-span-2 px-auto text-wrap">{formatToPound((watch(`itemList.${index}.quantity`) ??  0) * (watch(`itemList.${index}.price`) ?? 0))}</p>
                      <button type="button" onClick={() => remove(index)} className="col-span-1 mr-0 flex justify-end text-slate-700 hover:text-red-600"><MdDelete/></button>
                    </div>
                  ))}
                  {/* add new item button */}
                  <button type="button" onClick={() => append({ itemName: "", quantity: 0, price: 0})} className="bg-slate-700 w-full h-10 md:h-14 rounded-full mt-2 text-slate-100 font-bold bg-opacity-50 hover:bg-indigo-500/100">+ Add New Item</button>
                </div>
            </div>
    
          <div className="flex justify-end items-center gap-2">
            <button className="bg-slate-700 bg-opacity-50 h-10 p-6 rounded-full flex justify-center items-center font-bold" onClick={handleModalClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className={`bg-indigo-500/100 h-10 w-28 p-6 rounded-full flex justify-center items-center font-bold `} disabled={isSubmitting}>
              {isSubmitting ? <div className="h-5 w-5 border-4 border-slate-100 border-t-indigo-500/100 rounded-3xl animate-spin"></div> : id ? "Update": "Save"} 
            </button> 
          </div>
    </form>
  )
}

export default UserForm;


