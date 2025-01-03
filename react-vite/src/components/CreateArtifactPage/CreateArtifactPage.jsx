import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateArtifact } from "../../redux/artifacts";
import { thunkPostArtifactImage } from "../../redux/artifactImages";
import "./CreateArtifactPage.css";

function CreateArtifactPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form States
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

  // Validation
  const validateForm = () => {
    const formErrors = {};
    if (!title.trim()) formErrors.title = "Title is required.";
    if (!description.trim()) formErrors.description = "Description is required.";
    if (!previewImage || !/\.(jpg|jpeg|png)$/i.test(previewImage))
      formErrors.previewImage = "Preview image URL must end in .jpg, .jpeg, or .png.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newArtifact = await dispatch(
        thunkCreateArtifact({
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

      // Add Preview Image
      await dispatch(
        thunkPostArtifactImage(newArtifact.id, { url: previewImage, preview: true })
      );

      // Add Additional Images
      for (const url of additionalImages) {
        if (url.trim() && /\.(jpg|jpeg|png)$/i.test(url)) {
          await dispatch(thunkPostArtifactImage(newArtifact.id, { url, preview: false }));
        }
      }

      navigate(`/artifacts/${newArtifact.id}`); // Redirect after creation
    } catch (error) {
      console.error("Failed to create artifact:", error);
    }
  };

  // Dynamic Input Handlers
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

  return (
    <div className="create-artifact-container">
      <h1>Create a New Artifact</h1>
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
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Dynamic Inputs */}
        {[
          { label: "Reference Dates", values: referenceDates, setValues: setReferenceDates},
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

        {/* Static Inputs */}
        <div className="form-group">
          <label>Material</label>
          <input
            type="text"
            value={material}
            placeholder="Material"
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Preview Image URL</label>
          <input
            type="text"
            value={previewImage}
            placeholder="Preview Image"
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          {errors.previewImage && <p className="error">{errors.previewImage}</p>}
        </div>
        <div className="form-group">
          <label>Additional Images</label>
          {additionalImages.map((url, index) => (
            <div key={index} className="image-field">
              <input
                type="text"
                value={url}
                placeholder="Additional Images"
                onChange={(e) => {
                  const updatedImages = [...additionalImages];
                  updatedImages[index] = e.target.value;
                  setAdditionalImages(updatedImages);
                }}
              />
              <div className="button-group">
                <button
                  type="button"
                  className="add-button"
                  onClick={() => handleAddInput(setAdditionalImages, additionalImages)}
                >
                  Add Another Image
                </button>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemoveInput(setAdditionalImages, additionalImages, index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">
          Create Artifact
        </button>
      </form>
    </div>
  );
}

export default CreateArtifactPage;
