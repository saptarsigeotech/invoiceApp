import { createBrowserRouter } from "react-router-dom";
import Layout from "@/features/invoice/layouts/InvoiceLayout";
import HomePage from "@/features/invoice/pages/HomePage";
import ViewInvoice from "@/features/invoice/pages/ViewInvoice";
import NotFoundPage from "./errorBoundary/NotFoundPage";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "viewInvoice/:id",
          element: <ViewInvoice />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  {
    basename: "/invoiceApp/", 
  }
);

export default routes;
