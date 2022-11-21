let products = [];
const wrapperElement = document.querySelector('.wrapper');



fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
    products = data.products;
    console.log(products)
    addProductsToPage(products);
  });


function addProductsToPage(products) {
  products.forEach((product) => {
    const itemColumnElement = createColumnElement();
    const card = createCardElement();
    const cardImage = createCardImage(product);
    const cardBody = createCardBody(product);
    const cartButton = createCartButton();

    card.append(cardImage, cardBody);
    card.append(cartButton)
    itemColumnElement.append(card);

    wrapperElement.append(itemColumnElement);

    cartButton.addEventListener('click', (event) => {
      const cartProducts = document.querySelector('.cartProducts')

      const itemColumnElement = createColumnElementCart();
      const card = createCardElement();
      const cardImage = createCardImage(product);
      const cardBody = createCardBody(product);
      const cartButtonDelete = createCartButtonDelete();

      card.append(cardImage, cardBody);
      card.append(cartButtonDelete)
      itemColumnElement.append(card);

      cartProducts.append(itemColumnElement);

      cartButtonDelete.addEventListener('click', (event) => {
        if (event.target) {
          const cartElement = document.querySelector('.cart-element')
          cartElement.remove()
        }
      })
    })
  });
}



const mainContainer = document.querySelector('.container')
mainContainer.addEventListener('click', (event) => {
  if (event.target) {
    const closeWindowCart = document.querySelector('.cart')
    closeWindowCart.classList.remove('hide')
  }
})

const cart = document.getElementById('cart')
cart.addEventListener('click', onCartClick)
function onCartClick(event) {
  if (event.target) {
    const cartList = document.querySelector('.cart')
    cartList.classList.toggle('hide')
  }
}

function createColumnElementCart() {
  return createElement('div', ['col-sm-12', 'col-md-3', 'column-item', 'cart-element']);
}

function createCartButtonDelete() {
  return createElement('button', ['btn', 'btn-danger', 'cart-button-delete'], null, 'delete from cart')
}

function createCartButton() {
  return createElement('button', ['btn', 'btn-success', 'cart-button'], null, 'add to cart')
}

function createColumnElement() {
  return createElement('div', ['col-sm-12', 'col-md-3', 'column-item']);
}

function createCardElement() {
  return createElement('div', ['card', 'h-100', 'card-item']);
}

function createCardImage(product) {
  const imageAttributes = [
    {
      prop: 'src',
      value: product.thumbnail,
    },
    {
      prop: 'alt',
      value: product.title,
    },
  ];
  const imageElement = createElement('img', ['card-img-top', 'card-image'], imageAttributes);
  const imageContainerElement = createElement('div', ['image-container'], null, null, [imageElement], 'append');

  return imageContainerElement;
}

function createCardBody(product) {
  const bodyTitle = createElement('h5', ['card-title'], null, product.title);
  const bodyText = createElement('p', ['card-text', 'flex-grow-1'], null, product.description);
  const priceElement = createElement('p', null, null, `Price: ${product.price}$`);
  const ratingElement = createElement('p', null, null, `Rating: ${product.rating}`);
  const cardFooter = createElement('div', ['card-footer', 'd-flex', 'justify-content-between', 'align-items-center'], null, null, [priceElement, ratingElement], 'append');
  const cardBody = createElement('div', ['card-body', 'd-flex', 'flex-column'], null, null, [bodyTitle, bodyText, cardFooter], 'append');

  return cardBody;
}

function createElement(tag, classList, attributes, textContent, children, childrenAction) {
  const element = document.createElement(tag);

  if (classList?.length) {
    element.classList.add(...classList);
  }

  if (attributes?.length) {
    attributes.forEach(({ prop, value }) => {
      element.setAttribute(prop, value);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (children) {
    element[childrenAction](...children);
  }

  return element;
}


const navForm = document.querySelector('.myForm');
navForm.addEventListener('submit', (event) => {
  event.preventDefault();
})
const searchDiv = document.querySelector('.searchDiv')


const searchInput = document.getElementById('search')
searchInput.addEventListener('change', (event) => {
  if (event.target.value === '') {
    console.log('no res')

  }
  let product = document.querySelectorAll('.column-item')

  product.forEach(el => {

    if (el.textContent.toLowerCase().trim().includes(event.target.value.toLowerCase().trim())) {


      searchDiv.classList.add('hide')
      const searchProduct = createElement('div')
      searchDiv.append(searchProduct)
      searchProduct.append(el)

    }
  });
})

mainContainer.addEventListener('click', closeSearchWindow)

function closeSearchWindow(event) {
  if (event.target) {

    searchDiv.classList.remove('hide')
  }
}

