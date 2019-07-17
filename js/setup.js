'use strict';

(function () {
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
  /*
  // Изображение волшебника
  var wizard = setup.querySelector('.setup-wizard');

  // Мантия волшебника
  var wizardCoat = wizard.querySelector('.wizard-coat');

  // Глаза волшебника
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  */

  // Фаербол волшебника
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var fireballInput = setup.querySelector('input[name="fireball-color"]');


  // отправка формы на указаный URL
  var formUrl = 'https://js.dump.academy/code-and-magick';
  setupForm.action = formUrl;

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), function () {
      setupForm.classList.add('hidden');
    }, window.similar.onLoadError);
    evt.preventDefault();
    var successMessage = 'Данные отправлены';
    window.similar.createMessage('blue', successMessage);
  });

  /*

  var onLoadSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(createCharacter(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setupForm.querySelector('.setup-similar').classList.remove('hidden');
  };

  */

  // функция получения случайного элемента массива. выглядит логичнее моей изначальной
  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };


  // функция выбора случайного цвета из массива
  var randomColor = function (colorArray) {
    var color = getRandomElement(colorArray);
    return color;
  };

  var onFireballClick = function () {
    var color = randomColor(window.Colors.fireball);
    wizardFireball.style.backgroundColor = color;
    fireballInput.value = color;
  };

  wizardFireball.addEventListener('click', onFireballClick);

  // функция обработчика события "нажатие на esc"
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.Keycode.ESC) {
      closePopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === window.Keycode.ENTER) {
      closePopup();
    }
  };

  var onOpenEnterPress = function (evt) {
    if (evt.keyCode === window.Keycode.ENTER) {
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
