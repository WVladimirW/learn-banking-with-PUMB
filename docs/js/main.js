let count = 1;
let newQuestionArray = [...questionArray];
let number;
let questionSelect = finansialDepartmentQuestions;
let answerSelect = finansialDepartmentAnswer;
// получаем константы
const questionButton = document.querySelector('#questionButton');
const answer1Button = document.querySelector('#answer-1');
const answer2Button = document.querySelector('#answer-2');
const answer3Button = document.querySelector('#answer-3');
const answer4Button = document.querySelector('#answer-4');
const startButton = document.querySelector('#logo');
const divsWrapper = document.querySelector('.right-levels-container'); //переименовать
const selectTopic = document.querySelector('#topic-select');
const buttonsHelper = document.querySelector('.right-header'); //
const span = document.querySelector('#span-start');
const soundButton = document.querySelector('#sound');
const answerButtons = document.querySelector('.footer-answer-buttons');
const container = document.querySelector('.container');
const modalWindow = document.querySelector('.modal-window');
const AboutMeButton = document.querySelector('.about-author');
const modalAboutMe = document.querySelector('.modal-about-me');
const closeAboutMe = document.querySelector('#closeAboutMe');
const rulesGameButton = document.querySelector('.rules-game');
const modalRules = document.querySelector('.modal-rules');
const closeRules = document.querySelector('#closeRules');
const modalWin = document.querySelector('.modal-win');
const modalLose = document.querySelector('.modal-lose');
// список найденных констант с запуском/паузой звуков
const stopAudioloadedPages = () => document.querySelector('#audioloadedPages').pause();
const playAudioBackgroundMusic = () => document.querySelector('#audioBackgroundMusic').play();
const stopAudioBackgroundMusic = () => document.querySelector('#audioBackgroundMusic').pause();
const playAudio50Button = () => document.querySelector('#audio50Button').play();
const stopAudio50Button = () => document.querySelector('#audio50Button').pause();
const playAudioCallButton = () => document.querySelector('#audioCallButton').play();
const stopAudioCallButton = () => document.querySelector('#audioCallButton').pause();
const playAudioHelpButton = () => document.querySelector('#audioHelpButton').play();
const stopAudioHelpButton = () => document.querySelector('#audioHelpButton').pause();
const playAudioCorrectAnswer = () => document.querySelector('#audioCorrectAnswer').play();
const stopAudioCorrectAnswer = () => document.querySelector('#audioCorrectAnswer').pause();
const playAudioWrongAnswer = () => document.querySelector('#audioWrongAnswer').play();
const stopAudioWrongAnswer = () => document.querySelector('#audioWrongAnswer').pause();
const playAudioAnswerAccept = () => document.querySelector('#audioAnswerAccept').play();
const stopAudioAnswerAccept = () => document.querySelector('#audioAnswerAccept').pause();
const playAudioPlayerWin = () => document.querySelector('#audioPlayerWin').play();
const stopAudioPlayerWin = () => document.querySelector('#audioPlayerWin').pause();
const AudioBackgroundMusic = document.querySelector('#audioBackgroundMusic');
const AudioAnswerAccept = document.querySelector('#audioAnswerAccept');
let timerCallFunction;
let timerHelpFunction;
let timerAnswerAcceptFunction;
// вспомогательная функция: генерирует случайное число для разного порядка вопросов
const selectRandomQuestion = () => {
  let item = customRandom(1, newQuestionArray.length);
  let removed = newQuestionArray.splice(item - 1, 1);
  return removed[0];
}
// вспомогательная функция: проверяем какой из div совпадает в count, чтобы добавить класс, иначе удалить его
const changeLevels = () => {
  let arr = Array.from(divsWrapper.children).forEach(item => {
    if (+item.id === count) {
      item.classList.add('active-levels');
    } else {
      item.classList.remove('active-levels');
    }
  })
}
const disabledButtons = () => {
  answer1Button.disabled = true;
  answer2Button.disabled = true;
  answer3Button.disabled = true;
  answer4Button.disabled = true;
}
const enabledButtons = () => {
  answer1Button.disabled = false;
  answer2Button.disabled = false;
  answer3Button.disabled = false;
  answer4Button.disabled = false;
}
// вспомогательная функция: удаляет классы с кнопок для ответа
const removeClassList = () => {
  let arr = Array.from(answerButtons.children);
  arr.forEach(item => item.children[1].classList.remove('loser', 'winner', 'hide', 'help', 'shose'));
  enabledButtons();
  enabledImgButtons();
}
// вспомогательная функция: отключить/включить звук
const offsound = () => {
  if (!document.querySelector('#audioloadedPages').muted) {
    soundButton.src = 'photos/onSound.png';
    document.querySelector('#audioloadedPages').muted = true;
    document.querySelector('#audioBackgroundMusic').muted = true;
    document.querySelector('#audio50Button').muted = true;
    document.querySelector('#audioCallButton').muted = true;
    document.querySelector('#audioHelpButton').muted = true;
    document.querySelector('#audioCorrectAnswer').muted = true;
    document.querySelector('#audioWrongAnswer').muted = true;
    document.querySelector('#audioAnswerAccept').muted = true;
    document.querySelector('#audioPlayerWin').muted = true;
  } else {
    soundButton.src = 'photos/offSound.png';
    document.querySelector('#audioloadedPages').muted = false;
    document.querySelector('#audioBackgroundMusic').muted = false;
    document.querySelector('#audio50Button').muted = false;
    document.querySelector('#audioCallButton').muted = false;
    document.querySelector('#audioHelpButton').muted = false;
    document.querySelector('#audioCorrectAnswer').muted = false;
    document.querySelector('#audioWrongAnswer').muted = false;
    document.querySelector('#audioAnswerAccept').muted = false;
    document.querySelector('#audioPlayerWin').muted = false;
  }
}
// общая функция, которая запустит один нужный звук, отключив остальные. Получает как аргумент функцию для запуска
// также обнуляет все таймеры, где музыка должна была играть дольше, чем пользователь сделал какое-то действие
const allStartStopAudio = (playFunc) => {
  stopAudioloadedPages();
  stopAudioBackgroundMusic();
  stopAudio50Button();
  stopAudioCallButton();
  stopAudioHelpButton();
  stopAudioCorrectAnswer();
  stopAudioWrongAnswer();
  stopAudioAnswerAccept();
  stopAudioPlayerWin();
  AudioAnswerAccept.currentTime = 0;
  playFunc();
  clearTimeout(timerCallFunction);
  clearTimeout(timerHelpFunction);
}
// начинаем игру
const startGame = () => {
  startButton.removeEventListener('click', startGame);
  if (count === 16) {
    modalWin.classList.remove('modal-win-hide');
    questionButton.innerText = '';
    answer1Button.innerText = '';
    answer2Button.innerText = '';
    answer3Button.innerText = '';
    answer4Button.innerText = '';
    AudioBackgroundMusic.currentTime = 0;
    allStartStopAudio(playAudioPlayerWin);
    setTimeout(() => {
      startButton.addEventListener('click', startGame);
      endGame();
    }, 3000)
  } else {
    number = selectRandomQuestion();
    console.log(number);
    changeLevels();
    allStartStopAudio(playAudioBackgroundMusic);
    if (count === 1) {
      enabledImgButtons();
      enabledButtons();
      span.classList.add('hide');
    }
    // указываем путь к данным с указанием переменной count ['question' + count]
    questionButton.innerText = questionSelect.question['question' + number];
    answer1Button.innerText = questionSelect.answers['question' + number].a;
    answer2Button.innerText = questionSelect.answers['question' + number].b;
    answer3Button.innerText = questionSelect.answers['question' + number].c;
    answer4Button.innerText = questionSelect.answers['question' + number].d;
  }
}
// обнуляем count и по таймеру обновляем данные страницы
const endGame = () => {
  count = 1;
  newQuestionArray = [...questionArray];
  AudioBackgroundMusic.currentTime = 0;
  setTimeout(() => {
    startButton.addEventListener('click', startGame);
    if (!modalLose.classList.contains('modal-lose-hide')) modalLose.classList.add('modal-lose-hide');
    if (!modalWin.classList.contains('modal-win-hide')) modalWin.classList.add('modal-win-hide');
    changeLevels();
    removeClassList();
    unCrossImgButton();
    disabledImgButtons();
    disabledButtons();
    if (count === 1) span.classList.remove('hide');
    questionButton.innerText = '';
    answer1Button.innerText = '';
    answer2Button.innerText = '';
    answer3Button.innerText = '';
    answer4Button.innerText = '';
  }, 4000)

}
// проверка ответа пользователя
const checkAnswer = e => {
  if (!(startButton.disabled = true)) return;
  if (e.target.nodeName !== 'BUTTON') return;
  disabledButtons();
  disabledImgButtons();
  allStartStopAudio(playAudioAnswerAccept);
  e.target.classList.add('shose');
  timerAnswerAcceptFunction = setTimeout(() => {
    if (e.target.innerText === answerSelect['question' + number]) {
      allStartStopAudio(playAudioCorrectAnswer);
      e.target.classList.add('winner');
      count++;
      setTimeout(() => {
        startGame();
        removeClassList();

      }, 3500);
    } else {
      let arr = Array.from(e.target.parentElement.parentElement.children);
      arr.forEach(item => {
        if (item.children[1].innerText === answerSelect['question' + number]) {
          item.children[1].classList.add('winner');
          allStartStopAudio(playAudioWrongAnswer);
          modalLose.classList.remove('modal-lose-hide');
          endGame();
        }
      });
    }
  }, 5000);
}
// выбор других вопросов из select
const onSelectQuestion = () => {
  switch (selectTopic.value) {
    case 'openAccountQuestions':
      questionSelect = openAccountQuestions;
      answerSelect = openAccountAnswer;
      break;
    case 'currencyQuestions':
      questionSelect = currencyQuestions;
      answerSelect = currencyAnswer;
      break;
    case 'finansialDepartmentQuestions':
      questionSelect = finansialDepartmentQuestions;
      answerSelect = finansialDepartmentAnswer;
      break;
    default:
      questionSelect = finansialDepartmentQuestions;
      answerSelect = finansialDepartmentAnswer;
      break;
  }
}
// добавил функцию отработки клика на кнопка помощи
const imgButtonHelper = e => {
  if (e.target.nodeName !== 'IMG') return;
  switch (e.target.id) {
    case 'img50-50':
      e.target.disabled ? false : divideFunction();
      break;
    case 'imgCall':
      e.target.disabled ? false : callFunction();
      break;
    case 'imgHelp':
      e.target.disabled ? false : helpFunction();
      break;
  }
}
// функция для генерации случайных чисел в пределах min - max
const customRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// в псевдослучайном порядке скрывает элемент. Вызывается из mapIteration
const deleteRandomAnswer = item => {
  if (Math.random() > 0.3) {
    item.classList.add('hide');
    return true;
  } else {
    return false;
  }
}
// вспомогательная функция: для divideFunction, удаляет из map элементы
const mapIteration = map => {
  for (item of map) {
    if (deleteRandomAnswer(item[0])) {
      map.delete(item[0]);
      if (map.size === 1) return;
    }
  }
}
const disabledImgButtons = () => {
  buttonsHelper.children[0].disabled = true;
  buttonsHelper.children[1].disabled = true;
  buttonsHelper.children[2].disabled = true;
}
const enabledImgButtons = () => {
  if (buttonsHelper.children[0].src.includes('photos/img_buttons/divide.png')) {
    buttonsHelper.children[0].disabled = false;
  }
  if (buttonsHelper.children[1].src.includes('photos/img_buttons/call.png')) {
    buttonsHelper.children[1].disabled = false;
  }
  if (buttonsHelper.children[2].src.includes('photos/img_buttons/help.png')) {
    buttonsHelper.children[2].disabled = false;
  }
}
// меняем img на зачеркнутые и ставим disabled
const crossImgButton = (el) => {
  switch (el.id) {
    case 'img50-50':
      el.src = 'photos/img_buttons/divide-1.png';
      el.disabled = true;
      break;
    case 'imgCall':
      el.src = 'photos/img_buttons/call-1.png';
      el.disabled = true;
      break;
    case 'imgHelp':
      el.src = 'photos/img_buttons/help-1.png';
      el.disabled = true;
      break;
  }
}
// меняем img на незачеркнутые и убираем disabled
const unCrossImgButton = () => {
  buttonsHelper.children[0].src = 'photos/img_buttons/divide.png';
  buttonsHelper.children[0].disabled = false;
  buttonsHelper.children[1].src = 'photos/img_buttons/call.png';
  buttonsHelper.children[1].disabled = false;
  buttonsHelper.children[2].src = 'photos/img_buttons/help.png';
  buttonsHelper.children[2].disabled = false;

}
// кнопка для удаления 2-х не верных ответов
const divideFunction = () => {
  allStartStopAudio(playAudio50Button);
  setTimeout(() => allStartStopAudio(playAudioBackgroundMusic), 2000);
  crossImgButton(buttonsHelper.children[0]);
  let map = new Map();
  let arr = Array.from(answerButtons.children);
  arr.forEach(item => {
    if (item.children[1].innerText !== answerSelect['question' + number]) {
      map.set(item.children[1], item.children[1].innerText)
    }
  })
  while (map.size !== 1) {
    mapIteration(map);
  }
}
// не сделал подсветку правильного ответа - надо реализовать
// кнопка для подсветки правильного ответа
const callFunction = () => {
  allStartStopAudio(playAudioCallButton);
  timerCallFunction = setTimeout(() => {
    allStartStopAudio(playAudioBackgroundMusic);
    removeClassList();
  }, 32000);
  crossImgButton(buttonsHelper.children[1]);
  const arr = Array.from(answerButtons.children);
  arr.forEach(item => {
    if (item.children[1].innerText === answerSelect['question' + number]) {
      item.children[1].classList.add('help');
    }
  })
}
// кнопка для показа модального окна с предположительным правильным ответом
const helpFunction = () => {
  allStartStopAudio(playAudioHelpButton);
  timerHelpFunction = setTimeout(() => {
    allStartStopAudio(playAudioBackgroundMusic);
    hideModal();
  }, 62000);
  crossImgButton(buttonsHelper.children[2]);
  let num = 100;
  let acum = 0;
  let res = 0;
  let newArr = [];
  let arr = Array.from(answerButtons.children);
  arr.forEach(item => {
    if (item.children[1].innerText === answerSelect['question' + number]) {
      let positiveAnswer = customRandom(73, 80);
      res = (num - positiveAnswer) / 3;
      num -= positiveAnswer;
      newArr.push(positiveAnswer);
    } else {
      let negativeAnswer;
      if (acum === 3) {
        negativeAnswer = num;
      } else {
        if (res === 0) negativeAnswer = customRandom(4, 10);
        else negativeAnswer = customRandom((res - 3), res);
        num -= negativeAnswer;
      }
      newArr.push(negativeAnswer);
    }
    acum++;
  })
  setModalWindow(newArr);
}
// заполнить его и вызвать функцию для его показа
const setModalWindow = (newArr) => {
  let iImg = 0;
  let iP = 0;
  let arr = Array.from(modalWindow.children).slice(1);
  arr.forEach(item => {
    let tempArr = [...item.children];
    tempArr.forEach(item => {
      if (item.children[0].nodeName === 'IMG') {
        item.children[0].style.height = `${newArr[iImg] * 2}px`;
        iImg++;
      } else if (item.children[0].nodeName === 'P') {
        item.children[0].innerHTML = `${newArr[iP]}%`;
        iP++;
      }
    })
  })
  showModal();
  setTimeout(() => {
    document.addEventListener('click', hideModal);
  }, 0)
}
// включаем звук при любом нажатии на странице и сразу удаляем addEventListener
const playAudioloadedPages = (e) => {
  if (e.target.id !== 'logo') document.querySelector('#audioloadedPages').play();
  document.removeEventListener("click", playAudioloadedPages)
}
// показать модальное окно
const showModal = () => {
  modalWindow.classList.remove('modal-window-hide');
}
// скрыть модальное окно, вернуть музыку на фоновую, удалить listener
const hideModal = () => {
  modalWindow.classList.add('modal-window-hide');
  allStartStopAudio(playAudioBackgroundMusic);
  document.removeEventListener('click', hideModal);
}
// показать модальное окно автора
const showModalAuthor = () => {
  modalAboutMe.classList.remove('modal-about-me-hide');
}
// скрыть модальное окно автора
const hideModalAuthor = () => {
  modalAboutMe.classList.add('modal-about-me-hide');
}
// показать модальное окно правил игры
const showModalRules = () => {
  modalRules.classList.remove('modal-rules-hide');
}
// скрыть модальное окно правил игры
const hideModalRules = () => {
  modalRules.classList.add('modal-rules-hide');
}
// привязываем слушателей
AboutMeButton.addEventListener('click', showModalAuthor);
closeAboutMe.addEventListener('click', hideModalAuthor);
rulesGameButton.addEventListener('click', showModalRules);
closeRules.addEventListener('click', hideModalRules);
startButton.addEventListener('click', startGame);
answerButtons.addEventListener('click', checkAnswer);
selectTopic.addEventListener('change', onSelectQuestion);
buttonsHelper.addEventListener('click', imgButtonHelper);
document.addEventListener("click", playAudioloadedPages);
soundButton.addEventListener('click', offsound);
disabledImgButtons();
disabledButtons();


// заполнить данные вопросами и ответами
// еще нужно добавить таймер при ответе и вывод его на страницу с обновлением тикания
// реализовать переход на другие языки а пока, временно поле скрыть
//
