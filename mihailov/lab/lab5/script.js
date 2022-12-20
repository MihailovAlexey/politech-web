dragNDrop(document.getElementById(`roof`));
dragNDrop(document.getElementById(`body`));
dragNDrop(document.getElementById(`window`));
dragNDrop(document.getElementById(`chimney`));


const ethalon = {
    roofOnBodyTop: 100,
    roofOnBOdyLeft: 0,
    
    chimneyOnRoofTop: 20,
    roofOnChimneyLeft: 40,
    
    bodyOnWindowLeft: 80,
    bodyOnWindowTop: 20
}

let result = {
    roofOnBodyTop: false,
    roofOnBOdyLeft: false,    
    chimneyOnRoofTop: false,
    roofOnChimneyLeft: false,
    bodyOnWindowLeft: false,
    bodyOnWindowTop: false
}

let reload = () => {
    let container = document.getElementById(`task`);

    for(const obj of container.children){
        obj.style.top = `${Math.floor(Math.random() * 300)}px`;
        obj.style.left = `${Math.floor(Math.random() * 1200)}px`;
        obj.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
    }

    for (key in result) {
        result[key] = false
    }
}

function dragNDrop(element){

    element.onmousedown = function(e) {

        let coords = getCoords(element);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        document.body.appendChild(element);
        moveAt(e);

        element.style.zIndex = 1000;

        function moveAt(e) {
            element.style.left = e.pageX - shiftX + 'px';
            element.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        element.onmouseup = function() {
            document.onmousemove = null;
            element.onmouseup = null;
            checkResult()
        };
    }

    element.ondragstart = function() {
        return false;
    };

    function getCoords(element) {   
        let box = element.getBoundingClientRect();
        return {
            top: box.top + scrollY,
            left: box.left + scrollX
        };
    }

    function checkResult(){
        let elements = {
            body: document.getElementById(`body`), 
            window: document.getElementById(`window`), 
            roof: document.getElementById(`roof`), 
            chimney: document.getElementById(`chimney`)
        }

        if(
            ethalon.bodyOnWindowTop+15 >= getCoords(elements.window).top - getCoords(elements.body).top
            &&
            ethalon.bodyOnWindowTop-15 <= getCoords(elements.window).top - getCoords(elements.body).top
        ){            
            result.bodyOnWindowTop = true
        } 
        
        if(
            ethalon.bodyOnWindowLeft+15 >= getCoords(elements.window).left - getCoords(elements.body).left
            &&
            ethalon.bodyOnWindowLeft-15 <= getCoords(elements.window).left - getCoords(elements.body).left
        ){
            result.bodyOnWindowLeft = true
        } 

        if(
            ethalon.chimneyOnRoofTop+15 >= getCoords(elements.chimney).top - getCoords(elements.roof).top
            &&
            ethalon.chimneyOnRoofTop-15 <= getCoords(elements.chimney).top - getCoords(elements.roof).top
        ){
            result.chimneyOnRoofTop = true
        } 
        
        if(
            ethalon.roofOnChimneyLeft+15 >= getCoords(elements.chimney).left - getCoords(elements.roof).left
            &&
            ethalon.roofOnChimneyLeft-15 <= getCoords(elements.chimney).left - getCoords(elements.roof).left
        ){
            result.roofOnChimneyLeft = true
        } 

        if(
            ethalon.roofOnBodyTop+15 >= getCoords(elements.body).top - getCoords(elements.roof).top
            &&
            ethalon.roofOnBodyTop-15 <= getCoords(elements.body).top - getCoords(elements.roof).top
        ){
            result.roofOnBodyTop = true
        } 
        
        if(
            ethalon.roofOnBOdyLeft+15 >= getCoords(elements.roof).left - getCoords(elements.body).left
            &&
            ethalon.roofOnBOdyLeft-15 <= getCoords(elements.roof).left - getCoords(elements.body).left
        ){
            result.roofOnBOdyLeft = true
        } 

        if(
            result.bodyOnWindowLeft == true
            &&
            result.bodyOnWindowTop == true
            &&
            result.chimneyOnRoofTop == true
            &&
            result.roofOnBOdyLeft == true
            &&
            result.roofOnBodyTop == true
            &&
            result.roofOnChimneyLeft == true
        ){
            for (key in result) {
                result[key] = false
            }
            alert("Поздравляем! Вы успешно собрали пазл")
        }        
    }
}

function rotate(event) {
    event.preventDefault();
    scale += event.deltaY * -0.01;
    console.log(event.deltaY)
    document.getElementById(event.target.id).style.transform = "rotate("+scale*4+"deg)"; 
}

let scale = 1
document.getElementById(`roof`).onwheel = rotate
document.getElementById(`body`).onwheel = rotate
document.getElementById(`window`).onwheel = rotate
document.getElementById(`chimney`).onwheel = rotate