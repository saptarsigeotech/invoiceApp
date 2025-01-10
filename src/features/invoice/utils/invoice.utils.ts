import { InvoiceType } from "@/types/types";

//function to make a number in pound format
export const formatToPound = (number: number) => { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', }).format(number); };

//function for capitalizing a string
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1); 

//destructuring invoice information from the current invoice
export const calculateDueAmount = (arr: { price: number | null, quantity: number | null }[]) : number => arr?.map(item => (item.price?? 0) * (item.quantity ?? 0)).reduce((total: number, currVal: number) => total + currVal); //calulating the amount due for particular invoice


//generate new Invoice ID
export const generateInvoiceId = (invoices: InvoiceType[]): string => {
 
  const validInvoiceIds = invoices
    .map((invoice) => invoice.id)
    .filter((id): id is string => !!id && /^IN\d{4}$/.test(id)); 
  
  const lastInvoiceId = validInvoiceIds.reduce((maxId, currentId) => {
    const numericPart = parseInt(currentId.slice(2));
    const maxNumericPart = parseInt(maxId.slice(2));
    return numericPart > maxNumericPart ? currentId : maxId;
  }, "IN0000");

  let numericPart = parseInt(lastInvoiceId.slice(2));
  numericPart++;

  const newInvoiceId = `IN${numericPart.toString().padStart(4, "0")}`;

  return newInvoiceId;
};

//function for calculating due date from invoice date and payment terms

  export const calculateDueDate = (invoiceDate : string, paymentTerms: number) => { 
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + Number(paymentTerms));

    // Get the year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0'); // Pad the day to 2 digits if necessary
    
     // Return the formatted date as 'YYYY-MM-DD'
     return `${year}-${month}-${day}`;
    };

//calculate and format duedate after addition of payment terms
export const dateFormat = (actualDate: string) => {
      const arr = actualDate.split("-");
      const [year, month, date] = arr;
      const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return (date + " " + allMonths[Number(month)-1] + " " + year);
    }





  