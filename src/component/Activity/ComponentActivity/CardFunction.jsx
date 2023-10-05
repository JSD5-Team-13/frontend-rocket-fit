import { useState } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import UpdateForm from "./UpdateForm"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"

const CardFunction = ({ activity, updateData, deleteData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    deleteData(activity._id);
    setIsOpen(false);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowUpdateForm(false);
    setShowConfirmation(false);
    setIsOpen(false);
  };

  return (
    <div className="absolute right-2 top-2">
      {/* icon */}
      <div className="flex flex-col items-end">
        <button
          className="btn btn-sm btn-circle m-1 bg-base-100 lg:bg-gray-200 border-none hover:bg-[#1CD6CE]"
          onClick={handleClick}
        >
          <HiOutlineCog6Tooth size={22} />
        </button>

        {/* Menu Function */}
        {isOpen && (
          <div className="flex flex-col w-28 bg-gray-200 lg:bg-base-100 rounded-btn">
            <button
              className="flex p-2 hover:bg-[#1CD6CE] rounded-md text-start"
              onClick={handleUpdate}
            >
              <AiOutlineEdit size={18} /> <span className="ml-2">Edit</span>
            </button>
            <button
              className="flex p-2 hover:bg-red-400 rounded-md text-start"
              onClick={handleDelete}
            >
              <AiOutlineDelete size={18} /> <span className="ml-2">Delete</span>
            </button>
          </div>
        )}
        {showUpdateForm && (
          <UpdateForm
            activity={activity}
            updateData={updateData}
            onClose={handleCancel}
          />
        )}

        {showConfirmation && (
          <ConfirmDeleteDialog
            onConfirm={handleConfirm}
            onClose={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default CardFunction;
