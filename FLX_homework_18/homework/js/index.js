const serverUrl = 'https://jsonplaceholder.typicode.com';
const root = document.getElementById('root');
const spinner = document.querySelector('.spinner');
const posts = document.querySelector('.posts');
const postsBox = document.querySelector('.posts__container');
const comments = document.querySelector('.comments');
const commentsBox = document.querySelector('.comments__container');
const btnToUsers = document.querySelector('.btn-to-users');
let currentData;
const endpoints = {
  USERS: '/users',
  POSTS: '/posts',
  COMMENTS: '/comments'
};

function defaultFailureCallback(xhr) {
  console.error(xhr.response);
}

function request({
  url,
  successCallback,
  failureCallback = defaultFailureCallback,
  method = 'GET',
  body = null
}) {
  let xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

  show([spinner]);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const users = JSON.parse(xhr.responseText);
      successCallback(users);
    } else {
      failureCallback(xhr);
    }

    hide([spinner]);
  };

  xhr.send(body);
}

request({
  url: `${serverUrl}${endpoints.USERS}`,
  successCallback: getCats
});

function getCats(users) {
  const mergedUsers = users.map(user => {
    return fetch('https://api.thecatapi.com/v1/images/search?size=full')
    .then(response => response.json())
    .then(([cat]) => {
      return {
        ...user,
        url: cat.url
      }
    });
  });

  Promise.all(mergedUsers).then(makeUsersList);
}

function makeUsersList(data) {
  root.innerHTML = data.map(userCardTemplate).join('');
}

function userCardTemplate({
  id,
  name,
  company,
  address,
  url
}) {
  return `
  <div class="user d-flex" data-user-id=${id} id="${id}">
    <div class="user__main-info d-flex">
      <div class="avatar">
      <img class="avatar__img" src="${url}"></img>
        <div class="spinner-wrapper">
          <div class="spinner"></div>
        </div>
      </div>
      <a class="user__link" href="#/postandcomments/${id}">
        <input class="input user-name" type="text" value="${name}" disabled>
      </a>
    </div>
    <div class="user__additional-info">
      <button data-action="deleteUserRequest" class="btn btn--delete">Delete</button>
      <div class="address">
        <span class="address__title address__title--main">Address:</span>
        <div class="address__info">
          <div><span class="address__title">street: </span><input class="input address__street" type="text" value="${address.street}" disabled></div>
          <div><span class="address__title">suite: </span><input class="input address__suite" type="text" value="${address.suite}" disabled></div>
          <div><span class="address__title">city: </span><input class="input address__city" type="text" value="${address.city}" disabled></div>
        </div>
        </div>
      <div class="company"><span class="company__title">Company:</span> <input class="input company__name" type="text" value="${company.name}" disabled></div>
      <div class="btn-container d-flex">
        <button data-action="saveUserRequest" class="btn btn--save" disabled>Save</button>
        <button data-action="editUser" class="btn btn--edit">Edit</button>
        <button data-action="cancel" class="btn btn--cancel">Cancel</button>
      </div>
    </div>
  </div>
  `;
}

root.addEventListener('click', eventHandler);

function eventHandler(e) {
  const { userId: id } = e.target.closest('[data-user-id]').dataset;
  const { action } = e.target.closest('[data-action]').dataset;
  window[action](id);
}

function deleteUserRequest(id) {
  request({
    url: `${serverUrl}${endpoints.USERS}/${id}`,
    method: 'DELETE',
    successCallback: deleteUser.bind(null, id)
  });
}

function deleteUser(id) {
  const deleteUser = document.getElementById(`${id}`);
  root.removeChild(deleteUser);
}

function editUser(id) {
  const editedUser = document.getElementById(`${id}`);
  const { btnSave, btnCancel, btnEdit } = getBtn(editedUser);
  const {
    userInputs,
    userName,
    street,
    suite,
    city,
    companyName
  } = getInputs(editedUser);

  btnSave.disabled = false;

  show([btnCancel]);
  hide([btnEdit]);
  userLinkAddDisable(editedUser);

  btnSave.classList.add('btn-active');

  for (let i = 0; i < userInputs.length; i++) {
    userInputs[i].disabled = false;
    userInputs[i].classList.add('input--active');
  }

  currentData = {
    id,
    name: userName.value,
    address: {
      street: street.value,
      suite: suite.value,
      city: city.value
    },
    company: {
      name: companyName.value
    }
  };
}

