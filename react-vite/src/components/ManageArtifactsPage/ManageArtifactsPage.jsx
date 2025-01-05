import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { thunkGetUserArtifacts } from "../../redux/artifacts";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import "./ManageArtifactsPage.css";

function ManageArtifacts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artifacts = useSelector((state) => state.artifacts.userArtifacts || []);

  useEffect(() => {
    dispatch(thunkGetUserArtifacts());
  }, [dispatch]);

  // const handleEditArtifact = (e, artifactId) => {
  //   e.stopPropagation();
  //   navigate(`/artifacts/${artifactId}/edit`);
  // };

  const handleDeleteArtifact = (artifactId) => {
    console.log("Deleting artifact:", artifactId);
    // Functionality for delete logic will be handled by DeleteModal
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
      <h1 className="manage-header">Manage Your Artifacts</h1>

      {/* Artifacts Grid */}
      <div className="artifacts-grid">
        {artifacts.length === 0 ? (
          <p>No artifacts found.</p>
        ) : (
          artifacts.map((artifact) => (
            <div key={artifact.id} className="artifact-tile" onClick={() => handleTileClick(artifact.id)}>
              <img
                src={artifact.images?.[0]?.url || "/placeholder.jpg"}
                alt={artifact.title}
                className="artifact-image"
              />
              <h3>{artifact.title}</h3>
              <div className="artifact-actions">
                <button
                    className="edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/artifacts/${artifact.id}/edit`);
                    }}
                  >
                    Edit
                  </button>
                {/* <NavLink
                  to={`/artifacts/${artifact.id}/edit`}
                  className="edit-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log("Navigating to edit page for artifact:", artifact.id);
                  }}
                >
                  Edit
                </NavLink> */}
                <OpenModalButton
                  buttonText="Delete"
                  buttonClassName="delete-button"
                  modalComponent={
                    <DeleteModal
                      itemType="artifact"
                      onConfirm={() => handleDeleteArtifact(artifact.id)}
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

export default ManageArtifacts;
