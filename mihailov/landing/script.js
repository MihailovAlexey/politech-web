let faker = [
    {
        avatar: `https://placekitten.com/201/201`,
        username: "Гаврилов Павел Пётрович",
        level1: {score: 100,difficultyLevel: 1}, 
        level2: {score: 100,difficultyLevel: 1},
        level3: {score: 98,difficultyLevel: 1},
    },
    {
        avatar: `https://placekitten.com/202/202`,
        username: "Панов Арсен Мартынович",
        level1: {score: 54,difficultyLevel: 1},
        level2: {score: 58,difficultyLevel: 1},
        level3: {score: 82,difficultyLevel: 1},
    },
    {
        avatar: `https://placekitten.com/203/203`,
        username: "Пестов Орест Антонинович",
        level1: {score: 17,difficultyLevel: 1},
        level2: {score: 77,difficultyLevel: 1},
        level3: {score: 95,difficultyLevel: 1},
    },
    {
        avatar: `https://placekitten.com/224/214`,
        username: "Федосеев Евдоким Михаилович",
        level1: {score: 85,difficultyLevel: 1},
        level2: {score: 76,difficultyLevel: 1},
        level3: {score: 48,difficultyLevel: 1},
    },
    {
        avatar: `https://placekitten.com/205/205`,
        username: "Субботин Гордей Евсеевич",
        level1: {score: 22,difficultyLevel: 1},
        level2: {score: 78,difficultyLevel: 1},
        level3: {score: 56,difficultyLevel: 1},
    },
    {
        avatar: `https://placekitten.com/206/206`,
        username: "Щербаков Степан Христофорович",
        level1: {score: 95,difficultyLevel: 1},
        level2: {score: 97,difficultyLevel: 1},
        level3: {score: 99,difficultyLevel: 1},
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

        let level_2_score = tr.appendChild(document.createElement(`td`))
        level_2_score.innerHTML=`${arr[i].level2.score} / 100`

        let level_3_score = tr.appendChild(document.createElement(`td`))
        level_3_score.innerHTML=`${arr[i].level3.score} / 100`
        
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
        const obj = {
            avatar: document.getElementById(`my_avatar`).getElementsByTagName('img')[0].src,
            username: name,
            level1: {
                score: 0,        
                difficultyLevel: 1
            },
            level2: {
                score: 0,        
                difficultyLevel: 1
            },
            level3: {
                score: 0,        
                difficultyLevel: 1
            }
        }
        localStorage.setItem(name, JSON.stringify(obj))        
        window.location.href = "../level1/index.html"        
    });
