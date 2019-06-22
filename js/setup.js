'use strict';
// фунция "снятия" класса hidden
var reveal = function (hiddenBlock) {
  var currentClass = document.querySelector(hiddenBlock);
  currentClass.classList.remove('hidden');
};

// Появление блока .setup
reveal('.setup');

// массивы мок-данных

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var secondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// функция случайного числа для массива

var randomArrayNumber = function (array) {
  var length = array.length;
  var number = Math.floor(length * Math.random());
  return number;
};

// функции случайных характеристик

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

// Возможно стоит оптимизировать две функции ниже, так как они очень похожи
// и заменить их одной, лишь меняя параметр?

var randomCoatColor = function (coatColor) {
  var coatRandomNumber = randomArrayNumber(coatColor);
  var colorOfCoat = coatColor[coatRandomNumber];
  return colorOfCoat;
};

var randomEyesColor = function (eyesColor) {
  var eyesRandomNumber = randomArrayNumber(eyesColor);
  var colorOfEyes = eyesColor[eyesRandomNumber];
  return colorOfEyes;
};

// функция генерации объекта-персонажа

var generateCharacter = function (firstName, secondName, coatColour, eyesColour) {
  var characterObject = {
    name: randomName(firstName, secondName),
    coatColor: randomCoatColor(coatColour),
    eyesColor: randomEyesColor(eyesColour)
  };
  return characterObject;
};

// функция генерации массива

var generateCharactersArray = function (arrayLength) {
  var array = [];
  for (var i = 0; i < arrayLength; i++) {
    var character = generateCharacter(firstNames, secondNames, coatColors, eyesColors);
    array[i] = character;
  }
  return array;
};

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
var fragment = document.createDocumentFragment();

// Создание элементов

var createCharacter = function (characterObject) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  var label = wizardElement.querySelector('.setup-similar-label');
  label.textContent = characterObject.name;

  var coatColorFill = wizardElement.querySelector('.wizard-coat');
  coatColorFill.style.fill = characterObject.coatColor;

  var eyesColorFill = wizardElement.querySelector('.wizard-eyes');
  eyesColorFill.style.fill = characterObject.eyesColor;

  return wizardElement;

};

var createAmountOfCharacters = function (arrayOfCharactersObjects) {
  for (var j = 0; j < arrayOfCharactersObjects.length; j++) {
    var person = 0;
    person = arrayOfCharactersObjects[j];
    var creature = createCharacter(person);
    fragment.appendChild(creature);
  }
  similarListElement.appendChild(fragment);
};

// Добавление элементов на страницу
var exampleArray = generateCharactersArray(4);
createAmountOfCharacters(exampleArray);

// Появление блока .setup-similar
reveal('.setup-similar');
