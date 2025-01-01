import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleArtifact } from "../../redux/artifacts";
import { thunkCreateQuestion } from "../../redux/questions";
import { thunkGetQuestionsByArtifact } from "../../redux/questions";

import "./ArtifactPage.css";

function ArtifactPage() {
    const { artifactId } = useParams();
    const dispatch = useDispatch();
    const artifact = useSelector((state) => state.artifacts.singleArtifact);
    const loggedInUserId = useSelector((state) => state.session.user?.id);
    const questions = useSelector((state) => state.questions); // 
    console.log('Redux questions:', questions); //

    const [question, setQuestion] = useState("");

    useEffect(() => {
        dispatch(thunkGetSingleArtifact(artifactId));
    }, [dispatch, artifactId]);

    useEffect(() => { ///
      dispatch(thunkGetQuestionsByArtifact(artifactId));
  }, [artifactId, dispatch]);
  

    const handleInquiry = () => {
        if (!question.trim()) return; // Prevent empty submissions
        dispatch(thunkCreateQuestion(artifactId, { question }))
            .then(() => {
              setQuestion(""); // Clear the input
              dispatch(thunkGetQuestionsByArtifact(artifactId)); // Refresh questions
          })
            .catch((err) => console.error("Failed to submit question:", err));
    };

    if (!artifact) return <p>Loading...</p>;

    const safeJoin = (value) => (Array.isArray(value) ? value.join(", ") : value || "N/A");

    return (
        <div className="artifact-page">
            <h1>{artifact.title}</h1>
            <div className="artifact-content">
                <img
                    src={artifact.images?.[0]?.url || "placeholder.jpg"}
                    alt={artifact.title}
                    className="artifact-image"
                />
                <div className="artifact-info">
                    <p><strong>Description:</strong> {artifact.description || "N/A"}</p>
                    <p><strong>Reference Date:</strong> {safeJoin(artifact.referenceDate)}</p>
                    <p><strong>Reference Person:</strong> {safeJoin(artifact.referencePerson)}</p>
                    <p><strong>Creator:</strong> {safeJoin(artifact.creator)}</p>
                    <p><strong>Place:</strong> {safeJoin(artifact.place)}</p>
                    <p><strong>Type:</strong> {safeJoin(artifact.types)}</p>
                    <p><strong>Subject:</strong> {safeJoin(artifact.subject)}</p>
                    <p><strong>Material:</strong> {artifact.material || "N/A"}</p>
                    <p><strong>Archiver:</strong> {artifact.archiver || "N/A"}</p>
                </div>
            </div>
            <hr />
            <div className="inquiry-section">
                <textarea
                    placeholder="Write your inquiry here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button onClick={handleInquiry}>Inquire</button>
            </div>
            <div className="questions-log">
                {questions?.sort((a, b) => b.id - a.id).map((q) => (
                    <div key={q.id} className="question-item">
                        <p><strong>{q.user?.username || "Anonymous"}</strong></p>
                        <p>{q.question}</p>
                        {/* Show delete and edit buttons for the logged-in user's questions */}
                        {q.user_id === loggedInUserId && (
                            <div>
                                <button className="edit-button">Edit</button>
                                <button className="delete-button">Delete</button>
                            </div>
                        )}
                        {artifact.answers
                            ?.filter((a) => a.question_id === q.id)
                            .map((a) => (
                                <div key={a.id} className="answer-item">
                                    <p><strong>{a.user?.username || "Anonymous"}</strong></p>
                                    <p>{a.answer}</p>
                                    {/* Show delete and edit buttons for the logged-in user's answers */}
                                    {a.user_id === loggedInUserId && (
                                        <div>
                                            <button className="edit-button">Edit</button>
                                            <button className="delete-button">Delete</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        <button className="comment-button">Comment</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtifactPage;
