const SET_ARTIFACTS = 'artifacts/setArtifacts';
const SET_SINGLE_ARTIFACT = 'artifacts/setSingleArtifact';
const ADD_ARTIFACT = 'artifacts/addArtifact';
const UPDATE_ARTIFACT = 'artifacts/updateArtifact';
const DELETE_ARTIFACT = 'artifacts/deleteArtifact';
const SET_USER_ARTIFACTS = 'artifacts/setUserArtifacts';

// Action Creators
const setArtifacts = (artifacts) => ({ type: SET_ARTIFACTS, artifacts });
const setSingleArtifact = (artifact) => ({ type: SET_SINGLE_ARTIFACT, artifact });
const addArtifact = (artifact) => ({ type: ADD_ARTIFACT, artifact });
const updateArtifact = (artifact) => ({ type: UPDATE_ARTIFACT, artifact });
const deleteArtifact = (artifactId) => ({ type: DELETE_ARTIFACT, artifactId });
const setUserArtifacts = (artifacts) => ({ type: SET_USER_ARTIFACTS, artifacts });

// Thunks
export const thunkGetArtifacts = () => async (dispatch) => {
    const response = await fetch('/api/artifacts');
    if (response.ok) {
        const artifacts = await response.json();
        dispatch(setArtifacts(artifacts));
    }
};

export const thunkGetSingleArtifact = (artifactId) => async (dispatch) => {
    const response = await fetch(`/api/artifacts/${artifactId}`);
    if (response.ok) {
        const artifact = await response.json();
        dispatch(setSingleArtifact(artifact));
    }
};

export const thunkCreateArtifact = (artifactData) => async (dispatch) => {
    const response = await fetch('/api/artifacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artifactData),
    });
    if (response.ok) {
        const newArtifact = await response.json();
        dispatch(addArtifact(newArtifact));
    }
};

export const thunkUpdateArtifact = (artifactId, artifactData) => async (dispatch) => {
    const response = await fetch(`/api/artifacts/${artifactId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artifactData),
    });
    if (response.ok) {
        const updatedArtifact = await response.json();
        dispatch(updateArtifact(updatedArtifact));
    }
};

export const thunkDeleteArtifact = (artifactId) => async (dispatch) => {
    const response = await fetch(`/api/artifacts/${artifactId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteArtifact(artifactId));
    }
};

// Thunk to Get User-Specific Artifacts
export const thunkGetUserArtifacts = () => async (dispatch) => {
    const response = await fetch('/api/artifacts/current'); // Adjust the endpoint if necessary
    if (response.ok) {
        const artifacts = await response.json();
        dispatch(setUserArtifacts(artifacts));
    }
};

// Initial State
const initialState = { allArtifacts: [], singleArtifact: null, userArtifacts: [] };

// Reducer
export default function artifactsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ARTIFACTS:
            return { ...state, allArtifacts: action.artifacts };
        case SET_SINGLE_ARTIFACT:
            return { ...state, singleArtifact: action.artifact };
        case ADD_ARTIFACT:
            return { ...state, allArtifacts: [...state.allArtifacts, action.artifact] };
        case UPDATE_ARTIFACT:
            return {
                ...state,
                allArtifacts: state.allArtifacts.map((artifact) =>
                    artifact.id === action.artifact.id ? action.artifact : artifact
                ),
                singleArtifact:
                    state.singleArtifact?.id === action.artifact.id
                        ? action.artifact
                        : state.singleArtifact,
            };
        case DELETE_ARTIFACT:
            return {
                ...state,
                allArtifacts: state.allArtifacts.filter((artifact) => artifact.id !== action.artifactId),
                singleArtifact:
                    state.singleArtifact?.id === action.artifactId ? null : state.singleArtifact,
            };
        case SET_USER_ARTIFACTS:
                return { ...state, userArtifacts: action.artifacts };
        default:
            return state;
    }
}
