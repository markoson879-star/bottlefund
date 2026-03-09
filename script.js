let bottles = localStorage.getItem(location.pathname) || 0
bottles = Number(bottles)

const text = document.getElementById("progressText")
const fill = document.getElementById("progressFill")

let goal = 500

if(location.pathname.includes("stock")){
goal = 1000
}

function update(){

text.innerText = bottles + " / " + goal + " бутылок"

let percent = bottles/goal*100

if(percent > 100){
percent = 100
}

fill.style.width = percent + "%"

localStorage.setItem(location.pathname,bottles)

}

function addBottle(){

const input = document.getElementById("amount")

let value = Number(input.value)

if(!value){
return
}

bottles += value

input.value = ""

update()

}

update()
