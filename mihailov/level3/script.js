//localstorage info
const userResult = JSON.parse(localStorage.getItem(`${localStorage.length}`))
//global level params
const imageCounter = 16
//

//timer
const FULL_DASH_ARRAY = 283;
let TIME_LIMIT
switch(userResult.level3?.difficultyLevel){
  case "Легкий": TIME_LIMIT = 90; break;
  case "Нормальный": TIME_LIMIT = 70; break;
  case "Сложный": TIME_LIMIT = 30; break;
  default: TIME_LIMIT = 100;
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


const startGame = function() {
    const imgContainer = document.getElementById("startContainer")
    const reference = document.getElementById("right-card")     
    let sourcePref
    switch(Math.floor(Math.random()*4+1)){
        case 1: sourcePref = './images/blue/'; break;
        case 2: sourcePref = './images/green/'; break;
        case 3: sourcePref = './images/red/'; break;
        case 4: sourcePref = './images/orange/'; break;
    }

    let refImg = document.createElement('img');                                 
        refImg.src = `${sourcePref}reference.jpeg`
        refImg.className=`reference`          
        refImg.id=`img_reference`
        reference.appendChild(refImg)
    for(let i=1; i<=imageCounter; i++){
        let img = document.createElement('img');                
        let sourceSuff
        i>9 ? sourceSuff=`0${i}` : sourceSuff=`00${i}` 
        img.src = `${sourcePref}image_part_${sourceSuff}.jpg`        
        img.setAttribute("draggable",true)   
        img.id=`img${i}`     
        imgContainer.appendChild(img)        
    }    
}

const imgContainer = document.getElementById("startContainer")
const shaker = Array.from(imgContainer.getElementsByTagName("img"))

const shakeImage = function() {
  const imgContainer = document.getElementById("startContainer")
  const shaker = Array.from(imgContainer.getElementsByTagName("img"))
    for(let i=0; i<shaker.length; i++){
        let buffSrc = shaker[i].src
        let buffId = shaker[i].id
        let hood = Math.floor(Math.random()*15+1)
        shaker[i].src=shaker[hood].src
        shaker[i].id=shaker[hood].id
        shaker[hood].src = buffSrc
        shaker[hood].id = buffId
    }
}

const rotateImage = function() {    
  const imgContainer = document.getElementById("startContainer")
  const shaker = Array.from(imgContainer.getElementsByTagName("img"))
  for(let i=0; i<shaker.length; i++){
      let rand = Math.floor(Math.random()*3)
      let angle = 0
      switch(rand){
        case 0: break;
        case 1: angle = 90; break;
        case 2: angle = 180; break;
        case 3: angle = 270; break;
      }
      shaker[i].style.transform = `rotate(${angle}deg)`
      console.log(shaker[i].style.transform)
  }
}

startGame()

// shakeImage()
rotateImage()

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
    
    checkResult()
};

const move = function(card) {
    const cells = document.getElementsByClassName(card);
    Array.from(cells).forEach((element) => {
        element.addEventListener('dragover',dragover);
        element.addEventListener('drop',drop);
    });
}  
 
move("col")
move("startContainer")


const images = document.getElementsByTagName("img");
Array.from(images).forEach((element) => {
    element.addEventListener('dragstart',dragstart);
});

const checkResult = function(timeLeft) {
    userResult.level3.score = 0
    const puzzle = document.getElementsByClassName("col");            
    for(let i=0; i<puzzle.length; i++){        
        let colNumber = puzzle[i]?.id?.match(/\d/g)[0]        
        if(
            colNumber == puzzle[i]?.children[0]?.id?.match(/\d/g)[0]
            && (
                puzzle[i]?.children[0]?.style.transform == ''
                ||
                puzzle[i]?.children[0]?.style.transform?.match(/\d{1,3}/g)[0] == 0
                ||
                puzzle[i]?.children[0]?.style.transform?.match(/\d{1,3}/g)[0] == 360
              )
          ){
            userResult.level3.score += 100/imageCounter            
        }
        if(colNumber != puzzle[i]?.children[0]?.id?.match(/\d/g)[0]){
            userResult.level3.score -= 100/imageCounter            
        }
    }
    localStorage.setItem(localStorage.length, JSON.stringify(userResult))
    // console.log('resultScore', JSON.parse(localStorage.getItem(`${localStorage.length}`)).level2.score)
    const modalTitle = document.getElementById("modal-title");
    const modalHeader = document.getElementById("modal-header");    
    const modalBody = document.getElementById("modal-body");
    const modalButton = document.getElementById("modal-button");
    const modalButtonForm = document.getElementById("modal-button-form");

    if(userResult.level2.score >= 100){
        modalTitle.innerHTML = 'Позравляем!'
        modalBody.innerHTML = 'Вы успешно завершили уровень и прошли нашу игру!'
        modalButton.innerHTML = 'Перейти на стартовую страницу'     
        modalButtonForm.action='../landing/index.html'   
        modal.style.display = "block";
    }
    else if(timeLeft === 0){
        modalTitle.innerHTML = 'Неудача!'
        modalHeader.classList.add('unsuccess')
        modalBody.innerHTML = 'У Вас не получилось выйграть этот уровень! Попробуйте еще раз, в следующий раз повезет'
        modalButton.innerHTML = 'Попробовать снова'     
        modalButtonForm.action='../level3/index.html'   
        modal.style.display = "block";
    }
}

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

let wait = false
function rotate(event) {
  if (wait) return
  wait = true
  setTimeout(() => wait = false, 400)
  event.preventDefault();   
  console.log(event.deltaY) 
  let currentAngle = document.getElementById(event.target.id).style.transform
  if(currentAngle==''){
    document.getElementById(event.target.id).style.transform = `rotate(${90}deg)`
  }
  else{    
    document.getElementById(event.target.id).style.transform = `rotate(${currentAngle.match(/\d{1,3}/g)[0]*1 + 90}deg)`    
  } 
  if(currentAngle!=''
  && currentAngle.match(/\d{1,3}/g)[0] != 90
  && currentAngle.match(/\d{1,3}/g)[0] != 180
  && currentAngle.match(/\d{1,3}/g)[0] != 270
  && currentAngle.match(/\d{1,3}/g)[0] != 0
  && currentAngle.match(/\d{1,3}/g)[0] != 360){
    document.getElementById(event.target.id).style.transform = ``
  }
  checkResult()  
}

for(let i=1;i<=imageCounter; i++){
  document.getElementById(`img${i}`).onwheel = rotate  
}