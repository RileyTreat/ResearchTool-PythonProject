import { useState } from "react";
import "./EditModal.css";

function EditModal({ currentContent, onSave, onCancel }) {
  const [newContent, setNewContent] = useState(currentContent);

  const handleSave = () => {
    if (newContent.trim()) {
      onSave(newContent);
    }
  };

  return (
    <div className="edit-modal-container">
      <h1>Edit Your Response</h1>
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        rows={5}
      />
      <div className="edit-modal-buttons">
        <button
          className="save-edit-button"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <button
          className="cancel-edit-button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditModal;
