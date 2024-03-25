let navbar = document.querySelector(".navbar")


window.addEventListener("scroll", ()=>{
    // console.log(window.scrollY)
    if(window.scrollY > 0){
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
})

let sezioneFiltri = document.querySelector("#sezioneFiltri");
let btnCollapse = document.querySelector("#btnCollapse");

function gestisciVisualizzazioneFiltri() {
    if (window.matchMedia("(min-width: 800px)").matches) { // Schermo di larghezza almeno 992px
        sezioneFiltri.classList.remove("collapse", "border");
        btnCollapse.classList.add("d-none");
        
    } else {
        sezioneFiltri.classList.add("collapse", "border");
        btnCollapse.classList.remove("d-none")
    }
}

// Chiamata alla funzione al caricamento della pagina e al ridimensionamento della finestra
window.onload = gestisciVisualizzazioneFiltri;
window.onresize = gestisciVisualizzazioneFiltri;

/* INIZIO SLIDER */
/* const setLabel = (lbl, val) => {
    const label = $(`#slider-${lbl}-label`);
    label.text(val);
    const slider = $(`#slider-div .${lbl}-slider-handle`);
    const rect = slider[0].getBoundingClientRect();
    label.offset({
        top: rect.top - 30,
        left: rect.left
    });
}

const setLabels = (values) => {
    setLabel("min", values[0]);
    setLabel("max", values[1]);
}

// Nuovi valori massimi e minimi per lo slider
const nuovoValoreMinimo = 0;
const nuovoValoreMassimo = 100;

// Inizializza lo slider con nuovi valori massimi e minimi
$('#ex2').slider({
    min: nuovoValoreMinimo,
    max: nuovoValoreMassimo
}).on('slide', function(ev) {
    setLabels(ev.value);
});
/* $('#ex2').slider().on('slide', function(ev) {
    setLabels(ev.value);
}); */
/* setLabels($('#ex2').attr("data-value").split(",")); */
/* FINE SLIDER */




fetch("./articoli.JSON").then((response)=> response.json()).then((data)=>{
    
    let articlesWrapper = document.querySelector("#articlesWrapper")
    
    function createCards(array) {
        articlesWrapper.innerHTML="";
        array.forEach((articolo, i) => {
            let col = document.createElement("div");
            col.classList.add("col-8", "col-md-3", "my-3", "mx-auto")
            col.innerHTML = `<div class="card position-relative h-100 shadow">
                                <div class="overflow-hidden">
                                    <img src="https://picsum.photos/20${i}" class="img-card card-img-top" alt="...">
                                </div>
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h6 class="card-title text-center fw-bold mb-1">${articolo.marca} ${articolo.modello}</h6>
                                        <p class="card-text m-0">Caratteristiche: <span>${articolo.categoria}</span></p>
                                        <p class="card-text">Prezzo: <span>${articolo.prezzo}${articolo.valuta}</span></p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <i class="bi bi-heart fs-3"></i>
                                        <a href="#" class="btn bg-A btn-dark">Aggiungi al Carrello</a>
                                    </div>
                                </div>
                            </div>`;
            
            articlesWrapper.appendChild(col)
            
        });
    }
    createCards(data)


     // CATEGORIE

    //CREAZIONE CATEGORIE
    let radioWrapper = document.querySelector("#radioWrapper")

    function setCategories(){
        let categories = data.map( (el)=> el.categoria)
        let uniqueCategories = [];
        categories.forEach( (category)=> {
            if(uniqueCategories.includes(category) == false){
                uniqueCategories.push(category)
            } 
        })
        
        uniqueCategories.sort().forEach( (categoria)=> {
            let div = document.createElement("div")
            div.classList.add("form-check")
            div.innerHTML = `
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}">
                                <label class="form-check-label" for="flexRadioDefault1">
                                ${categoria}
                                </label>
                            `
            radioWrapper.appendChild(div)
        })
    }
    setCategories()


    // FILTRO PER CATEGORIA

    let checksInput = document.querySelectorAll(".form-check-input")


    function filterByCategory(){
        let radiosBtn = Array.from(checksInput)
        let checked = radiosBtn.find( (el)=>  el.checked)
        if(checked.id == "All"){
            createCards(data)
        } else {
            let filtered = data.filter( (el)=> el.categoria == checked.id )
            createCards(filtered)
        }
    }
    
    //EVENTO CLICK RADIO BUTTON
    checksInput.forEach((input)=>{
        input.addEventListener("click", ()=>{
            filterByCategory()
        })
    })


    // RANGE MIN AND MAX PRICES
    let inputPrice = document.querySelector("#inputPrice")
    let currentValue = document.querySelector("#currentValue")


    function findMaxAndMinPrice(){
        let prices = data.map( (articolo)=> articolo.prezzo )
        let max = Math.max(...prices)
        let min = Math.min(...prices)
        inputPrice.max = max
        inputPrice.min = min
        inputPrice.value = max
        currentValue.innerHTML = max
    }
    findMaxAndMinPrice()



    //FILTRO PER PREZZO

    function filterByPrice(){
        let filtered = data.filter( (el)=> el.prezzo <= inputPrice.value )
        createCards(filtered)
    }

    inputPrice.addEventListener("input", ()=>{
        currentValue.innerHTML = inputPrice.value
        filterByPrice()
    })


    //FILTER PER PAROLA
                
    let inputWord = document.querySelector("#inputWord")

    function filterByWord(){
        let filtered = data.filter( (el)=> el.nome.toLowerCase().includes(inputWord.value.toLowerCase()) )
        createCards(filtered)

    }

    inputWord.addEventListener("input", ()=>{
        filterByWord()
    })

})