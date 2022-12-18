const latinPhrase = [
    "Consuetudo est altera natura",
    "Nota bene",    
    "Nulla calamitas sola",
    "Per aspera ad astra"
]
const russianPhrase = [
    "Привычка - вторая натура",
    "Заметьте хорошо!",
    "Беда не приходит одна",
    "Через тернии к звёздам"
]

let rowCounter = 0
let clickCounter = 0

let rowAdding = () => {
    if (rowCounter == latinPhrase.length || russianPhrase.length == rowCounter){
        alert(`Фразы закончились!`)
        return
    }
    let table = document.getElementById(`content-table`)
    
    let tr = document.createElement(`tr`)
    tr.className = "row";
    rowCounter%2!=0 ? tr.style.backgroundColor = '#AAA' : tr.style.backgroundColor = '#DDD'
    
    let latinTd = tr.appendChild(document.createElement(`td`))
    latinTd.innerHTML=latinPhrase[rowCounter]
    let russianTd = tr.appendChild(document.createElement(`td`))
    russianTd.innerHTML=russianPhrase[rowCounter]
    
    table.appendChild(tr)
    rowCounter++
}

let repaint = () =>
{    
    let tr = document.getElementById(`content-table`).getElementsByTagName(`tr`)
    let mainColor = `#AAA`
    let secondaryColor = `#DDD`
    if(clickCounter % 2 != 0){
        for(let i = 0; i < tr.length; i++)
        {
            if(i % 2 != 0){                                
                tr[i].style.fontWeight = 'bold'
                tr[i].style.backgroundColor = mainColor
            }
            else{
                tr[i].style.fontWeight = 'normal'
                tr[i].style.backgroundColor = secondaryColor
            }
        } 
    }
    else {
        for(let i = 0; i < tr.length; i++)
        {
            if(i % 2 != 0){                
                tr[i].style.fontWeight = 'normal'
                tr[i].style.backgroundColor = secondaryColor                
            }
            else{
                tr[i].style.fontWeight = 'bold'
                tr[i].style.backgroundColor = mainColor
            }
        } 
    }
    clickCounter++
}