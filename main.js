// EVENTO SCROLL
let navbar = document.querySelector(".navbar")
let navbarNav = document.querySelector(".navbar-nav")

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 10){
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
})

let numUsers = document.querySelector("#numUsers")
let numArticles = document.querySelector("#numArticles")
let numComments = document.querySelector("#numComments")


function createInterval(elementId, finalNumber, frequency){
    let counter = 0

    let intervallo = setInterval(() => {
        if(counter < finalNumber){
            counter=counter+2;
            elementId.innerHTML = counter;
        } else {
            clearInterval(intervallo)
        }
    }, frequency);
}



//INTERSECTION OBSERVER NUMERI DINAMICI
let isIntersected = false;

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach( (entry)=>{
        if(entry.isIntersecting && isIntersected == false){
            
            createInterval(numArticles, 100, 20)
            createInterval(numUsers, 10000, 5)
            createInterval(numComments, 5000, 10)
            isIntersected = true;
            setTimeout(() => {
                isIntersected = false;
            }, 10000);
        }
    } )
})

intersectionObserver.observe(numArticles)


const prodottiTech = [
    {
        nome: "Smartwatch avanzato",
        caratteristiche: "Monitoraggio fitness, GPS integrato, notifiche smart",
        prezzo: 199.99,
        disponibilità: true,
        immagine: "https://picsum.photos/200"
    },
    {
        nome: "Altoparlante intelligente",
        caratteristiche: "Assistente vocale integrato, controllo domestico intelligente",
        prezzo: 129.99,
        disponibilità: true,
        immagine: "https://picsum.photos/201"
    },
    {
        nome: "Telecamera di sicurezza smart",
        caratteristiche: "Rilevamento del movimento, visione notturna, registrazione remota",
        prezzo: 149.99,
        disponibilità: true,
        immagine: "https://picsum.photos/202"
    },
    {
        nome: "Auricolari true wireless",
        caratteristiche: "Cancellazione del rumore attiva, qualità audio premium",
        prezzo: 179.99,
        disponibilità: true,
        immagine: "https://picsum.photos/203"
    },
    {
        nome: "Router Wi-Fi mesh",
        caratteristiche: "Copertura completa della rete, velocità elevate",
        prezzo: 249.99,
        disponibilità: true,
        immagine: "https://picsum.photos/204"
    },
    {
        nome: "Cuffie da Gaming",
        caratteristiche: "Altissima qualità, fatte per gamers",
        prezzo: 249.99,
        disponibilità: true,
        immagine: "https://picsum.photos/205"
    }
];

let cardsWrapper = document.querySelector("#cardsWrapper")

    let tempo = 500;
    prodottiTech.forEach( (articoli, i)=>{
        if(i >=  prodottiTech.length - 5 ){
            let col = document.createElement("div");
            col.classList.add("col-12", "col-md-4", "my-5")
            col.innerHTML = `
                <div data-aos="flip-left" data-aos-delay="${tempo}" class="card position-relative h-100">
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-2">NEW</span>
                <div class="overflow-hidden">
                <img src=${articoli.immagine} class="img-card card-img-top" alt="...">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                <div>
                <h6 class="card-title text-center fw-bold mb-1">${articoli.nome}</h6>
                <p class="card-text m-0">Caratteristiche: <span>${articoli.caratteristiche}</span></p>
                <p class="card-text">Prezzo: <span>${articoli.prezzo}€</span></p>
                </div>
                <div class="d-flex justify-content-between">
            <i class="bi bi-heart fs-3"></i>
            <a href="#" class="btn bg-A btn-dark">Aggiungi al Carrello</a>
            </div>
            </div>
            </div>
            `
            cardsWrapper.appendChild(col);
            tempo = tempo + 100
            console.log(tempo);
        }
    } );


