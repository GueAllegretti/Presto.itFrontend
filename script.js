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
    // console.log(window.scrollY)
    // if (innerWidth >= 992) {
    //     if (window.scrollY > 50) {
    //         navbar.style.paddingTop = "0"
    //         navbar.style.backgroundColor = "var(--primary)"
    //     } else {
    //         navbar.style.paddingTop = "2%"
    //         navbar.style.backgroundColor = "transparent"
    //     }
    // }
    if (window.scrollY > 50) {
        navbar.classList.remove("presto-navbar-scroll")
    } else{
        navbar.classList.add("presto-navbar-scroll")
    }
})

let insertedAnn = document.querySelector("#insertedAnn")
let insertedCounter = 0
const INSERTED__VALUE = 2344
let insertedInterval = setInterval(() => {
    insertedCounter++
    insertedAnn.innerHTML = `${insertedCounter}`
    if(insertedCounter == INSERTED__VALUE) {
        clearInterval(insertedInterval)
    }
}, 1);

let completedAnn = document.querySelector("#completedAnn")
let completedCounter = 0
const COMPLETED__VALUE = 1998
let completedInterval = setInterval(() => {
    completedCounter++
    completedAnn.innerHTML = `${completedCounter}`
    if(completedCounter == COMPLETED__VALUE) {
        clearInterval(completedInterval)
    }
}, 1);

let customerActive = document.querySelector("#customerActive")
let customerCounter = 0
const CUSTOMER__VALUE = 1663
let activedInterval = setInterval(() => {
    customerCounter++
    customerActive.innerHTML = `${customerCounter}`
    if(customerCounter == CUSTOMER__VALUE) {
        clearInterval(activedInterval)
    }
}, 1);

let userActive = document.querySelector("#userActive")
let userCounter = 0
const USER__VALUE = 3663
let userInterval = setInterval(() => {
    userCounter++
    userActive.innerHTML = `${userCounter}`
    if(userCounter == USER__VALUE) {
        clearInterval(userInterval)
    }
}, 1);

fetch("./annunci.json")
.then((response) => response.json())
.then((annunci) => {
    console.log(annunci)
    let categorie = []
    annunci.forEach(annuncio => {
        if (!categorie.includes(annuncio.category)){
            categorie.push(annuncio.category)
        }
    });
    console.log(categorie)
    
    let firstWrapperCategories = document.querySelector("#firstWrapperCategories")
    let firstCategories = [
        categorie[0],
        categorie[1],
        categorie[2]
    ]
    firstCategories.forEach((category) => {
        let categoryElement = createCategoryElement(category)
        firstWrapperCategories.appendChild(categoryElement)
    })
    
    let secondWrapperCategories = document.querySelector("#secondWrapperCategories")
    let secondCategories = [
        categorie[3],
        categorie[4],
        categorie[5]
    ]
    secondCategories.forEach((category) => {
        let categoryElement = createCategoryElement(category)
        secondWrapperCategories.appendChild(categoryElement)
    })
    
    let thirdWrapperCategories = document.querySelector("#thirdWrapperCategories")
    let thirdCategories = [
        categorie[6],
        categorie[7],
        categorie[8]
    ]
    thirdCategories.forEach((category) => {
        let categoryElement = createCategoryElement(category)
        thirdWrapperCategories.appendChild(categoryElement)
    })
    
    let slidesWrapper = document.querySelector(".glide .glide__slides")
    let important = annunci.slice(0, 9)
    console.log(important)
    important.forEach((annuncio) => {
        let annuncioSlideElement = createAnnuncioElement(annuncio)
        slidesWrapper.appendChild(annuncioSlideElement)
    })
    
    let glide = new Glide(".glide", {
        type: "carousel",
        perView: 3,
        autoplay: 1000,
        breakpoints: {
            "992": {
                perView: 2
            },
            "576": {
                perView: 1
            }
        }
    }).mount()
    console.log(glide)
})

function createCategoryElement(category) {
    let categoryElement = document.createElement("div")
    categoryElement.classList.add("card-section")
    categoryElement.innerHTML = `
    <div>
    <class="link-footer" >${category}
    </div>
    `
    return categoryElement
}

function createAnnuncioElement(annuncio) {
    let categoryElement = document.createElement("li")
    categoryElement.classList.add("glide__slide")
    categoryElement.innerHTML = `
    <div class="card-section-annunci">
    <h5 class="mt-3">${annuncio.category}</h5>
    <h3>${annuncio.name}</h3>
    <p>${annuncio.price}€</p>
    <i class="categorie-icone-gradient fa-2x ${annuncio.logo}"></i>
    </div>
    `
    return categoryElement
}