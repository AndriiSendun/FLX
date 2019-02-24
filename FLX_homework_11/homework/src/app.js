(function () {
  let rootNode = document.getElementById('root');
  const ten = 10;

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

  const header = createNode('header', {
    class: 'header'
  });

  const headerTitle = createNode('h1', {
    class: 'header__title'
  }, 'TODO Cat List');

  const headerAlert = createNode('h4', {
    class: 'header__alert'
  }, 'Maximum item per list are created');

  const headerInput = createNode('input', {
    class: 'header__input',
    type: 'text',
    placeholder: 'Add New Action'
  });

  const btnAdd = createNode('button', {
    class: 'btn btn--add'
  });

  const addIcon = createNode('i', {
    class: 'material-icons'
  }, 'add_box');

  const addContainer = createNode('div', {
    class: 'add-container'
  });

  const headerFragment = document.createDocumentFragment();
  addContainer.appendChild(headerInput);
  addContainer.appendChild(btnAdd);
  btnAdd.appendChild(addIcon);
  headerFragment.appendChild(headerTitle);
  headerFragment.appendChild(headerAlert);
  headerFragment.appendChild(addContainer);

  header.appendChild(headerFragment);

  const main = createNode('main', {
    class: 'main'
  });

  const footer = createNode('footer', {
    class: 'footer'
  });

  const footerImgBox = createNode('div', {
    class: 'footer__img-box'
  });

  const footerImg = createNode('img', {
    class: 'footer__img',
    src: './assets/img/cat.png',
    alt: 'cat-logo'
  });

  footerImgBox.appendChild(footerImg);
  footer.appendChild(footerImgBox);

  const rootFragment = document.createDocumentFragment();

  rootFragment.appendChild(header);
  rootFragment.appendChild(main);
  rootFragment.appendChild(footer);

  rootNode.appendChild(rootFragment);

  function addTodoItem() {
    const todoItem = createNode('div', {
      class: 'todo-item',
      draggable: 'true'
    });

    const todoItemCheckbox = createNode('input', {
      class: 'todo-item__checkbox',
      type: 'checkbox',
      id: new Date().getTime()
    });

    const doneIcon = createNode('i', {
      class: 'material-icons done'
    }, 'done');

    const todoItemLabel = createNode('label', {
      class: 'todo-item__label btn',
      for: new Date().getTime()
    });

    const todoItemDeleteBtn = createNode('button', {
      class: 'btn btn--delete'
    });

    const deleteIcon = createNode('i', {
      class: 'material-icons'
    }, 'delete');

    const todoItemContent = createNode('div', {
      class: 'todo-item__content'
    }, `${headerInput.value}`);

    const todoItemFragment = document.createDocumentFragment();

    todoItemDeleteBtn.appendChild(deleteIcon);
    todoItemFragment.appendChild(todoItemCheckbox);
    todoItemFragment.appendChild(todoItemLabel);
    todoItemFragment.appendChild(todoItemContent);
    todoItemFragment.appendChild(todoItemDeleteBtn);
    todoItemLabel.appendChild(doneIcon);
    todoItem.appendChild(todoItemFragment);

    main.appendChild(todoItem);

    headerInput.value = '';

    if (main.childElementCount === ten) {
      headerAlert.style.display = 'block';
      headerInput.disabled = true;
      btnAdd.disabled = true;
    }
    btnAdd.disabled = true;

    const todolistItems = [...document.querySelectorAll('.todo-item')];
    todolistItems.forEach(addDragEvents);
  }

  function addDragEvents(elem) {
    elem.addEventListener('dragstart', dragStart, false);
    elem.addEventListener('dragover', dragOver, false);
    elem.addEventListener('dragleave', dragLeave, false);
    elem.addEventListener('drop', dragDrop, false);
    elem.addEventListener('dragend', dragEnd, false);
  }

  rootNode.addEventListener('click', eventTracker);

  btnAdd.disabled = true;

  function eventTracker(e) {
    if (e.target.closest('.btn--add') && e.target.parentElement.disabled === false) {
      addTodoItem();
    } else if (e.target.closest('.btn--delete')) {
      deleteTodoItem(e);
    } else if (e.target.closest('.done')) {
      checked(e);
    }
  }

  function deleteTodoItem(e) {
    let itemToDelete = e.target.parentElement.parentElement;
    main.removeChild(itemToDelete);

    if (main.childElementCount < ten) {
      headerAlert.style.display = 'none';
      headerInput.disabled = false;
    }
  }

  headerInput.addEventListener('input', changeTracker);

  function changeTracker() {
    if (!headerInput.value.trim().length) {
      btnAdd.disabled = true;
    } else {
      btnAdd.disabled = false;
    }
  }

  function checked(e) {
    const checkboxTarget = e.target.parentElement.previousSibling;
    if (checkboxTarget.checked) {
      checkboxTarget.disabled = true;
    }
  }

  let dragSource = null;

  function dragStart(e) {
    dragSource = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('drag-item');
  }

  function dragOver(e) {
    e.preventDefault();

    this.classList.add('drag-over');
    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function dragLeave(e) {
    this.classList.remove('drag-over');
  }

  function dragDrop(e) {
    const zero = 0;
    e.stopPropagation();

    if (dragSource !== this) {
      this.parentNode.removeChild(dragSource);
      const dropHTML = e.dataTransfer.getData('text/html');
      this.insertAdjacentHTML('beforebegin', dropHTML);
      const dropElem = this.previousSibling;
      addDragEvents(dropElem);
      const checkbox = dragSource.querySelector('.todo-item__checkbox');
      console.log(checkbox);

      if (checkbox.checked) {
        dropElem.children[zero].checked = true;
      }
    }

    this.classList.remove('drag-over');
    this.classList.remove('drag-item');

    return false;
  }

  function dragEnd(e) {
    this.classList.remove('drag-item');
  }
})();
