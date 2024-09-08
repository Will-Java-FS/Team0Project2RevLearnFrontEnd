import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Accept any children as content
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" p-6 rounded shadow-lg max-w-full max-h-full">
        {/* Content area adjusts based on children size */}
        <div className="mb-4">{children}</div>
        {/* Close button */}
        <div className="flex justify-center w-full">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
