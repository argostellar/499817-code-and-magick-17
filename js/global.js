'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };
  // массивы мок-данных
  /*
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

    // Константы клавиш
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  */
  var Colors = {
    coat: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)',
      'rgb(207, 0, 15)',
      'rgb(150, 40, 27)',
      'rgb(154, 18, 179)',
      'rgb(220, 198, 224)'
    ],
    eyes: [
      'black',
      'red',
      'blue',
      'yellow',
      'green',
      'orange',
      'lightblue',
      'purple',
      'violet'
    ],
    fireball: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  var setup = document.querySelector('.setup');
  var upload = setup.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');

  window.Keycode = Keycode;
  window.Colors = Colors;
  window.global = {
    setup: setup,
    upload: upload,
    setupOpen: setupOpen
  };

})();
