'use strict';

(function () {
  // фунция "снятия" класса hidden
  var reveal = function (hiddenBlock) {
    var currentClass = document.querySelector(hiddenBlock);
    currentClass.classList.remove('hidden');
  };

  // Появление блока .setup (убрал для задания 6)
  //  reveal('.setup');

  // Константы клавиш
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // массивы мок-данных
  /*
  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var SECOND_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  */
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];


  // функция случайного числа для массива

  var randomArrayNumber = function (array) {
    var length = array.length;
    var number = Math.floor(length * Math.random());
    return number;
  };

  // функции случайных характеристик
  /*
  var randomName = function (firstName, secondName, isReversed) {
    if (isReversed) {
      var swap = 0;
      swap = firstName;
      firstName = secondName;
      secondName = swap;
    }
    var firstRandomNumber = randomArrayNumber(firstName);
    var secondRandomNumber = randomArrayNumber(secondName);
    var name = firstName[firstRandomNumber] + ' ' + secondName[secondRandomNumber];
    return name;
  };
  */
  // функция выбора случайного цвета из массива
  var randomColor = function (colorArray) {
    var number = randomArrayNumber(colorArray);
    var color = colorArray[number];
    return color;
  };
  /*
  // функция не случайного выбора цвета WIP WIP WIP WIP WIP WIP WIP WIP WIP
  var changeColor = function (colorArray) {
    var currentColor = colorArray[i];
    return currentColor;
  };
  */
  // функция генерации объекта-персонажа
  /*
  var generateCharacter = function (firstName, secondName, coatColour, eyesColour) {
    var characterObject = {
      name: randomName(firstName, secondName),
      coatColor: randomColor(coatColour),
      eyesColor: randomColor(eyesColour)
    };
    return characterObject;
  };
  */
  // функция генерации массива
  /*
  var generateCharactersArray = function (firstName, secondName, coatColour, eyesColour, arrayLength) {
    var array = [];
    for (var i = 0; i < arrayLength; i++) {
      var character = generateCharacter(firstName, secondName, coatColour, eyesColour);
      array[i] = character;
    }
    return array;
  };
  */
  // Вопрос по реализации генерации массива: правильно ли я сделал записав в цикл функцию
  // с уже существующими массивами? Ведь если будут другие массивы с другими названиями,
  // функция перестанет работать


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
  /*
  var createAmountOfCharacters = function (arrayOfCharactersObjects) {
    for (var j = 0; j < arrayOfCharactersObjects.length; j++) {
      var person = 0;
      person = arrayOfCharactersObjects[j];
      var creature = createCharacter(person);
      fragment.appendChild(creature);
    }
    similarListElement.appendChild(fragment);
  };
*/
  // Добавление элементов на страницу
  // var exampleArray = generateCharactersArray(FIRST_NAMES, SECOND_NAMES, COAT_COLORS, EYES_COLORS, 4);
  // createAmountOfCharacters(exampleArray);

  // Появление блока .setup-similar
  reveal('.setup-similar');

  // Задание 6: одеть Надежду ---------------------------------------------------------------

  // Модальное окно
  var setup = document.querySelector('.setup');

  // Кнопка открытия окна
  var setupOpen = document.querySelector('.setup-open');

  // Кнопка закрытия окна
  var setupClose = setup.querySelector('.setup-close');

  // Иконка пользователя
  // var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');

  // Поле ввода имени пользователя (модальное окно)
  var setupNameInput = setup.querySelector('.setup-user-name');

  // Форма модального окна
  var setupForm = setup.querySelector('.setup-wizard-form');

  // Изображение волшебника
  var wizard = setup.querySelector('.setup-wizard');

  // Мантия волшебника
  var wizardCoat = wizard.querySelector('.wizard-coat');

  // Глаза волшебника
  var wizardEyes = wizard.querySelector('.wizard-eyes');

  // Фаербол волшебника
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var coatInput = setup.querySelector('input[name="coat-color"]');
  var eyesInput = setup.querySelector('input[name="eyes-color"]');
  var fireballInput = setup.querySelector('input[name="fireball-color"]');


  // отправка формы на указаный URL
  var formUrl = 'https://js.dump.academy/code-and-magick';
  setupForm.action = formUrl;

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), function () {
      setupForm.classList.add('hidden');
    }, onLoadError);
    evt.preventDefault();
    var successMessage = 'Данные успешно отправлены';
    createMessage('blue', successMessage);
  });

  var onLoadSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(createCharacter(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setupForm.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onLoadError = function (errorMessage) {
    createMessage('red', errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);

  var createMessage = function (color, message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; outline: 2px solid white; text-align: center; background-color: ' + color + ';';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);

    node.addEventListener('click', function () {
      node.classList.add('hidden');
    });
  };


  // функция обработчика события "нажатие на esc"
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  var onOpenEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  var onOpenClick = function () {
    openPopup();
  };

  var onCloseClick = function () {
    closePopup();
  };

  // функция окрытия попапа
  var openPopup = function () {
    // удаляем у элемента класс hidden
    setup.classList.remove('hidden');
    // после чего добавляем на весь документ обработчик событий (при нажатии esc)
    // причём, функция обработчика названа явно, чтобы удалить её в дальнейшем
    document.addEventListener('keydown', onPopupEscPress);
  };

  // функция закрытия попапа
  var closePopup = function () {
    // добавляем элементу класс hidden
    setup.classList.add('hidden');
    // удаляем обработчик нажатия esc, так как он более нам не понадобится, модальное окно закрылось
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // установка обработчика событий (клика) на открытие
  setupOpen.addEventListener('click', onOpenClick);

  // установка обработчика событий (клавиши) на открытие
  setupOpen.addEventListener('keydown', onOpenEnterPress);

  // установка обработчика событий (клика) на закрытие
  setupClose.addEventListener('click', onCloseClick);

  // установка обработчика событий (клавиши) на закрытие
  setupClose.addEventListener('keydown', onPopupEscPress);

  setupClose.addEventListener('keydown', onPopupEnterPress);

  // функция смены цвета (не случайно) (не реализовано)

  /* Возможно ли создать универсальную функцию, которая заполняла бы
      '.style.fill'? Потому что когда я попытался создать и добавить её в коде,
      функция не сработала.
  var colorFill = function (element, colorValue) {
    var fill = element.style.fill;
    fill = colorValue;
    return fill;
  };
  */

  var onCoatClick = function () {
    var color = randomColor(COAT_COLORS);
    // var info = colorFill(wizardCoat, color);
    wizardCoat.style.fill = color;
    coatInput.value = color;
  };

  var onEyesClick = function () {
    var color = randomColor(EYES_COLORS);
    wizardEyes.style.fill = color;
    eyesInput.value = color;
  };

  var onFireballClick = function () {
    var color = randomColor(FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = color;
    fireballInput.value = color;
  };

  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  wizardFireball.addEventListener('click', onFireballClick);

  var onInputFocus = function (evt) {
    if (evt.target === setupNameInput) {
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onInputBlur = function (evt) {
    if (evt.target === setupNameInput) {
      document.addEventListener('keydown', onPopupEscPress);
    }
  };
  // функции работают, понял почему не работало (предыдущее замечание(прошлый коммит))
  setupNameInput.addEventListener('blur', onInputBlur);
  setupNameInput.addEventListener('focus', onInputFocus);

})();
