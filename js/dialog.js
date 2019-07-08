'use strict';

var setup = document.querySelector('.setup');
var upload = setup.querySelector('.upload');
var shop = setup.querySelector('.setup-artifacts-shop');
var shopCell = shop.querySelector('.setup-artifacts-cell');
var item = shopCell.querySelector('img');
var inventory = setup.querySelector('.setup-artifacts');
var inventoryCell = inventory.querySelector('.setup-artifacts-cell');

// конструктор для координат
var Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
};

upload.addEventListener('mousedown', function (evt) {
  // предотваращаем поведение по умолчанию (загрузку)
  evt.preventDefault();
  var dragged = false;
  // фиксируем стартовые координаты перетаскивания
  var startCoords = new Coordinate(evt.clientX, evt.clientY);

  // создаём обработчик при движении мыши
  var onMouseMove = function (moveEvt) {
    // вновь предотвращаем поведение по умолчанию (зачем?)
    moveEvt.preventDefault();
    dragged = true;
    // фиксируем изменённые координаты
    var changedCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);
    // заводим объект "перемещения", где фиксируем разницу между стартом и
    // изменёнными координатами
    var shift = {
      x: startCoords.x - changedCoords.x,
      y: startCoords.y - changedCoords.y
    };
    // переназначаем стартовые координаты на изменённые (непонятно зачем,
    // но благодаря этому окно не улетает за экран)
    // пояснение: без переназначения стартовых координат, смещение будет тем
    // больше, чем дальше будет курсор от стартовой точки. Следовательно,
    // переназначение позволяет стартовой точке следовать за курсором,
    // а вместе с ним и всё окно
    startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

    // меняем положение окна через инлайн стили, используя вычитание
    // изначальных координат положения окна (top, left) и "перемещением"
    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  // создаём обработчик при "подъёме мыши"(mouse-up)
  var onMouseUp = function (upEvt) {
    // предотвращение стандартного поведения
    upEvt.preventDefault();

    // проверка на условие "перетаскивается ли"
    // непонятно, как он меняется на true, если его нигде
    // не переназначают
    if (dragged) {
      // создаётся обработчик предотвращения поведения по умолчанию
      // при клике
      var onClickPreventDefault = function (clickEvt) {
        // предотвращение стандартного поведения
        clickEvt.preventDefault();
        // удаление обработчика на upload при клике
        upload.removeEventListener('click', onClickPreventDefault);
      };
      // добавление обработчика на upload при клике
      upload.addEventListener('click', onClickPreventDefault);
    }
    // удаление обработчиков перетаскивания с документа
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // добавление обработчиков перетаскивания на документ
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

item.addEventListener('dragstart', function (evt) {
  //evt.preventDefault();
  /*
  var data = evt.dataTransfer.getData("text/plain");
  console.log(evt);
  var currentItem = document.createElement("img");
  currentItem.src = data;
  currentItem.alt = data;
  */
  var currentItem = item.cloneNode();


  var onInventoryDragOver = function () {
    inventory.style.outline = '2px solid red';
  };
  var onInventoryDragLeave = function () {
    inventory.style.outline = 'none';
  };
  var onMouseDrag = function (moveEvt) {
    //moveEvt.preventDefault();
    inventory.addEventListener('dragover', onInventoryDragOver);
    inventory.addEventListener('dragleave', onInventoryDragLeave);
  };
  var onMouseDragEnter = function () {
    inventoryCell.addEventListener('dragenter', onCellDragEnter);

  };
  var onMouseDrop = function () {
    inventoryCell.addEventListener('drop', onCellDrop);

  };


  var onCellDragEnter = function () {
    //inventoryCell.style.backgroundColor = 'yellow';
    inventoryCell.appendChild(currentItem);
  };

  var onCellDrop = function () {
    inventoryCell.appendChild(currentItem);
    //inventoryCell.removeEventListener('drop', onCellDrop);
  };

  var onMouseDragEnd = function (upEvt) {
    //upEvt.preventDefault();
    document.removeEventListener('drag', onMouseDrag);
    document.removeEventListener('dragend', onMouseDragEnd);
    document.removeEventListener('dragenter', onMouseDragEnter);
    document.removeEventListener('drop', onMouseDrop);
  };
  document.addEventListener('drag', onMouseDrag);
  document.addEventListener('dragend', onMouseDragEnd);
  document.addEventListener('dragenter', onMouseDragEnter);
  document.addEventListener('drop', onMouseDrop);

});
