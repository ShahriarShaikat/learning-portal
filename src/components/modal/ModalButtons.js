function ModalButtons({ setShowModal, submitBtnStatus }) {
  return (
    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
      <button
        disabled={submitBtnStatus}
        className="bg-emerald-600 text-slate-500  font-bold uppercase text-sm px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all duration-150"
        type="submit"
      >
        Save Changes
      </button>
    </div>
  );
}
export default ModalButtons;
