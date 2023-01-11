const imageCounter = 16
const successImages = 10

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

// console.log(JSON.parse(localStorage.getItem('data')))
const userResult = JSON.parse(localStorage.getItem(localStorage.key(0)))
// {
//     user: "Alex",
//     level1: {
//         score: 0,        
//         difficultyLevel: 1
//     },
//     level2: {
//         score: 0,        
//         difficultyLevel: 1
//     },
//     level3: {
//         score: 0,        
//         difficultyLevel: 1
//     }
// }

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

move("left-card")
move("right-card")  

const images = document.getElementsByTagName("img");
Array.from(images).forEach((element) => {
    element.addEventListener('dragstart',dragstart);
});

const checkResult = function() {
    const electricsContainer = document.getElementById("left-card");
    const anotherContainer = document.getElementById("right-card");
    const startContainer = document.getElementById("startContainer");
    const anotherContainerResult = Array.from(anotherContainer.querySelectorAll("img"))
    const electricsContainerResult = Array.from(electricsContainer.querySelectorAll("img"))
    const startContainerResult = Array.from(anotherContainer.querySelectorAll("img"))
    // console.log(currentResult)
    userResult.level1.score = 0
    let check = 0
    electricsContainerResult.forEach(item => {
        sourceOfTrue.forEach(successItem => {
            if(item.id === successItem){
                userResult.level1.score += 10
                check++
            }
        })
        sourceOfFalse.forEach(successItem => {
            if(item.id === successItem){
                userResult.level1.score -= 10
                check++
            }
        })
    })
    anotherContainerResult.forEach(item => {
        sourceOfTrue.forEach(successItem => {
            if(item.id === successItem){
                userResult.level1.score -= 10
            }
        })
    })    
    localStorage.setItem(localStorage.key(0), JSON.stringify(userResult))
    console.log('resultScore', JSON.parse(localStorage.getItem(localStorage.key(0))).level1.score)
}

  