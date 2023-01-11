//localstorage info
const userResult = JSON.parse(localStorage.getItem(`${localStorage.length-1}`))

//global level params
const imageCounter = 16
const successImages = 10
//

//timer
const FULL_DASH_ARRAY = 283;
let TIME_LIMIT
switch(userResult.level1.difficultyLevel){
  case "1": TIME_LIMIT = 20; break;
  case "2": TIME_LIMIT = 15; break;
  case "3": TIME_LIMIT = 10; break;
  default: TIME_LIMIT = 30;
}
const WARNING_THRESHOLD = TIME_LIMIT*2/3;
const ALERT_THRESHOLD = TIME_LIMIT/3;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
//

//modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
//

const sourceOfTrue = [
    "img_1",
    "img_4",
    "img_5",
    "img_6",
    "img_7",
    "img_8",
    "img_10",
    "img_11",
    "img_15",
    "img_16"
]
const sourceOfFalse = [
    "img_2",
    "img_3",
    "img_9",
    "img_12",
    "img_13",
    "img_14"
]

const dragstart = function(event) {
    event.dataTransfer.setData("text", event.target.id);
};

const dragover = function(event) {
    if(event.target.nodeName.toLowerCase() === "img") {
    return true;
    }
    event.preventDefault();    
}

const drop = function(event) {
    event.preventDefault();
    let imageId = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(imageId));
    checkResult(-1)
};

// const move = function(card) {
     
// }  
const cells = document.getElementsByClassName(card);
Array.from(cells).forEach((element) => {
    element.addEventListener('dragover',dragover);
    element.addEventListener('drop',drop);
});

// move("left-card")
// move("right-card")  

const images = document.getElementsByTagName("img");
Array.from(images).forEach((element) => {
    element.addEventListener('dragstart',dragstart);
});

// const checkResult = function(timeLeft) {
//     const electricsContainer = document.getElementById("left-card");
//     const anotherContainer = document.getElementById("right-card");
//     const startContainer = document.getElementById("startContainer");
//     const anotherContainerResult = Array.from(anotherContainer.querySelectorAll("img"))
//     const electricsContainerResult = Array.from(electricsContainer.querySelectorAll("img"))
//     const startContainerResult = Array.from(anotherContainer.querySelectorAll("img"))
//     // console.log(currentResult)
//     userResult.level1.score = 0
//     electricsContainerResult.forEach(item => {
//         sourceOfTrue.forEach(successItem => {
//             if(item.id === successItem){
//                 userResult.level1.score += 100/imageCounter
//             }
//         })
//         sourceOfFalse.forEach(successItem => {
//             if(item.id === successItem){
//                 userResult.level1.score -= 100/imageCounter
//             }
//         })
//     })
//     anotherContainerResult.forEach(item => {
//         sourceOfTrue.forEach(successItem => {
//             if(item.id === successItem){
//                 userResult.level1.score -= 100/imageCounter
//             }
//         })
//         sourceOfFalse.forEach(successItem => {
//             if(item.id === successItem){
//                 userResult.level1.score += 100/imageCounter
//             }
//         })
//     })    
//     localStorage.setItem(localStorage.key(0), JSON.stringify(userResult))
//     console.log('resultScore', JSON.parse(localStorage.getItem(localStorage.key(0))).level1.score)
//     const modalTitle = document.getElementById("modal-title");
//     const modalHeader = document.getElementById("modal-header");    
//     const modalBody = document.getElementById("modal-body");
//     const modalButton = document.getElementById("modal-button");
//     const modalButtonForm = document.getElementById("modal-button-form");
//     if(userResult.level1.score >= 100 && anotherContainerResult.length == imageCounter-successImages){
//         modalTitle.innerHTML = 'Позравляем!'
//         modalBody.innerHTML = 'Вы успешно завершили уровень'
//         modalButton.innerHTML = 'Перейти на уровень 2'     
//         modalButtonForm.action='../level2/index.html'   
//         modal.style.display = "block";
//     }
//     else if(timeLeft === 0){
//         modalTitle.innerHTML = 'Неудача!'
//         modalHeader.classList.add('unsuccess')
//         modalBody.innerHTML = 'У Вас не получилось выйграть этот уровень! Попробуйте еще раз, у Вас получится'
//         modalButton.innerHTML = 'Попробовать снова'     
//         modalButtonForm.action='../level1/index.html'   
//         modal.style.display = "block";
//     }

// }

span.onclick = function() {
    modal.style.display = "none";
}
  
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

  
//timer
document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      checkResult(timeLeft)
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}