import { useFieldArray, useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { addInvoiceThunk, updateInvoiceThunk } from "../services/invoice.service";
import { formatToPound } from "../utils/utils";
import { UserFormPorps, InvoiceType } from "@/types/types";
import LabelInput from "./Label-Input/LabelInput";
import { AppDispatch } from "@/store/store";
import Button from "./Button/Button";

const InvoiceForm = (props: UserFormPorps)=> {

  const {handleModalClose, id} = props; //destructuring props

  const dispatch = useDispatch<AppDispatch>(); //using dispatch for disptaching the action for reducers 

  const currentInvoice = useSelector((state : RootState ) =>(id ? state.invoices.invoices?.filter((invoice) => invoice.id === id)[0]: null)) // getting all invoices from redux store with useSelector hook


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

  async function onSubmit(updatedData: InvoiceType) {
    try {
      if (currentInvoice) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("Submitting the form", updatedData);
        const id = currentInvoice.id;
        if (!id) {
          throw new Error("Invoice ID is undefined.");
        }
  
        await dispatch(updateInvoiceThunk({ id, updates: updatedData })).unwrap();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("Submitting the form", updatedData);
  
        await dispatch(addInvoiceThunk(updatedData)).unwrap();
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      reset();
      handleModalClose();
    }
  }
  

  //style for item input elemets
  const itemInputStyle: string = "bg-slate-700 px-3 md:px-5 py-2 md:py-4 mt-2 border-1 md:border-2 border-slate-700 rounded-md bg-opacity-50 focus:outline-none focus:ring focus:ring-indigo-500/100 text-sm font-normal"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-slate-100 flex flex-col gap-8 px-10 py-10" noValidate>
          <h1 className="text-2xl font-bold">{id ? <p>Edit <span className="text-slate-500 font-normal">#</span>{id}</p> : "Add Invoice"}</h1>
         
         {/* Bill From */}
          <div className="flex flex-col gap-5">
            <p className="text-indigo-500/100 font-bold">Bill From</p>
            
            <LabelInput label="Street Address" placeholder="biller street address" keyName="streetAddress" requiredMessage="street address" register={register} errors={errors}/>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">

              <LabelInput label="City" placeholder="City" keyName="city" requiredMessage="city name" register={register} errors={errors}/>

              <LabelInput label="Post Code" placeholder="biller postcode" keyName="postCode" requiredMessage="post code" register={register} errors={errors}/>

              <LabelInput parentDivClassName="col-span-2 md:col-span-1" label="Country" placeholder="biller country name" keyName="country" requiredMessage="country name" register={register} errors={errors}/>

            </div>
          </div>
    
          {/* Bill To */}
          <div className="flex flex-col gap-5">
          <p className="text-indigo-500/100 font-bold">Bill To</p>
            
            <LabelInput label="Client's Name" placeholder="client name" keyName="clientName" requiredMessage="client name" register={register} errors={errors}/>

            <LabelInput label="Client's Email" type="email" placeholder="johndoe@gmail.com" keyName="clientEmail" requiredMessage="Client email" patternValue={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} patternMessage="Invalid email address" register={register} errors={errors}/>

            <LabelInput label="Client's Name" placeholder="client street address" keyName="clientStreetAddress" requiredMessage="client street address" register={register} errors={errors}/>
            
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">

              <LabelInput label="City" placeholder="client city name" keyName="clientCity" requiredMessage="client city" register={register} errors={errors}/>

              <LabelInput label="Post Code" placeholder="client postcode" keyName="clientPostCode" requiredMessage="client post code" register={register} errors={errors}/>

              <LabelInput parentDivClassName="col-span-2 md:col-span-1" label="Country" placeholder="client country name" keyName="clientCountry" requiredMessage="client country" register={register} errors={errors}/>

            </div>
          </div>
    
          {/* Invoice Date, Payment terms, project Description */}
    
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">

              <LabelInput label="Invoice Date" type="date" placeholder="client country name" keyName="invoiceDate" requiredMessage="invoice date" register={register} errors={errors}/>

              
              <LabelInput parentDivClassName="flex flex-col items-start relative" label="Payment Terms" type="number" min="0" placeholder="ex. 30 days" keyName="paymentTerms" requiredMessage="payment terms" register={register} errors={errors} minValue={0} minMessage="Payment terms cannot be negative"/>
              

            </div>

            <LabelInput label="Project Description" placeholder="project information" keyName="projectDescription" requiredMessage="project description" register={register} errors={errors}/>

          </div>
    
          {/* Item List */}
          <div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">Item List</h3>
    
              {/* Listing inovice items dynamically */}
              {fields?.length > 0 && 
              <div className="grid grid-cols-9 gap-3 text-slate-500">
                <p className="col-span-4 md:col-span-3">Item Name</p>
                <p className="col-span-2 3xl:col-span-1">Qty.</p>
                <p className="col-span-3 md:col-span-2 3xl:col-span-2">Price</p>
                <p className="col-span-0 md:col-span-1 3xl:col-span-2 hidden md:block">Total</p>
              </div>   
              }
             
    
                <div className="flex flex-col gap-3 md:gap-5 my-2">
                  {fields?.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-9 gap-3 md:gap-5 items-center font-bold text-slate-200">
    
                      <input type="text" className={`col-span-4 md:col-span-3 ${itemInputStyle}`}{...register(`itemList.${index}.itemName` as const, {required: {value: true, message: "Item name is required"}})}/>

                      <input type="number" min="0" className={`col-span-2 3xl:col-span-1 ${itemInputStyle}`} {...register(`itemList.${index}.quantity` as const, {required: {value: true, message: "Item quantity is required"}, min: {value: 0, message: "Item quantity cannot be negative"}})}/>

                      <input type="number" min="0" className={`col-span-3 md:col-span-2 3xl:col-span-2 ${itemInputStyle}`} {...register(`itemList.${index}.price` as const, {required: {value: true, message: "Item price is required"},})}/>
                      
                      <p className="col-span-8 md:col-span-1 3xl:col-span-2 px-auto truncate">{formatToPound((watch(`itemList.${index}.quantity`) ??  0) * (watch(`itemList.${index}.price`) ?? 0))}</p>

                      <Button variant="deleteBtnForm" onClick={() => remove(index)} ><MdDelete/></Button>
                    </div>
                  ))}
                  {/* add new item button */}
                  <Button variant="addNewItem" onClick={() => append({ itemName: "", quantity: 0, price: 0})}>+ Add New Item</Button>
                </div>
            </div>
    
          <div className="flex justify-end items-center gap-2">
            <Button variant="cancelBtn" onClick={handleModalClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" variant="submitBtn" disabled={isSubmitting}>
              {isSubmitting ? <div className="h-5 w-5 border-4 border-slate-100 border-t-indigo-500/100 rounded-3xl animate-spin"></div> : id ? "Update": "Save"} 
            </Button> 
          </div>
    </form>
  )
}

export default InvoiceForm;


