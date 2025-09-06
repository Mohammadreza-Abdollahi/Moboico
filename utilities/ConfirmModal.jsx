"use client";

import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  icon = "info",
  title = "عملیات",
  description = "ایا از انجام این کار اطمینان دارید؟",
  confirmText = "بله",
  cancelText = "خیر",
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/65" onClick={onClose} />

        <div className="relative flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-lg max-w-5/6 md:max-w-4/6 lg:max-w-1/3 w-full p-6 z-10">
          <div className="mx-auto flex-1/6">
            <FontAwesomeIcon
              icon={
                icon === "success"
                  ? faCircleCheck
                  : icon === "info"
                  ? faCircleExclamation
                  : icon === "danger"
                  ? faCircleXmark
                  : null
              }
              className={`text-7xl md:text-5xl ${
                icon === "success"
                  ? "text-green-500"
                  : icon === "info"
                  ? "text-blue-500"
                  : icon === "danger"
                  ? "text-red-500"
                  : null
              }`}
            />
          </div>
          <div className="flex-4/5">
            <h2 className="text-lg text-center md:text-start my-3 md:my-0 font-semibold text-gray-800">
              {title}
            </h2>
            <p className="text-base text-gray-600 mt-2">{description}</p>
          </div>

          <div className="mt-5 md:mt-0 flex flex-1/6 justify-end items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
