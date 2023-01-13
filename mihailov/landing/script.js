
let faker = [
    {
        avatar: `https://placekitten.com/201/201`,
        username: "Гаврилов Павел Пётрович",
        level1: {score: 100,difficultyLevel: "Нормальный"}, 
        level2: {score: 100,difficultyLevel: "Нормальный"},
        level3: {score: 100,difficultyLevel: "Нормальный"},        
    },
    {
        avatar: `https://placekitten.com/202/202`,
        username: "Панов Арсен Мартынович",
        level1: {score: 54,difficultyLevel: "Сложный"},
        level2: {score: 58,difficultyLevel: "Сложный"},    
        level3: {score: 58,difficultyLevel: "Сложный"},        
    },
    {
        avatar: `https://placekitten.com/203/203`,
        username: "Пестов Орест Антонинович",
        level1: {score: 17,difficultyLevel: "Легкий"},
        level2: {score: 77,difficultyLevel: "Легкий"},     
        level3: {score: 77,difficultyLevel: "Легкий"},        
    },
    {
        avatar: `https://placekitten.com/224/214`,
        username: "Федосеев Евдоким Михаилович",
        level1: {score: 85,difficultyLevel: "Легкий"},
        level2: {score: 76,difficultyLevel: "Легкий"},     
        level3: {score: 76,difficultyLevel: "Легкий"},        
    },
    {
        avatar: `https://placekitten.com/205/205`,
        username: "Субботин Гордей Евсеевич",
        level1: {score: 22,difficultyLevel: "Сложный"},
        level2: {score: 78,difficultyLevel: "Сложный"},    
        level3: {score: 78,difficultyLevel: "Сложный"},        
    },
    {
        avatar: `https://placekitten.com/206/206`,
        username: "Щербаков Степан Христофорович",
        level1: {score: 95,difficultyLevel: "Нормальный"},
        level2: {score: 97,difficultyLevel: "Нормальный"}, 
        level3: {score: 97,difficultyLevel: "Нормальный"},        
    }
]




let result = []
for(let i = localStorage.length-1; i>=0; i--){
    result.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
}

let result_score_generator = () => {    
    let table = document.getElementById(`result_score`)    
    
    let tr_helper = document.createElement(`tr`)      
    let td_helper = tr_helper.appendChild(document.createElement(`td`))
    let h2_helper = document.createElement('h2');
    h2_helper.className=`result_score_avatar`
    td_helper.appendChild(h2_helper)
    tr_helper.append(td_helper)

    let arr = []    
    result.length ? arr=result : arr=faker
    // arr.sort(
    //     (a, b) => {a.level1.score > b.level1.score ? 1 : -1;}
    //     )

    for(let i = 0; i<arr.length; i++){
        let tr = document.createElement(`tr`)  
        
        let avatar = tr.appendChild(document.createElement(`td`))
        // avatar.innerHTML=arr[i].avatar
        let img = document.createElement('img');
        img.src = arr[i].avatar
        img.className=`result_score_avatar`        
        avatar.appendChild(img)
        // let avatar = avatar_tr.appendChild(document.createElement(`img`).src=arr[i].avatar)        

        let username = tr.appendChild(document.createElement(`td`))
        username.innerHTML=arr[i].username

        let level_1_score = tr.appendChild(document.createElement(`td`))
        level_1_score.innerHTML=`${arr[i].level1.score} / 100`

        let level_1_diff = tr.appendChild(document.createElement(`td`))
        level_1_diff.innerHTML=`${arr[i].level1.difficultyLevel}`

        let level_2_score = tr.appendChild(document.createElement(`td`))
        level_2_score.innerHTML=`${arr[i].level2.score} / 100`
        
        let level_2_diff = tr.appendChild(document.createElement(`td`))
        level_2_diff.innerHTML=`${arr[i].level2.difficultyLevel}`

        let level_3_score = tr.appendChild(document.createElement(`td`))
        level_3_score.innerHTML=`${arr[i].level3.score} / 100`
        
        let level_3_diff = tr.appendChild(document.createElement(`td`))
        level_3_diff.innerHTML=`${arr[i].level3.difficultyLevel}`

        table.appendChild(tr)
    }
}

result_score_generator()

let modal = document.getElementById('id01')

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}



let get_avatar = () => {
    let avatar = document.getElementById(`my_avatar`)
    let id = Math.floor(Math.random() * 2001)
    let img = document.createElement('img');
    img.src = `https://placekitten.com/${id}/${id}`
    img.className=`avatar`
    avatar.appendChild(img)     
}

get_avatar()


const formElement = document.getElementById('auth_form'); 
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formElement);
        const name = formData.get('uname');
        const radios = document.getElementsByName('radio');
        let difficulty = 1    
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {  
                difficulty = radios[i].value                              
                break;
            }
        }         
        const obj = {
            avatar: document.getElementById(`my_avatar`).getElementsByTagName('img')[0].src,
            username: name,
            level1: {
                score: 0,        
                difficultyLevel: difficulty
            },
            level2: {
                score: 0,        
                difficultyLevel: difficulty
            },
            level3: {
                score: 0,        
                difficultyLevel: difficulty
            }
        }
        localStorage.setItem(localStorage.length+1, JSON.stringify(obj))        
        window.location.href = "../level1/index.html"        
    });


const buttonGroup = document.getElementById("button-group")
function setDifficultyLevel(event) {
    const allBtn = buttonGroup.getElementsByTagName("button")
    Array.from(allBtn).forEach(element => {
        element.classList.remove("selected");
    }); 
    event.target.classList.add("selected")

}


function classToggle() {
    const navs = document.querySelectorAll('.nav_items')
    
    navs.forEach(nav => nav.classList.toggle('nav_toggle-show'));
  }
  
  document.querySelector('.nav_link-toggle')
    .addEventListener('click', classToggle);