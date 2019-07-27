// Файл wizard.js
'use strict';
(function () {
  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  var wizardElement = document.querySelector('.setup-wizard');

  // функция не случайного выбора цвета
  var changeColor = function (colorArray, initialColor) {
    var currentColor = 0;
    var initialColorIndex = colorArray.indexOf(initialColor);
    if (initialColorIndex < colorArray.length - 1) {
      currentColor = colorArray[initialColorIndex + 1];
    } else if (initialColorIndex === colorArray.length - 1) {
      currentColor = colorArray[0];
    }
    return currentColor;
  };

  var onObjectClick = function (object, objectInput, colors) {
    var currentColor = object.style.fill;
    var color = changeColor(colors, currentColor);
    object.style.fill = color;
    objectInput.value = color;
    return {
      color: color
    };
  };

  // ------------------------------------------------------------------------
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var coatInput = document.querySelector('input[name="coat-color"]');

  var onCoatClick = function () {
    onObjectClick(wizardCoatElement, coatInput, window.Colors.coat);
    var coatColor = onObjectClick(wizardCoatElement, coatInput, window.Colors.coat).color;
    wizard.onCoatChange(coatColor);
  };

  wizardCoatElement.addEventListener('click', onCoatClick);
  // ------------------------------------------------------------------------
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var eyesInput = document.querySelector('input[name="eyes-color"]');

  var onEyesClick = function () {
    onObjectClick(wizardEyesElement, eyesInput, window.Colors.eyes);
    var eyesColor = onObjectClick(wizardEyesElement, eyesInput, window.Colors.eyes).color;
    wizard.onEyesChange(eyesColor);
  };

  wizardEyesElement.addEventListener('click', onEyesClick);

  window.wizard = wizard;
})();
