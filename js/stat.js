var renderStatistics = function(ctx, names, times) {
  // Вывожу тень облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
  ctx.fillRect(110,20,530,290);
  // Вывожу само облако
  ctx.fillStyle = 'white';
  ctx.fillRect(100,10,520,280);
  // Пишу основную надпись
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!\n', 120, 30);
  ctx.fillText('Список результатов:', 120, 50)
  // Создаю цикл для отрисовки гистограммы
  for (var k = 0; k < times.length; k++) {
    // Завожу значение для хранения максимального значения
    var maxResult = 0;
    for (var i = 0; i < times.length - 1; i++) {
      // Прохожу массив times и записываю максимальное значение
      maxResult = times[i];
      for (var j = 0; j < times.length; j++) {
        // Провожу сравнение элементов массива
        if (times[j] > maxResult) {
          maxResult = times[j];
        }
      }
    }
    // Завожу переменные для процента высоты от максимального значения, так как
    // значение высоты гистограмы равно 150 * процент высоты от максимального значения
    console.log('Это максимальное значение: ' + maxResult);
    console.log('Текущее значение итерации: ' + times[k]);
    var percentOfHeight = (100 * times[k]) / maxResult;
    console.log('Процент от максимальной высоты: ' + percentOfHeight);
    var histogramHeight = Math.floor(150 * (percentOfHeight / 100));
    if (histogramHeight > 150) {
      histogramHeight = 150;
      console.log('Произошла ошибка рассчётов высоты');
    }

    console.log('Высота гистограммы: ' + histogramHeight);

    // Завожу переменную для координаты Х, которая будет меняться с каждой итерацией цикла
    // 150 - базовая координата, 90 - сумма ширины гистограммы (40) и пробела между ними (50)
    var coordinateX = 150 + 90 * k;
    var coordinateY = 250;
    var topCoordinateY = coordinateY - histogramHeight;
    ctx.beginPath();
    ctx.moveTo(coordinateX, coordinateY);
    ctx.lineTo(coordinateX, topCoordinateY);
    ctx.lineTo(coordinateX + 40, topCoordinateY);
    ctx.lineTo(coordinateX + 40, coordinateY);
    ctx.lineTo(coordinateX, coordinateY);
    ctx.closePath();
    ctx.stroke();

    var randomSaturation = Math.random();
    console.log('Текущее значение насыщенности: ' + randomSaturation);
    // Завожу проверку, если значение k-элемента равно 'Вы', меняю стиль заливки на красный
    if (names[k] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // Я пытался вставить randomSaturation вместо 1, однако все гистограммы отрисовывались
      // чёрными, как я понимаю, нельзя вставить в '' переменные или любой иной js код
      ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    }
    ctx.fill();

    // Подписываю гистограммы
    var timeValue = Math.floor(times[k]);
    ctx.fillStyle = 'black';
    ctx.fillText(timeValue, coordinateX, topCoordinateY - 20);
    ctx.fillText(names[k], coordinateX, coordinateY + 10);
  }

}
