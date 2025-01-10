/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEventHandler, ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

//type for Modal used in ViewInvoice.tsx and HomePage.tsx
export type ModalType = {
  showModal: boolean | undefined;
  children: ReactNode;
  handleClose: () => void;
};

//type for user form
export type UserFormPorps = {
  handleModalClose: () => void;
  showModal: boolean | undefined;
  handleClose: () => void;
  handleOpen: () => void;
};

//type for single invoice item
export type invoiceItem = {
  itemName: string;
  quantity: number | null;
  price: number | null;
};

//type for adding invoice
export type InvoiceType = {
  id?: string;
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
  dueDate?: string | undefined;
  postCode: number;
  projectDescription: string;
  streetAddress: string;
  itemList: invoiceItem[];
  dueAmount?: number;
  status: "pending" | "paid" | undefined;
};
export type InvoiceStatusProps = {
  status: "pending" | "paid" | undefined; 
};

//invoices on card
export type InvoiceForCard = {
    id: string | undefined;
    clientName: string;
    dueDate: string ;
    dueAmount: number;
    status: "pending" | "paid" | undefined;
}

//button type
export type ButtonType = {
  children: React.ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  variant: string,
  disabled?: boolean,
  type?: "button" | "reset" | "submit" | undefined,
  others?: Record<string,unknown>
}

//label-input Type
export type LabelInputType = {
  parentDivClassName ?: string | undefined,
  label?: string,
  labelStyle?: string,
  inputStyle?: string,
  errorStyle?: string,
  type?: string,
  min?: string,
  placeholder: string, 
  keyName: string, 
  requiredMessage?: string, 
  patternValue?: RegExp | undefined, 
  patternMessage?: string | undefined, 
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  minValue?: number,
  minMessage?: string,
  children?: React.ReactElement;
}