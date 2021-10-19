(function () {
  let chaptersObject = document.querySelector('#chapters');
  let chaptersQuantity = chaptersObject.querySelectorAll('li');
  let addChappterButton = document.querySelector('#add-chapter');

  // Nova visualização
  if (chaptersQuantity.length === 0) {
    addNewChapter();
  }

  addChappterButton.addEventListener('click', () => addNewChapter());

  function createListItemElement() {
    let listItemElement = document.createElement('li');
    listItemElement.classList.add('list-group-item');
    listItemElement.classList.add('border-0');

    let divElement = document.createElement('div');
    divElement.classList.add('input-group');
    divElement.classList.add('input-group-sm');

    let inputTitleElement = document.createElement('input');
    inputTitleElement.classList.add('form-control');

    let trashIconElement = document.createElement('i');
    trashIconElement.classList.add('bi');
    trashIconElement.classList.add('bi-trash');

    let removeButtonElement = document.createElement('button');
    removeButtonElement.onclick = removeChapter;
    removeButtonElement.classList.add('btn');
    removeButtonElement.classList.add('btn-outline-secondary');
    removeButtonElement.append(trashIconElement);

    let plusIconElement = document.createElement('i');
    plusIconElement.classList.add('bi');
    plusIconElement.classList.add('bi-plus');

    let addButtonElement = document.createElement('button');
    addButtonElement.onclick = addNewSubchapter;
    addButtonElement.classList.add('btn');
    addButtonElement.classList.add('btn-outline-secondary');
    addButtonElement.append(plusIconElement);

    let orderedListElement = document.createElement('ol');
    orderedListElement.classList.add('list-group');
    orderedListElement.classList.add('list-group-numbered');

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

  function addNewSubchapter(event) {
    let parentNode;

    switch (event.target.tagName) {
      case 'I':
        parentNode = event.target.parentNode.parentNode.parentNode;
        break;
      case 'BUTTON':
        parentNode = event.target.parentNode.parentNode;
        break;
    }

    if (parentNode) {
      let orderedListElement = parentNode.querySelector('ol');
      let listItemElement = createListItemElement();

      orderedListElement.append(listItemElement);
    }
  }

  function removeChapter(event) {
    let parentNode;

    switch (event.target.tagName) {
      case 'I':
        parentNode = event.target.parentNode.parentNode.parentNode;
        break;
      case 'BUTTON':
        parentNode = event.target.parentNode.parentNode;
        break;
    }

    if (parentNode && confirm('Você deseja remover o capítulo? Lembre-se que os subcapítulos vão pro saco.')) {
      parentNode.remove();
    }
  }
})();