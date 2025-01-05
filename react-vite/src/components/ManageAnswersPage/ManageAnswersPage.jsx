import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetUserAnswers, thunkDeleteAnswer, thunkUpdateAnswer } from "../../redux/answers";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";
import { useModal } from "../../context/Modal";
import "./ManageAnswersPage.css";

function ManageAnswersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answers = useSelector((state) => state.answers || []); // Only user-specific answers
  const { closeModal } = useModal();

  // Fetch user-specific answers on component mount
  useEffect(() => {
    dispatch(thunkGetUserAnswers());
  }, [dispatch]);

  // Delete an answer
  const handleDeleteAnswer = async (answerId) => {
    await dispatch(thunkDeleteAnswer(answerId));
    dispatch(thunkGetUserAnswers()); // Refresh the answers after deletion
  };

  // Edit an answer
  const handleEditAnswer = async (answerId, updatedContent) => {
    await dispatch(thunkUpdateAnswer(answerId, { answer: updatedContent }));
    dispatch(thunkGetUserAnswers()); // Refresh the answers after editing
    closeModal(); // Close the modal
  };

  // Navigate to artifact page
  const handleTileClick = (artifactId) => {
    navigate(`/artifacts/${artifactId}`);
  };

  return (
    <div className="manage-page">
      {/* Navigation Buttons */}
      <div className="manage-page-navigation">
        <button onClick={() => navigate("/archiver/artifacts")}>Manage Artifacts</button>
        <button onClick={() => navigate("/archiver/questions")}>Manage Questions</button>
        <button onClick={() => navigate("/archiver/answers")}>Manage Answers</button>
      </div>

      {/* Page Header */}
      <h1 className="manage-header">Manage Your Answers</h1>

      {/* Answers Grid */}
      <div className="answers-grid">
        {answers.length === 0 ? (
          <p>No answers found.</p>
        ) : (
          answers.map((answer) => (
            <div
              key={answer.id}
              className="answer-tile"
              onClick={() => handleTileClick(answer.artifact_id)}
            >
              <img
                src={answer.artifact_image || "/placeholder.jpg"}
                alt={answer.artifact_title}
                className="artifact-image"
              />
              <h3>{answer.artifact_title}</h3>
              <p>Question: {answer.question_content}</p>
              <p className="user-answer">Your Answer: {answer.answer}</p>
              <div
                className="answer-actions"
                onClick={(e) => e.stopPropagation()} // Prevent navigation on button click
              >
                <OpenModalButton
                  buttonText="Edit"
                  buttonClassName="edit-button"
                  modalComponent={
                    <EditModal
                      currentContent={answer.answer} // Pass the current answer content
                      onSave={(updatedContent) => handleEditAnswer(answer.id, updatedContent)}
                      onCancel={closeModal}
                    />
                  }
                />
                <OpenModalButton
                  buttonText="Delete"
                  buttonClassName="delete-button"
                  modalComponent={
                    <DeleteModal
                      itemType="answer"
                      onConfirm={() => handleDeleteAnswer(answer.id)}
                      onCancel={closeModal}
                    />
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageAnswersPage;
