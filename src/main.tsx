// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, } from 'react-router-dom'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename='/invoiceApp'>
      <Provider store={store}>
        <App />
        <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="color"
        className={"text-xl font-bold font-poppins text-indigo-400/100 bg-slate-800 rounded-lg shadow-lg shadow-black top-6 m-2"}/>
      </Provider>
    </BrowserRouter>
)
