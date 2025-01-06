import { ModalType } from "@/types/types";
import { useRef } from "react";
import { useClickAway } from "react-use";

const Modal = (props:ModalType ) => {

  const { showModal, children, handleClose} = props; //extracting props by destructuring
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickAway(modalRef, () => {
    handleClose();
  });

  return (
    <div className={`h-full min-h-screen w-full absolute left-0 top-0 ${showModal ? "visible bg-black/50 overflow-y-auto" : "invisible"}`}>
      <div ref={modalRef} className={'w-full md:w-3/4 xl:w-5/12 bg-slate-900 shadow-md shadow-black min-h-full rounded-r-2xl transform translate-x-0 transition-all duration-10000 ease-in-out'}>
        {children}
      </div>
    </div>
  )
}

export default Modal
