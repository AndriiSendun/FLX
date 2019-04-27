import {store} from './store';
import {removePerson, loadMore} from './redux-js/actions';

import {personTemplate} from './components/person-template';
import {displayPersonsCount} from './components/person-counter';
import './style.scss';

const tableBody = document.querySelector('.table__body');
const wrapper = document.querySelector('.wrapper');
const searchInput = document.querySelector('.header__search');

makeDesign();
displayPersonsCount();

function makeDesign() {
  let usersArr = store.getState().users;
  const filteredArr = usersArr.filter((user) => user.name.indexOf(searchInput.value) !== -1);
  const limit = getLimit(filteredArr);
  let viewArr = [];

  for (let i = 0; i < limit; i++) {
    viewArr.push(personTemplate(filteredArr[i]));
  }

  tableBody.innerHTML = viewArr.join();
}

export function getLimit(arr) {
  return (store.getState().limit > arr.length) ? arr.length : store.getState().limit;
}

store.subscribe(makeDesign);
store.subscribe(displayPersonsCount);

wrapper.addEventListener('click', (e) => {
  if(e.target.closest('.btn--remove')) {
    store.dispatch(removePerson(e.target.parentElement.parentElement.id));
  } else if (e.target.closest('.btn--load-more')) {
    store.dispatch(loadMore());
  }
});

searchInput.addEventListener('keyup', () => {
  makeDesign();
})
