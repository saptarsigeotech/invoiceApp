
//function to make a number in pound format
export const formatToPound = (number: number) => { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', }).format(number); };

//function for capitalizing a string
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1); 

//destructuring invoice information from the current invoice
export const calculateDueAmount = (arr: { price: number | null, quantity: number | null }[]) : number => arr?.map(item => (item.price?? 0) * (item.quantity ?? 0)).reduce((total: number, currVal: number) => total + currVal); //calulating the amount due for particular invoice


// function to generate a random id with combination of IN letters and 4 numbers strating from 0000
export const generateRandomId = (): string => {
  // Retrieve the last used invoice ID from localStorage
  let lastInvoiceId = localStorage.getItem("lastInvoiceId");

  if (!lastInvoiceId) {
    lastInvoiceId = "IN0000";
  }
  let numericPart = parseInt(lastInvoiceId.slice(2));
  numericPart++;
  if (numericPart > 9999) {
    numericPart = 1; // reset to 1
  }
  const newInvoiceId = `IN${numericPart.toString().padStart(4, "0")}`;

  // storing the new ID in localStorage
  localStorage.setItem("lastInvoiceId", newInvoiceId);
  return newInvoiceId;
}

// type Invoice = {
//   id: string;
//   [key: string]: any; // other fields can be added to the invoice object
// };

// export const generateNewInvoiceId = (invoices: Invoice[]): string => {
//   if (invoices.length === 0) {
//     // If the array is empty, start from "IN0001"
//     return "IN0001";
//   }

//   // Get the ID of the last element in the array
//   const lastInvoiceId = invoices[invoices.length - 1].id;

//   // Check if the last invoice ID is in the correct "IN0000" pattern
//   if (/^IN\d{4}$/.test(lastInvoiceId)) {
//     // Extract the numeric part, increment it and create the new ID
//     let numericPart = parseInt(lastInvoiceId.slice(2));
//     numericPart++;

//     // If the numeric part exceeds 9999, reset to 1
//     if (numericPart > 9999) {
//       numericPart = 1;
//     }

//     // Generate the new invoice ID with the incremented number
//     return `IN${numericPart.toString().padStart(4, "0")}`;
//   } else {
//     // If the last ID is not in the correct pattern, return "IN0001"
//     return "IN0001";
//   }
// };

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





  