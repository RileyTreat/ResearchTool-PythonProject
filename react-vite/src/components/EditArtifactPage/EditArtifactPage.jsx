import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { thunkGetSingleArtifact, thunkUpdateArtifact } from "../../redux/artifacts";
import { thunkPostArtifactImage } from "../../redux/artifactImages";
import "./EditArtifactPage.css";

function EditArtifactPage() {
  const { artifactId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const artifact = useSelector((state) => state.artifacts.singleArtifact);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [referenceDates, setReferenceDates] = useState([""]);
  const [referencePersons, setReferencePersons] = useState([""]);
  const [creators, setCreators] = useState([""]);
  const [places, setPlaces] = useState([""]);
  const [types, setTypes] = useState([""]);
  const [subjects, setSubjects] = useState([""]);
  const [material, setMaterial] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState([""]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetSingleArtifact(artifactId));
  }, [dispatch, artifactId]);

  useEffect(() => {
    if (artifact) {
      setTitle(artifact.title || "");
      setDescription(artifact.description || "");
      setReferenceDates(artifact.referenceDate || [""]);
      setReferencePersons(artifact.referencePerson || [""]);
      setCreators(artifact.creator || [""]);
      setPlaces(artifact.place || [""]);
      setTypes(artifact.types || [""]);
      setSubjects(artifact.subject || [""]);
      setMaterial(artifact.material || "");
      setPreviewImage(
        artifact.images?.find((img) => img.preview)?.url || ""
      );
      setAdditionalImages(
        artifact.images?.filter((img) => !img.preview).map((img) => img.url) || []
      );
    }
  }, [artifact]);

  const validateForm = () => {
    const formErrors = {};
    if (!title.trim()) formErrors.title = "Title is required.";
    if (!description.trim()) formErrors.description = "Description is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(
        thunkUpdateArtifact(artifactId, {
          title,
          description,
          referenceDate: referenceDates,
          referencePerson: referencePersons,
          creator: creators,
          place: places,
          types,
          subject: subjects,
          material,
        })
      );

      if (previewImage) {
        await dispatch(
          thunkPostArtifactImage(artifactId, { url: previewImage, preview: true })
        );
      }
      for (const url of additionalImages) {
        if (url.trim()) {
          await dispatch(
            thunkPostArtifactImage(artifactId, { url, preview: false })
          );
        }
      }

       navigate(`/artifacts/${artifactId}`); // Redirect to the artifact page
    } catch (error) {
      console.error("Failed to update artifact:", error);
    }
  };

  const handleAddInput = (setState, values) => {
    setState([...values, ""]);
  };

  const handleInputChange = (setState, values, index, newValue) => {
    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setState(updatedValues);
  };

  const handleRemoveInput = (setState, values, index) => {
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setState(updatedValues);
  };

  const handleAddImage = () => setAdditionalImages([...additionalImages, ""]);
  const handleRemoveImage = (index) =>
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));

  return (
    <div className="create-artifact-container">
      <h1>Edit Artifact</h1>
      <form onSubmit={handleSubmit} className="artifact-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Dynamic Inputs */}
        {[
          { label: "Reference Dates", values: referenceDates, setValues: setReferenceDates },
          { label: "Reference Persons", values: referencePersons, setValues: setReferencePersons },
          { label: "Creators", values: creators, setValues: setCreators },
          { label: "Places", values: places, setValues: setPlaces },
          { label: "Types", values: types, setValues: setTypes },
          { label: "Subjects", values: subjects, setValues: setSubjects },
        ].map(({ label, values, setValues }) => (
          <div className="form-group" key={label}>
            <label>{label}</label>
            {values.map((value, index) => (
              <div key={index} className="dynamic-input-group">
                <input
                  type="text"
                  value={value}
                  placeholder={label}
                  onChange={(e) =>
                    handleInputChange(setValues, values, index, e.target.value)
                  }
                />
                <div className="button-group">
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => handleAddInput(setValues, values)}
                  >
                    Add Another
                  </button>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveInput(setValues, values, index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="form-group">
          <label>Material</label>
          <input
            type="text"
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Preview Image</label>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Additional Images</label>
          {additionalImages.map((url, index) => (
            <div key={index} className="dynamic-input-group">
              <input
                type="text"
                placeholder="Additional Image URL"
                value={url}
                onChange={(e) =>
                  setAdditionalImages(
                    additionalImages.map((img, i) =>
                      i === index ? e.target.value : img
                    )
                  )
                }
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={handleAddImage}>
            Add Another Image
          </button>
        </div>

        <button type="submit" className="submit-button">
          Update Artifact
        </button>
      </form>
    </div>
  );
}

export default EditArtifactPage;
