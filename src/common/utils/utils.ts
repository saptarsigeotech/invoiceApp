//function to make a number in pound format
export const formatToPound = (number: number) => { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', }).format(number); };


//function to generate a random id with combination of IN letters and 4 numbers strating from 0000
export const generateRandomId = (): string => {
  // Retrieve the last used invoice ID from localStorage
  let lastInvoiceId = localStorage.getItem("lastInvoiceId");

  if (!lastInvoiceId) {
    lastInvoiceId = "IN0000";
  }

  let numericPart = parseInt(lastInvoiceId.slice(2));
  numericPart++;

  if (numericPart > 9999) {
    numericPart = 1; // Reset to 1
  }

  const newInvoiceId = `IN${numericPart.toString().padStart(4, "0")}`;

  // Storing the new ID in localStorage
  localStorage.setItem("lastInvoiceId", newInvoiceId);

  return newInvoiceId;
}

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


// format any number that has more than 4 digits, replace part of it with '...'

// export function shortenCurrency(input: string): string {
//   // Removing the currency symbol and commas
//   const numericPart = input.replace(/[^0-9]/g, '');

//   // Trimming the string to the first 4 digits
//   const shortened = numericPart.slice(0, 4);

//   // Returning the shortened version with currency symbol
//   return `£${shortened}...`;
// }

// // Example usage
// const longCurrency = '£493,827,159,999,999,940,000,000,000.00';
// console.log(shortenCurrency(longCurrency)); // Outputs: £4938...





  