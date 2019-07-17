// Файл render.js
'use strict';
(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template');

  var renderWizard = function (wizard) {
    var element = wizardTemplate.content.cloneNode(true);

    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    element.querySelector('.setup-similar-label').innerText = wizard.name;

    return element;
  };

  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

  window.render = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(data[i]));
    }

    similar.classList.remove('hidden');
  };
})();

/*
  // Реализация заполнения

  // куда будут добавлятся похожие персонажи
  var similarListElement = document.querySelector('.setup-similar-list');
  // поиск шаблона
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  // создаём фрагмент, который будем добавлять на страницу
  // var fragment = document.createDocumentFragment();

  // Создание элементов

  var createCharacter = function (characterObject) {

    var wizardElement = similarWizardTemplate.cloneNode(true);

    var label = wizardElement.querySelector('.setup-similar-label');
    label.textContent = characterObject.name;

    var coatColorFill = wizardElement.querySelector('.wizard-coat');
    coatColorFill.style.fill = characterObject.colorCoat;

    var eyesColorFill = wizardElement.querySelector('.wizard-eyes');
    eyesColorFill.style.fill = characterObject.colorEyes;

    return wizardElement;

  };

  // фунция "снятия" класса hidden
  var reveal = function (hiddenBlock) {
    var currentClass = document.querySelector(hiddenBlock);
    currentClass.classList.remove('hidden');
  };

  // Появление блока .setup-similar
  reveal('.setup-similar');


  */
