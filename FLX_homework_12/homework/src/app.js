(function () {
  const rootNode = document.getElementById('root');

  const storageKey = 'tasks';
  const zero = 0;

  function createNode(tag, attribute, content) {
    const element = document.createElement(tag);

    if (attribute) {
      for (let key in attribute) {
        if (attribute.hasOwnProperty(key)) {
          element.setAttribute(key, attribute[key]);
        }
      }
    }

    if (content) {
      let text = document.createTextNode(content);
      element.appendChild(text);
    }

    return element;
  }

  window.addEventListener('hashchange', showPage);

  function showPage() {
    const hashLocation = window.location.hash;
    const hashRegExp = /#\/modify\/\d+/gi;
    if (hashLocation === '') {
      mainPageTemplate();
    } else if (hashLocation === '#/add') {
      addTaskPage();
    } else if (hashLocation.match(hashRegExp)) {
      modifyPage();
    }
  }

  showPage();

  function mainPageTemplate() {
    const mainPage = createNode('section', {
      class: 'main-page'
    });

    const mainPageTitle = createNode('h1', {
      class: 'title'
    }, 'Simple TODO application');

    const addBtn = createNode('a', {
      class: 'link btn btn--add',
      href: '#/add'
    }, 'Add new task');

    const tasksContainer = createNode('div', {
      class: 'todo-tasks-container',
      id: 'tasks-container'
    });

    const notification = createNode('h2', {
      class: 'notification'
    }, 'TODO is empty');

    const mainPageFragment = document.createDocumentFragment();

    mainPageFragment.appendChild(mainPageTitle);
    mainPageFragment.appendChild(addBtn);
    mainPageFragment.appendChild(notification);
    mainPageFragment.appendChild(tasksContainer);
    mainPage.appendChild(mainPageFragment);

    changeTemplate(mainPage);
    printTasks();
  }

  function addTaskPage() {
    const addTaskPageTitle = createNode('h1', {
      class: 'title'
    }, 'Add task');

    const taskInput = createNode('input', {
      class: 'input'
    });

    const buttonContainer = createNode('div', {
      class: 'btn-container'
    });

    const cancelBtn = createNode('a', {
      class: 'link btn btn--cancel',
      href: '#'
    }, 'Cancel');

    const saveBtn = createNode('a', {
      class: 'link btn btn--save',
      href: '#'
    }, 'Save changes');

    const taskPageFragment = document.createDocumentFragment();
    taskPageFragment.appendChild(addTaskPageTitle);
    taskPageFragment.appendChild(taskInput);
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(saveBtn);
    taskPageFragment.appendChild(buttonContainer);

    changeTemplate(taskPageFragment);

    saveBtn.addEventListener('click', function () {
      saveTask(taskInput.value);
    });
  }

  function modifyPage() {
    const id = window.location.hash.split('/').pop();
    const savedItems = parseStorage();
    const taskIndex = findTaskIndex(savedItems, id);

    const modifyPageTitle = createNode('h1', {
      class: 'title'
    }, 'Modify item');

    const taskInput = createNode('input', {
      class: 'input',
      value: savedItems[taskIndex].description
    });

    const buttonContainer = createNode('div', {
      class: 'btn-container'
    });

    const cancelBtn = createNode('a', {
      class: 'link btn btn--cancel',
      href: '#'
    }, 'Cancel');

    const saveBtn = createNode('a', {
      class: 'link btn btn--save',
      href: '#'
    }, 'Save change');

    const modifyPageFragment = document.createDocumentFragment(modifyPageTitle);
    modifyPageFragment.appendChild(modifyPageTitle);
    modifyPageFragment.appendChild(taskInput);
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(saveBtn);
    modifyPageFragment.appendChild(buttonContainer);

    changeTemplate(modifyPageFragment);

    saveBtn.addEventListener('click', function () {
      savedItems[taskIndex].description = taskInput.value;
      stringifyStorage(savedItems);
    });
  }

  function todoItemTemplate(task) {
    const taskItem = createNode('div', {
      class: 'task',
      id: task.id
    });

    const checkboxInput = createNode('input', {
      class: 'task__checkbox',
      type: 'checkbox'
    });

    const taskLabel = createNode('label', {
      class: 'task__label'
    });

    const checkImg = createNode('img', {
      class: 'task__img-check',
      src: task.isDone ? './assets/img/done-s.png' : './assets/img/todo-s.png'
    });

    const taskItemContent = createNode('a', {
      class: 'task__item-content link',
      href: task.isDone ? `javascript:void(0)` : `#/modify/${task.id}`
    }, task.description);

    const deleteImg = createNode('img', {
      class: 'task__delete-img',
      src: './assets/img/remove-s.jpg'
    });

    taskItemContent.style.background = task.isDone ? '#808080' : '#fff';

    taskItem.appendChild(checkboxInput);
    taskItem.appendChild(taskLabel);
    taskLabel.appendChild(checkImg);
    taskItem.appendChild(taskItemContent);
    taskItem.appendChild(deleteImg);

    checkImg.addEventListener('click', function (e) {
      checkTask(e.target.parentElement.parentElement.id);
    });

    deleteImg.addEventListener('click', function (e) {
      deleteTask(e.target.parentElement.id);
    });

    return taskItem;
  }

  function checkTask(id) {
    const savedItems = parseStorage();
    const taskIndex = findTaskIndex(savedItems, id);

    if (!savedItems[taskIndex].isDone) {
      const removed = savedItems.splice(taskIndex, 1)[zero];
      removed.isDone = true;
      savedItems.push(removed);
      stringifyStorage(savedItems);
    }

    printTasks();
  }

  function changeTemplate(template) {
    rootNode.innerHTML = '';
    rootNode.appendChild(template);
  }

  function saveTask(value) {
    const task = {
      isDone: false,
      id: new Date().getTime(),
      description: value
    };

    const savedItems = parseStorage() || [];
    const doneTaskIndex = savedItems.findIndex(task => task.isDone);

    if (~doneTaskIndex) {
      savedItems.splice(doneTaskIndex, zero, task);
    } else {
      savedItems.push(task);
    }

    stringifyStorage(savedItems);
  }

  function parseStorage() {
    const savedItems = JSON.parse(localStorage.getItem(storageKey));
    return savedItems;
  }

  function stringifyStorage(savedItems) {
    localStorage.setItem(storageKey, JSON.stringify(savedItems));
  }

  function findTaskIndex(arr, id) {
    return arr.findIndex(task => id === task.id.toString());
  }

  function deleteTask(id) {
    const savedItems = parseStorage();
    const taskIndex = findTaskIndex(savedItems, id);
    savedItems.splice(taskIndex, 1);
    stringifyStorage(savedItems);

    printTasks();
  }

  function printTasks() {
    const fragment = document.createDocumentFragment();
    const savedItems = parseStorage();
    const container = document.getElementById('tasks-container');
    const notification = document.querySelector('.notification');
    container.innerHTML = '';

    if (savedItems && savedItems.length) {
      savedItems.forEach(function (task) {
        fragment.appendChild(todoItemTemplate(task));
      });
      container.appendChild(fragment);
      notification.style.display = 'none';
    } else {
      notification.style.display = 'block';
    }
  }

})();
