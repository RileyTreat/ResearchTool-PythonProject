import { useModal } from "../../context/Modal";
import "./DeleteModal.css";

function DeleteModal({ onConfirm }) {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm(); // Execute the delete action
    closeModal(); // Close the modal
  };

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this item?</p>
      <div className="delete-modal-buttons">
        <button
          className="delete-confirm-button"
          onClick={handleConfirm}
        >
          Yes (Delete)
        </button>
        <button
          className="delete-cancel-button"
          onClick={closeModal}
        >
          No (Keep Item)
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
