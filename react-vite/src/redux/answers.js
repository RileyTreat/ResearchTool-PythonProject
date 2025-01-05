// Action Types
const SET_ANSWERS = 'answers/setAnswers';
const ADD_ANSWER = 'answers/addAnswer';
const UPDATE_ANSWER = 'answers/updateAnswer';
const DELETE_ANSWER = 'answers/deleteAnswer';

// Action Creators
const setAnswers = (answers) => ({
  type: SET_ANSWERS,
  answers,
});

const addAnswer = (answer) => ({
  type: ADD_ANSWER,
  answer,
});

const updateAnswer = (answer) => ({
  type: UPDATE_ANSWER,
  answer,
});

const deleteAnswer = (answerId) => ({
  type: DELETE_ANSWER,
  answerId,
});

// Thunks
export const thunkGetAnswersByArtifact = (artifactId) => async (dispatch) => {
  const response = await fetch(`/api/artifacts/${artifactId}/answers`);
  if (response.ok) {
    const answers = await response.json();
    dispatch(setAnswers(answers));
  }
};

export const thunkGetAnswersByQuestion = (questionId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}/answers`);
  if (response.ok) {
    const answers = await response.json();
    dispatch(setAnswers(answers));
  }
};

export const thunkCreateAnswer = (questionId, answerData) => async (dispatch) => {
  const response = await fetch(`/api/questions/${questionId}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answerData),
  });
  if (response.ok) {
    const newAnswer = await response.json();
    dispatch(addAnswer(newAnswer));
  }
};

export const thunkUpdateAnswer = (answerId, answerData) => async (dispatch) => {
  const response = await fetch(`/api/answers/${answerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answerData),
  });
  if (response.ok) {
    const updatedAnswer = await response.json();
    dispatch(updateAnswer(updatedAnswer));
  }
};

export const thunkDeleteAnswer = (answerId) => async (dispatch) => {
  const response = await fetch(`/api/answers/${answerId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteAnswer(answerId));
  }
};

export const thunkGetUserAnswers = () => async (dispatch) => {
  const response = await fetch(`/api/answers/current`);
  if (response.ok) {
      const userAnswers = await response.json();
      dispatch(setAnswers(userAnswers)); 
  }
};


// Initial State
const initialState = [];

// Reducer
export default function answersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ANSWERS:
      return action.answers;
    case ADD_ANSWER:
      return [...state, action.answer];
    case UPDATE_ANSWER:
      return state.map((answer) =>
        answer.id === action.answer.id ? action.answer : answer
      );
    case DELETE_ANSWER:
      return state.filter((answer) => answer.id !== action.answerId);
    default:
      return state;
  }
}
