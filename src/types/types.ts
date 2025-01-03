import { ReactNode } from "react";

//type for Modal used in ViewInvoice.tsx and HomePage.tsx
export type ModalType = {
  showModal: boolean;
  children: ReactNode;
};

//type for user form
export type UserFormPorps = {
  handleModalClose: () => void;
  id?: string | undefined;
};

//type for single invoice item
export type invoiceItem = {
  itemName: string;
  quantity: number | null;
  price: number | null;
};

//type for adding invoice
export type InvoiceType = {
  id?: string | undefined;
  city: string;
  clientCity: string;
  clientCountry: string;
  clientEmail: string;
  clientName: string;
  clientPostCode: number;
  clientStreetAddress: string;
  country: string;
  invoiceDate: string;
  paymentTerms: number;
  dueDate?: string;
  postCode: number;
  projectDescription: string;
  streetAddress: string;
  itemList: invoiceItem[];
  dueAmount?: number;
  status?: string | undefined;
};

//invoices on card
export type InvoiceForCard = {
    id: string | undefined;
    clientName: string;
    dueDate: string ;
    dueAmount: number;
    status: string | undefined;
}

