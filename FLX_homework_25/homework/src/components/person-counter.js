import {store} from '../store';
import {getLimit} from '../index';

const personCounter = document.querySelector('.person-counter');

export function displayPersonsCount() {
  personCounter.innerHTML = `Displayed ${getLimit(store.getState().users)} users out of ${store.getState().users.length}`;
}
