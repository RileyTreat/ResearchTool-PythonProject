const SET_QUESTIONS = 'questions/setQuestions';
const ADD_QUESTION = 'questions/addQuestion';
const UPDATE_QUESTION = 'questions/updateQuestion';
const DELETE_QUESTION = 'questions/deleteQuestion';

// Action Creators
const setQuestions = (questions) => ({ type: SET_QUESTIONS, questions });
const addQuestion = (question) => ({ type: ADD_QUESTION, question });
const updateQuestion = (question) => ({ type: UPDATE_QUESTION, question });
const deleteQuestion = (questionId) => ({ type: DELETE_QUESTION, questionId });

// Thunks
export const thunkGetQuestionsByArtifact = (artifactId) => async (dispatch) => {
    const response = await fetch(`/api/artifacts/${artifactId}/questions`);
    if (response.ok) {
        const questions = await response.json();
        dispatch(setQuestions(questions));
    }
};

export const thunkCreateQuestion = (artifactId, questionData) => async (dispatch) => {
    const response = await fetch(`/api/artifacts/${artifactId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
    });
    if (response.ok) {
        const newQuestion = await response.json();
        console.log('New Question:', newQuestion);
        dispatch(addQuestion(newQuestion));
    }  else {
        console.error('Failed to create question:', await response.json());
    }
};

export const thunkUpdateQuestion = (questionId, questionData) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
    });
    if (response.ok) {
        const updatedQuestion = await response.json();
        dispatch(updateQuestion(updatedQuestion));
    }
};

export const thunkDeleteQuestion = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteQuestion(questionId));
    }
};

// Initial State
const initialState = [];

// Reducer
export default function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return action.questions;
        case ADD_QUESTION:
            console.log('Questions before adding:', state);
            console.log('Adding question:', action.question);
            return [action.question, ...state];
        case UPDATE_QUESTION:
            return state.map((q) => (q.id === action.question.id ? action.question : q));
        case DELETE_QUESTION:
            return state.filter((q) => q.id !== action.questionId);
        default:
            return state;
    }
}
