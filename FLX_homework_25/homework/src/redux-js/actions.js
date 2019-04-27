import { LOAD_MORE, REMOVE_PERSON, SEARCH } from './action-types';
import {store} from '../store';


export const removePerson = (id) => {
  return {
    type: REMOVE_PERSON,
    id
  }
}


export const loadMore = () =>  {
  return {
    type: LOAD_MORE,
  }

}

export const searchPerson = (text) => ({
  type: SEARCH,
  text
});
