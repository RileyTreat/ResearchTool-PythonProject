import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetUserQuestions, thunkDeleteQuestion, thunkUpdateQuestion } from "../../redux/questions";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";
import { useModal } from "../../context/Modal";
import "./ManageQuestionsPage.css";

function ManageQuestionsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions.userQuestions || []);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkGetUserQuestions());
  }, [dispatch]);

  const handleDeleteQuestion = async (questionId) => {
    await dispatch(thunkDeleteQuestion(questionId));
    dispatch(thunkGetUserQuestions()); // Refresh the questions after deletion
  };

  const handleEditQuestion = async (questionId, updatedContent) => {
    await dispatch(thunkUpdateQuestion(questionId, { question: updatedContent }));
    dispatch(thunkGetUserQuestions()); // Refresh the questions after editing
    closeModal(); // Close the modal
  };

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
      <h1 className="manage-header">Manage Your Inquiries</h1>

      {/* Questions Grid */}
      <div className="questions-grid">
        {questions.length === 0 ? (
          <p>No inquiries found.</p>
        ) : (
          questions.map((question) => (
            <div
              key={question.id}
              className="question-tile"
              onClick={() => handleTileClick(question.artifact.id)}
            >
              <img
                src={question.artifact.image || "/placeholder.jpg"}
                alt={question.artifact.title}
                className="artifact-image"
              />
              <h3>{question.artifact.title}</h3>
              <p>Archiver: {question.artifact.archiver || "Anonymous"}</p>
              <p className="user-question">{question.question}</p>
              <div
                className="question-actions"
                onClick={(e) => e.stopPropagation()} // Prevent navigation on button click
              >
                <OpenModalButton
                  buttonText="Edit"
                  buttonClassName="edit-button"
                  modalComponent={
                    <EditModal
                      currentContent={question.question} // Pass the current question content
                      onSave={(updatedContent) => handleEditQuestion(question.id, updatedContent)}
                      onCancel={closeModal}
                    />
                  }
                />
                <OpenModalButton
                  buttonText="Delete"
                  buttonClassName="delete-button"
                  modalComponent={
                    <DeleteModal
                      itemType="question"
                      onConfirm={() => handleDeleteQuestion(question.id)}
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

export default ManageQuestionsPage;
