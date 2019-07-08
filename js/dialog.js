'use strict';

var setup = document.querySelector('.setup');
var upload = setup.querySelector('.upload');

// конструктор для координат
var Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
};

upload.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var dragged = false;

  var startCoords = new Coordinate(evt.clientX, evt.clientY);

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };


  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        upload.removeEventListener('click', onClickPreventDefault)
      };
      upload.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