function saveUserRequest(id) {
  const editedUser = document.getElementById(`${id}`);
  const {
    userName,
    street,
    suite,
    city,
    companyName
  } = getInputs(editedUser);

  const data = {
    id,
    name: userName.value,
    address: {
      street: street.value,
      suite: suite.value,
      city: city.value
    },
    company: {
      name: companyName.value
    }
  };

  userLinkRemoveDisable(editedUser);

  request({
    url: `${serverUrl}${endpoints.USERS}/${id}`,
    method: 'PUT',
    successCallback: saveUser,
    body: JSON.stringify(data)
  });
}

function saveUser({ id }) {
  inputDisable(id);
}

function cancel(id) {
  const editedUser = document.getElementById(`${id}`);
  const {
    userName,
    street,
    suite,
    city,
    companyName
  } = getInputs(editedUser);

  userName.value = currentData.name;
  street.value = currentData.address.street;
  suite.value = currentData.address.suite;
  city.value = currentData.address.city;
  companyName.value = currentData.company.name;

  inputDisable(id);
  userLinkRemoveDisable(editedUser);
  currentData = null;
}

function inputDisable(id) {
  const editedUser = document.getElementById(`${id}`);
  const { btnSave, btnCancel, btnEdit } = getBtn(editedUser);
  const { userInputs } = getInputs(editedUser);

  btnSave.disabled = true;

  show([btnEdit]);
  hide([btnCancel]);
  for (let i = 0; i < userInputs.length; i++) {
    userInputs[i].disabled = true;
    userInputs[i].classList.remove('input--active');
  }
}

function getBtn(nodeItem) {
  const btnSave = nodeItem.querySelector('.btn--save');
  const btnCancel = nodeItem.querySelector('.btn--cancel');
  const btnEdit = nodeItem.querySelector('.btn--edit');

  return {
    btnSave,
    btnCancel,
    btnEdit
  };
}

function getInputs(nodeItem) {
  const userInputs = nodeItem.querySelectorAll('.input');
  const userName = nodeItem.querySelector('.user-name');
  const street = nodeItem.querySelector('.address__street');
  const suite = nodeItem.querySelector('.address__suite');
  const city = nodeItem.querySelector('.address__city');
  const companyName = nodeItem.querySelector('.company__name');

  return {
    userInputs,
    userName,
    street,
    suite,
    city,
    companyName
  };
}

function postAndComment(id) {
  request({
    url: `${serverUrl}${endpoints.POSTS}?userId=${id}`,
    successCallback: getPosts
  });
  request({
    url: `${serverUrl}${endpoints.COMMENTS}?postId=${id}`,
    successCallback: getComments
  });
}

function getPosts(data) {
  postsBox.innerHTML = data.map(postsTemplate).join('');
}

function getComments(data) {
  commentsBox.innerHTML = data.map(commentsTemplate).join('');
}

function show(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'block';
  }
}

function hide(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'none';
  }
}

function postsTemplate({ title, body }) {
  return `
  <article class="post">
    <h3 class="post__title">${title}</h3>
    <div class="post__description">${body}</div>
  </article>
  `;
}

function commentsTemplate({ name, body }) {
  return `
  <article class="comment">
    <h3 class="comment__title">${name}</h3>
    <div class="comment__description">${body}</div>
  </article>
  `;
}

window.addEventListener('hashchange', function (e) {
  const hashLocation = window.location.hash;
  const id = hashLocation.split('/').pop();
  const regExp = /#\/postandcomments\/\d+/g;

  if (hashLocation.match(regExp)) {
    postAndComment(id);
    show([comments, posts, btnToUsers]);
    hide([root]);
  } else {
    hide([comments, posts, btnToUsers]);
    show([root]);
  }
});

function disableLink (e) {
  e.preventDefault();
}

function userLinkAddDisable(target) {
  const userLink = target.querySelector('.user__link');
  userLink.addEventListener('click', disableLink);
}

function userLinkRemoveDisable(target) {
  const userLink = target.querySelector('.user__link');
  userLink.removeEventListener('click', disableLink);
}

document.addEventListener('load', ({ target }) => {
  if (target.tagName !== 'IMG') { return; }
  target
    .closest('.avatar')
    .querySelector('.spinner-wrapper')
    .remove();
}, true);
