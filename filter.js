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

fetch("./annunci.json")
    .then((response) => response.json())
    .then((annunci) => {
        let nameFilter = ""
        let categoriesFilter = []
        let priceFilter = []
    
    //console.log(annunci)
    let categories = []
    annunci.forEach(annuncio => {
        if (!categories.includes(annuncio.category)){
            categories.push(annuncio.category)
        }
    });
    //console.log(categories)
    
    let categoriesWrapper = document.querySelector("#categoriesWrapper")
    categories.forEach((category) => {
        let categoryElement = createCategoryCheckbox(category)
        categoriesWrapper.appendChild(categoryElement) 
    })
    
    let categoriesCheckbox = categoriesWrapper.querySelectorAll("input[type='checkbox']")
    categoriesCheckbox.forEach((checkbox) => {
        checkbox.addEventListener("input", () => {
            //console.log(categoriesCheckbox)
            categoriesFilter = Array.from(categoriesCheckbox)
            //filter cicla su tutto l'array find si ferma al primo elemento che corrisponde al valore richiesto
            .filter((checkboxElemento) => checkboxElemento.checked)
            .map((checkboxElemento) => checkboxElemento.id)
            let filtered = filterAnnunci(annunci, categoriesFilter, nameFilter, priceFilter)
            //console.log(categorieFilter)
            createAnnunciWrapper(filtered)
        })
    })
    
    //createAnnunciWrapper(annunci)
    let inputName = document.querySelector("#inputName")
    inputName.addEventListener("input", () => {
        nameFilter = inputName.value
        let filtered = filterAnnunci(annunci, categoriesFilter, nameFilter, priceFilter)
        createAnnunciWrapper(filtered)
        //console.log(filtered)
        // if(text) {
        //     let annunciFiltered = annunci.filter((annuncio) => annuncio.name.toLowerCase().includes(text.toLowerCase()))
        //         createAnnunciWrapper(annunciFiltered)
        // } else {
        //     createAnnunciWrapper(annunci)
        // }
    }) 
    
    let priceArray = annunci.map((annuncio) => Number(annuncio.price))

    let maxPrice = 0
    priceArray.forEach((price) => {
        if (price >= maxPrice) (
            maxPrice = price
        )
    })
    let minPrice = maxPrice
    //let minPrice = Number.MAX_SAFE_INTEGER
    priceArray.forEach((price) => {
        if (price <= minPrice) (
            minPrice = price
        )
    })
    console.log(priceArray)
    console.log(minPrice, maxPrice)
    priceFilter = [minPrice, maxPrice]
    let priceWrapper = document.querySelector("#priceWrapper");
    let steps = 100 / priceArray.length
    let range = {
            "min": [minPrice],
            "max": [maxPrice]
    // noUiSlider.create(priceWrapper, {
    //     start: [minPrice, maxPrice],
    //     range: {
    //         'min': [minPrice],
    //         'max': [maxPrice]
    //     })
    }

    priceArray.sort((p1, p2) => p1 - p2)
        for (
            let i = 0, perc = steps;
            i < priceArray.length;
            i++, perc += steps
        ) {
            range[`${perc}%`] = priceArray[i]
        }
        console.log(range)
        noUiSlider.create(priceWrapper, {
            start: [minPrice, maxPrice],
            connect: true,
            range,
        })

    priceWrapper.noUiSlider.on('update', (values, handle) => {
        //console.log(values)
        let minWrapper = document.querySelector("#minWrapper");
        minWrapper.innerHTML = `Min: ${values[0]}`
        let maxWrapper = document.querySelector("#maxWrapper");
        maxWrapper.innerHTML = `Max: ${values[1]}`
    })

    priceWrapper.noUiSlider.on('change', (values, handle) => {
        priceFilter = [
            Number.parseFloat(values[0]),
            Number.parseFloat(values[1]),
        ]
        let filtered = filterAnnunci (annunci, categoriesFilter, nameFilter, priceFilter)
        createAnnunciWrapper(filtered)
    })

    let filtered = filterAnnunci(annunci, categoriesFilter, nameFilter, priceFilter)
    createAnnunciWrapper(filtered)

    let slidesWrapper = document.querySelector(".glide .glide__slides")
    let important = annunci.slice(10, 19)
    //console.log(important)
    important.forEach((annuncio) => {
        let annuncioSlideElement = createSlideElement(annuncio)
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

function filterAnnunci(annunci, categorie, nome, prezzo) {
    return annunci.filter((annuncio) => {
        return (!nome || annuncio.name.toLowerCase().includes(nome.toLowerCase())) && 
        (categorie.length == 0 || categorie.includes(annuncio.category)) &&
        (Number.parseFloat(annuncio.price) >= prezzo[0] && Number.parseFloat(annuncio.price) <= prezzo[1] )
        
        // if (!nome && categorie.length == 0) {
        //     return true
        // } else if (nome && categorie.length == 0) {
        //     return annuncio.name.toLowerCase().includes(nome.toLowerCase())
        // } else if (!nome && categorie.length > 0) {
        //     return categorie.includes(annuncio.category)
        // } else if (nome && categorie.length > 0) {
        //     return annuncio.name.toLowerCase().includes(nome.toLowerCase()) && categorie.includes(annuncio.category)
        // }
        
    })
} 

function createAnnunciWrapper(annunci) {
    let annunciWrapper = document.querySelector("#annunciWrapper")
    annunciWrapper.innerHTML = ""
    annunci.forEach((annuncio) => {
        let annuncioElement = createAnnuncioElement(annuncio)
        annunciWrapper.appendChild(annuncioElement)
    })    
}

function createCategoryCheckbox(category) {
    let categoryElement = document.createElement("div")
    categoryElement.classList.add("form-check")
    categoryElement.innerHTML = `
    <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
    <label class="form-check-label presto-icone-gradient" for="${category}">
    ${category}
    </label>
    `
    return categoryElement
}

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

function createSlideElement(annuncio) {
    let categoryElement = document.createElement("li")
    categoryElement.classList.add("glide__slide")
    categoryElement.innerHTML = `
    <div class="card-section-annunci">
    <h5 class="mt-3">${annuncio.category}</h5>
    <h3>${annuncio.name}</h3>
    <h4 class="presto-icone-gradient">${annuncio.price}€</h4>
    <i class="fas fa-award fa-3x categorie-icone-gradient"></i>
    </div>
    `
    return categoryElement
}