// Файл similar.js
'use strict';
(function () {
  var coatColor = '';
  var eyesColor = '';
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
  };

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

  var onLoadError = function (errorMessage) {
    createMessage('red', errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);
  window.similar = {
    createMessage: createMessage,
    onLoadError: onLoadError,
    onLoadSuccess: onLoadSuccess
  };
})();
