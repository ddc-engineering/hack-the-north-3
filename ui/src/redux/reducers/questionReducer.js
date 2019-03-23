import * as types from "../constants/actionTypes";

const initialState = {
  ready: true,
  pageView: {
    page: null,
    id: 1,
    title: "Slinky ques",
    hint: "The questions page",
    questions: [
      {
        title: "True or False",
        hint: "This is a test radio hint",
        type: "binary",
        name: "gender",
        inline: "true",
        options: [
          { id: 1, value: "male", hint: "male hint", text: "Male" },
          { id: 2, value: "female", hint: "female hint", text: "Female" }
        ],
        next: [{ option: 1, question: 2 }, { option: 2, question: 2 }]
      }
    ],
    sessionId: "a6c365df-69eb-4b81-907e-25d6f856fe0f"
  }
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_QUESTIONNAIRE:
      console.log(JSON.stringify(action.payload));
    // return { ...state, ready: true, pageView: action.payload };
    case types.NEXT_QUESTION:
      console.log(action.payload);

    // return { ...state, pageView: action.payload };
    default:
      return state;
  }
};

export default questionReducer;
