import { LOAD_MORE, REMOVE_PERSON } from './action-types';
import data from './data';

const initialState = {
  limit: 5,
  users: data
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVE_PERSON:
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.id)
    }
    case LOAD_MORE:
    debugger;
    return {
      ...state,
      limit: state.limit + 5
    }
    default:
      return state;
  }
}
