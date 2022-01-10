let dropdownShowed = false
let navbarDropdown = document.querySelector("#navbarDropdown")
let navbarDropdownList = document.querySelector("#navbarDropdownList")
navbarDropdown.addEventListener("mouseenter", () => {
    navbarDropdown.classList.add("show")
    navbarDropdownList.classList.add("show")
})
navbarDropdown.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if(!dropdownShowed){
            navbarDropdown.classList.remove("show")
            navbarDropdownList.classList.remove("show")
        }
    }, 1200)
})
navbarDropdownList.addEventListener("mouseenter", () => {
    navbarDropdown.classList.add("show")
    navbarDropdownList.classList.add("show")
    dropdownShowed = true
})
navbarDropdownList.addEventListener("mouseleave", () => {
    setTimeout(() => {
        navbarDropdown.classList.remove("show")
        navbarDropdownList.classList.remove("show")
        dropdownShowed = false
    }, 1200)
})

let navbar = document.querySelector(".presto-navbar")
document.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.remove("presto-navbar-scroll")
    } else{
        navbar.classList.add("presto-navbar-scroll")
    }
})

fetch("../annunci.json")
    .then((response) => response.json())
    .then((annunci) => {
    
    console.log(annunci)
    let categories = []
    annunci.forEach(annuncio => {
        if (!categories.includes(annuncio.category)){
            categories.push(annuncio.category)
        }
    });
    console.log(categories)
    
    let annunciMotori = []
    annunci.forEach((annuncio) => {
        console.log(annuncio)
        if (annuncio.category == "Motori"){
            annunciMotori.push(annuncio)
        } 
    })
    console.log(annunciMotori)
    annunciMotori.forEach((annuncio) => {
        createAnnunciWrapper(annuncio)
    })

    
    
})


function createAnnuncioElement(annuncio) {
    let element = document.createElement("div")
    element.classList.add("card-section-annunci")
    element.style.flexBasis = "270px"
    element.innerHTML = `
    <i class="categorie-icone-gradient fa-2x ${annuncio.logo}"></i>
    <p class="mt-4">${annuncio.category}</p>
    <h4>${annuncio.name}</h4>
    <h6 class="mt-3">${annuncio.price}€</h6>
    `
    return element
}

function createAnnunciWrapper(annuncio) {
    let annunciWrapper = document.querySelector("#annunciWrapper")
        annunciWrapper.appendChild(createAnnuncioElement(annuncio))
    
}