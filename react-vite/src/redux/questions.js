const SET_QUESTIONS = 'questions/setQuestions';
const ADD_QUESTION = 'questions/addQuestion';
const UPDATE_QUESTION = 'questions/updateQuestion';
const DELETE_QUESTION = 'questions/deleteQuestion';
const SET_USER_QUESTIONS = 'questions/setUserQuestions'; // New Action

// Action Creators
const setQuestions = (questions) => ({ type: SET_QUESTIONS, questions });
const setUserQuestions = (questions) => ({ type: SET_USER_QUESTIONS, questions }); // New Action Creator
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

export const thunkGetUserQuestions = () => async (dispatch) => {
    const response = await fetch(`/api/questions/current`);
    if (response.ok) {
        const questions = await response.json();
        dispatch(setUserQuestions(questions)); // Dispatch the user-specific questions
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
    } else {
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
const initialState = {
    allQuestions: [], // For questions related to specific artifacts
    userQuestions: [], // For user-specific questions
};

// Reducer
export default function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return { ...state, allQuestions: action.questions }; 
        case SET_USER_QUESTIONS:
            return { ...state, userQuestions: action.questions }; 
        case ADD_QUESTION:
            return { ...state, allQuestions: [action.question, ...state.allQuestions] }; 
        case UPDATE_QUESTION:
            return {
                ...state,
                allQuestions: state.allQuestions.map((q) =>
                    q.id === action.question.id ? action.question : q
                ),
            }; 
        case DELETE_QUESTION:
            return {
                ...state,
                allQuestions: state.allQuestions.filter((q) => q.id !== action.questionId), 
            };
        default:
            return state;
    }
}
