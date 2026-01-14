// Клики по ссылкам в меню вызывают плавную прокрутку к соответствующим разделам страницы
$(document).ready(function(){
  $(".top-menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });
});

// Динамическое обновление элементов с классами date-N и dateN: подставляются актуальные даты с учётом смещения (например, «сегодня + 5 дней»)
const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],monthMin = ['','','','','','','','','','','',''],days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],daysMin = ['','','','','','',''],seasons = ['invierno','primavera','verano','otoño'];
function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {
  const _counterLength = 60;
  for (let counter = 0; counter < _counterLength; counter++) {
    innerDate(counter, 'date-');
    innerDate(counter, 'date')
  }
  function innerDate(counter, dateType) {
    let newCounter;
    dateType === 'date-' ? newCounter = -counter : newCounter = counter;
    const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear();
    const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year;
    const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); 
    for (let i = 0; i < nodeList.length; i++) {
      const dateFormat = nodeList[i].dataset.format;
      dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate
    }
  }
  function changeFormat(_day, _month, _year, format, counter) {
    let innerFormat = format;
    //   const testFormat = ["dd","mm","yyyy","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, year: getYearWithCounter(_year, counter),};
    const testFormat = ["dd", "mm_name", "yyyy", "year"];
    // Словарь замен
    const dateFormat = {
      dd: _day, // день с ведущим нулём
      mm_name: months[_month - 1],  // название месяца (месяц от 1 до 12!)
      yyyy: _year,
      year: getYearWithCounter(_year, counter)
    };
    for (let i = 0; i < testFormat.length; i++) {
        let string = testFormat[i];
        let regExp = new RegExp(string);
        innerFormat = innerFormat.replace(regExp, dateFormat[string]);
      }
      return innerFormat.split(' ').join(' ')
  }
  function getYearWithCounter(year, counter) {
    return year + counter
  }
  function addZero(numb) {
    return numb<10?'0'+numb:numb
  }
  function changeFirstLetter(isBig,str) {
    return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str
  }
}
if (document.body.classList.contains('ev-date')) {
  document.addEventListener("DOMContentLoaded", function () {
    postDate(days, daysMin, months, monthMin, seasons)
  });
}

// Альтернативная реализация плавной прокрутки без jQuery
// var links = document.querySelectorAll('a[href^="#"]');
// for (var i = 0; i < links.length; ++i) {
//   links[i].addEventListener('click', function (event) {
//     event.preventDefault();
//     var elemID = this.getAttribute('href');
//     document.querySelector(elemID).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     });
//   });
// }


document.addEventListener('DOMContentLoaded', function() {
  const orderButton = document.getElementById('order');
  const popup = document.querySelector('.ever-popup');
  const popupBody = document.querySelector('.ever-popup__body');
  const closeButton = document.querySelector('.ever-popup__close');
  const template = document.getElementById('cloneThis');

  // Функция открытия попапа
  function show_popup() {
    // Клонируем содержимое из шаблона
    popupBody.innerHTML = template.innerHTML;
    
    // Показываем попап
    popup.classList.add('show');
    
    // Блокируем скролл страницы
    document.body.style.overflow = 'hidden';
  }

  // Функция закрытия попапа
  function hide_popup() {
    popup.classList.remove('show');
    document.body.style.overflow = ''; // Возвращаем скролл
  }

  // Обработчики событий
  orderButton.addEventListener('click', show_popup);
  
  closeButton.addEventListener('click', hide_popup);
  
  
  // Закрытие по клику на фон
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      hide_popup();
    }
  });
  
  // Закрытие по клавише Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hide_popup();
    }
  });
});