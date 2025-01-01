import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetArtifacts } from "../../redux/artifacts";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const artifacts = useSelector((state) => state.artifacts.allArtifacts);
  const [viewedArtifacts, setViewedArtifacts] = useState([]);

  useEffect(() => {
    dispatch(thunkGetArtifacts());
  }, [dispatch]);

  const handleArtifactClick = (artifactId) => {
    // Add the artifact ID to the "viewed" list
    if (!viewedArtifacts.includes(artifactId)) {
      setViewedArtifacts((prev) => [...prev, artifactId]);
    }
  };

  return (
    <div className="home-page">
      <h1>All Catalogued Artifacts</h1>
      <div className="artifact-grid">
        {artifacts.map((artifact) => (
          <div key={artifact.id} className="artifact-tile">
            <NavLink
              to={`/artifacts/${artifact.id}`}
              onClick={() => handleArtifactClick(artifact.id)}
              style={{ textDecoration: "none" }} // Inline style to ensure no underline
            >
              <img
                src={artifact.images?.[0]?.url || "placeholder.jpg"}
                alt={artifact.title}
                className="artifact-image"
              />
              <h3 className={viewedArtifacts.includes(artifact.id) ? "viewed" : ""}>
                {artifact.title}
              </h3>
            </NavLink>
            <p>Archiver: {artifact.archiver}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
