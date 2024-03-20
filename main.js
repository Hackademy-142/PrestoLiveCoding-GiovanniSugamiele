// EVENTO SCROLL

// console.log(window)

let navbar = document.querySelector(".navbar")
let navbarNav = document.querySelector(".navbar-nav")

window.addEventListener("scroll", ()=>{
    // console.log(window.scrollY)
    if(window.scrollY > 10){
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
})

let numUsers = document.querySelector("#numUsers")
let numArticles = document.querySelector("#numArticles")
let numComments = document.querySelector("#numComments")



// SETINVERAL() -> Built-in function. Che ci permette di eseguire un blocco di codice ogni tot numero di millisecondi. 
//CLEARINTERVAL -> FERMA IL SETINTERVAL


function createInterval(elementId, finalNumber, frequency){
    let counter = 0

    let intervallo = setInterval(() => {
        if(counter < finalNumber){
            counter++
            elementId.innerHTML = counter;
        } else {
            clearInterval(intervallo)
        }
    }, frequency);
}

createInterval(numArticles, 500, 8)
createInterval(numUsers, 1000, 2)
createInterval(numComments, 200, 20)