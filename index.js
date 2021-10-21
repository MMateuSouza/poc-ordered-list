(function () {
  let chaptersObject = document.querySelector('#chapters');
  let chaptersQuantity = chaptersObject.querySelectorAll('li');
  let addChapterButton = document.querySelector('#add-chapter');
  let convertChapterButton = document.querySelector('#convert-chapter');

  // Nova visualização
  if (chaptersQuantity.length === 0) {
    addNewChapter();
  }

  addChapterButton.addEventListener('click', () => addNewChapter());
  convertChapterButton.addEventListener('click', () => getConvertedChapter());

  function createElement(tag, classList) {
    if (typeof tag !== 'string' || typeof classList !== 'object') {
      return;
    }

    let element = document.createElement(tag);
    classList.forEach((cls) => element.classList.add(cls));

    return element;
  }

  function getListItemElement() {
    return createElement('li', ['list-group-item', 'border-0']);
  }

  function getDivElement() {
    return createElement('div', ['input-group', 'input-group-sm']);
  }

  function getInputElement() {
    return createElement('input', ['form-control']);
  }

  function getButtonWithIcon(iconClass) {
    let icon = createElement('i', ['bi', iconClass]);
    let button = createElement('button', ['btn', 'btn-outline-secondary']);
    button.append(icon);

    return button;
  }

  function createButtonWithFunction(iconClass, func) {
    if (typeof iconClass !== 'string' || typeof func !== 'function') {
      return;
    }

    let button = getButtonWithIcon(iconClass);
    button.onclick = func;

    return button;
  }

  function getRemoveButtonElement() {
    return createButtonWithFunction('bi-trash', removeChapter);
  }

  function getAddButtonElement() {
    return createButtonWithFunction('bi-plus', addNewSubchapter);
  }

  function getOrderedListElement() {
    return createElement('ol', ['list-group', 'list-group-numbered']);
  }

  function createListItemElement() {
    let listItemElement = getListItemElement();
    let divElement = getDivElement();
    let inputTitleElement = getInputElement();
    let removeButtonElement = getRemoveButtonElement();
    let addButtonElement = getAddButtonElement();
    let orderedListElement = getOrderedListElement();

    divElement.append(inputTitleElement);
    divElement.append(removeButtonElement);
    divElement.append(addButtonElement);
    listItemElement.append(divElement);
    listItemElement.append(orderedListElement);

    return listItemElement;
  }

  function addNewChapter() {
    let listItemElement = createListItemElement();
    chaptersObject.append(listItemElement);
  }

  function convertChapter(element) {
    let chapters = [];
    let orderedListElement = element;

    let listItem = orderedListElement.querySelector('li:first-child');

    while (listItem) {
      let insideOrderedListElement = listItem.querySelector('ol');
      let subchapters = convertChapter(insideOrderedListElement);

      let chapterInputElement = listItem.querySelector('input');
      let chapterTitle = chapterInputElement.value;
      let chapter = {};
      chapter.title = chapterTitle;
      chapter.subchapters = subchapters;
      chapters.push(chapter);

      listItem.remove();
      listItem = orderedListElement.querySelector('li:first-child');
    }

    return chapters;
  }

  function getConvertedChapter() {
    let orderListObject = document.querySelector('#chapters');
    let chapters = convertChapter(orderListObject.cloneNode(true));
    console.log(chapters);
  }

  function getParentNode(event) {
    let parentNode;

    switch (event.target.tagName) {
      case 'I':
        parentNode = event.target.parentNode.parentNode.parentNode;
        break;
      case 'BUTTON':
        parentNode = event.target.parentNode.parentNode;
        break;
    }

    return parentNode;
  }

  function addNewSubchapter(event) {
    let parentNode = getParentNode(event);

    if (parentNode) {
      let orderedListElement = parentNode.querySelector('ol');
      let listItemElement = createListItemElement();

      orderedListElement.append(listItemElement);
    }
  }

  function removeChapter(event) {
    let parentNode = getParentNode(event);

    if (parentNode && confirm('Você deseja remover o capítulo? Lembre-se que os subcapítulos serão removidos.')) {
      parentNode.remove();
    }
  }
})();