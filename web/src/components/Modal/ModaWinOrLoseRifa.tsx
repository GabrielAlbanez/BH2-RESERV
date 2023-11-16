
import React from "react";

import { GrFormClose } from "react-icons/gr";


interface PropsModal {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const ModaWinOrLoseRifa: React.FC<PropsModal> = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-black/20 " : "invisible "
      }`}
    >
      <div className={`bg-white rounded-xl shadow p-6 transition-all duration-1000 ${open ? "scale-100 opacity-100 " : "scale-125 opacity-0 "}`}>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 ">
            <GrFormClose size={30}/>
        </button>
        {children}</div>
    </div>
  );
};

export default ModaWinOrLoseRifa;
