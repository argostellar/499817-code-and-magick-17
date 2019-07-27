'use strict';

// image-drag-and-drop.js - перетаскивание изображения на форму загрузки
(function () {
  // Иконка пользователя
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var upload = window.global.upload;
  var input = upload.querySelector('input[type=file]');
  var image = upload.querySelector('.setup-user-pic');

  input.addEventListener('change', function () {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        image.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  /* Ошибочное решение через drag and drop
    var onInputDrag = function (evt) {
      console.log(evt);
      var data = evt.dataTransfer;
      var dataFiles = data.files;
      var dataEffects = data.effectAllowed;
      console.log(data);
      console.log(dataFiles);
      console.log(dataEffects);
      var draggedImg = 0;
      image.src = draggedImg;
    };
    // input.addEventListener('dragenter', onInputDrag);
  */
})();
