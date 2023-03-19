
let loadAllProducts = async () => {
  let url = 'products.json'
  let response = await fetch(url)
  let data = await response.json()
  displayAllData(data)
}

let displayAllData = (allProducts) => {
  let AllCardContainer = document.getElementById('cards-container')
  allProducts.forEach(product => {
    let { id, name, description, price, image } = product
    let bookMarked = checkBookMark(id)
    let card = document.createElement('div')
    card.classList.add('card', 'w-full', 'bg-base-100', 'shadow-xl', 'glass')
    card.innerHTML = `
        <div class = "flex justify-end gap-4 my-4 px-4">
        <i onclick="${bookMarked ? `removeBookMark('${id}')` : `addBookMark('${id}', '${name}', '${price}')` }" class=
        "${ bookMarked ? 'fa-solid fa-bookmark fa-2x text-green-500' : 'fa-regular fa-bookmark fa-2x text-green-500'}"
         id="thin-icon"></i>
        </div>
        <figure><img src="${image}" class="h-[350px] w-full" alt="Product image unavailable" />
        </figure>
                <div class="card-body">
                
                  <h2 class="card-title text-2xl">${name}</h2>
                  <p>${description}</p>
                  <div class="card-actions justify-center">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
        `
    AllCardContainer.appendChild(card)
  });
}

let addBookMark = (id, name, price) => {
  let previousBookMark = JSON.parse(localStorage.getItem('bookmark'))
  
  let bookmark = []
  let productDetails = { id, name, price }
  if (previousBookMark) {
    if (previousBookMark.find((pId) => pId.id == id)) {
    } else {
      bookmark = [...previousBookMark, productDetails]
      localStorage.setItem('bookmark', JSON.stringify(bookmark))
    }
  } else {
    bookmark.push(productDetails)
    localStorage.setItem('bookmark', JSON.stringify(bookmark))
  }
}
let removeBookMark = (id) => {
  let previousBookMark = JSON.parse(localStorage.getItem('bookmark'))
  let restProduct = previousBookMark?.filter((product) => product.id != id )
  localStorage.setItem('bookmark', JSON.stringify(restProduct))
}

let checkBookMark = (id) => {
  let previousBookMark = JSON.parse(localStorage.getItem('bookmark'));
  let markedProduct = previousBookMark?.find((product) =>product.id == id)
  if (markedProduct) {
    return true
  } else {
    return false
  }
}

loadAllProducts()