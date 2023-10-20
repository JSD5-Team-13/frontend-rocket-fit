const ConfirmDeleteDialog = ({ onConfirm, onClose }) => {
  return (
    <section className="fixed top-0 left-0 w-[100%] h-[100%] bg-black/50 flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded-2xl mx-7">
        <h3 className="font-bold text-lg">Delete Your Activity!</h3>
        <p className="py-4 text-[1rem]">
          This activity will be deleted and you won't be able to find it
          anymore.
        </p>

        {/* Footer Modal */}
        <footer className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn text-red-500 hover:bg-red-500 hover:text-white"
            onClick={onConfirm}
          >
            Delete
          </button>
        </footer>
      </div>
    </section>
  );
};

export default ConfirmDeleteDialog;
