import { createStore } from 'redux';
import { GET_BLOCK } from './actions';

const initialState = {
  subjectType: []
};
export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_BLOCK:
      return {
        ...state,
        block: action?.data
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
