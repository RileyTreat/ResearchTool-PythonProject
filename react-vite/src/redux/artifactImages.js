// artifactImages.js

// Action Types
const ADD_ARTIFACT_IMAGE = "artifactImages/addArtifactImage";
const DELETE_ARTIFACT_IMAGE = "artifactImages/deleteArtifactImage";
const UPDATE_ARTIFACT_IMAGE = "artifactImages/updateArtifactImage";

// Action Creators
export const addArtifactImage = (image) => ({
    type: ADD_ARTIFACT_IMAGE,
    image,
});

export const deleteArtifactImage = (imageId) => ({
    type: DELETE_ARTIFACT_IMAGE,
    imageId,
});

export const updateArtifactImage = (image) => ({
    type: UPDATE_ARTIFACT_IMAGE,
    image,
});

// Thunks
export const thunkPostArtifactImage = (artifactId, imageData) => async (dispatch) => {
    const response = await fetch(`/api/artifacts/${artifactId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imageData),
    });

    if (response.ok) {
        const newImage = await response.json();
        dispatch(addArtifactImage(newImage));
        return newImage;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
    }
};

export const thunkDeleteArtifactImage = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/artifact-images/${imageId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteArtifactImage(imageId));
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete image");
    }
};

export const thunkUpdateArtifactImage = (imageId, imageData) => async (dispatch) => {
    const response = await fetch(`/api/artifact-images/${imageId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imageData),
    });

    if (response.ok) {
        const updatedImage = await response.json();
        dispatch(updateArtifactImage(updatedImage));
        return updatedImage;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update image");
    }
};

// Initial State
const initialState = {
    artifactImages: [],
};

// Reducer
export default function artifactImagesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTIFACT_IMAGE:
            return {
                ...state,
                artifactImages: [...state.artifactImages, action.image],
            };
        case DELETE_ARTIFACT_IMAGE:
            return {
                ...state,
                artifactImages: state.artifactImages.filter((image) => image.id !== action.imageId),
            };
        case UPDATE_ARTIFACT_IMAGE:
            return {
                ...state,
                artifactImages: state.artifactImages.map((image) =>
                    image.id === action.image.id ? action.image : image
                ),
            };
        default:
            return state;
    }
}
