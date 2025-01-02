import Card from "@/common/components/Card";
import { InvoiceType } from "@/types/types";

const InvoiceList = (props: {
  invoicesData: InvoiceType[]; 
} ) => {

  const { invoicesData } = props;

  return (
    <div className="flex flex-col gap-5 pt-8 text-slate-100">
      {invoicesData?.length > 0 && invoicesData?.map((invoice: InvoiceType) => (
        <div key={invoice.id}>
          <Card id={invoice.id} clientName={invoice.clientName} dueDate={invoice.dueDate ?? "N/A"} dueAmount={invoice.dueAmount ?? 0} status={invoice.status}/>
        </div>
      ))}
    </div>
  )
}

export default InvoiceList;
