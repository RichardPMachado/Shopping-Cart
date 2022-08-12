const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
// const totalPrice = document.querySelector('#total-price');

let organizadorLocalStorage = []; // aula do Guthias e da Hellen

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `$${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const remover = event.target;
  console.log(remover.id);
  remover.remove(event.target);
  // const aux = organizadorLocalStorage.filter((a) => a.sku === remover.id);
  const indice = organizadorLocalStorage.findIndex((a) => a.sku === remover.id);
  organizadorLocalStorage = organizadorLocalStorage.filter((_, i) => i !== indice);
  console.log(organizadorLocalStorage);
  // const cartList = document.querySelector('.cart__items');
  // const cartItemsList = cartList.innerHTML;
  saveCartItems(organizadorLocalStorage);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addCarrinho = async (event) => {
  const ids = getSkuFromProductItem(event.target.parentElement);
  const item = await fetchItem(ids);
  const itemCarrinho = { 
    sku: item.id,
    name: item.title, 
    salePrice: item.price,
  };
  organizadorLocalStorage.push(itemCarrinho);
  cartItems.appendChild(createCartItemElement(itemCarrinho));
  saveCartItems(organizadorLocalStorage);
  // console.log(organizadorLocalStorage);
  return itemCarrinho;
};

const infosFetchProducts = async (query) => {
  const { results } = await fetchProducts(query);
  results.forEach((result) => {
    const criarProduto = createProductItemElement({
    sku: result.id,
    name: result.title,
    image: result.thumbnail,
    price: result.price,
  });
    items.appendChild(criarProduto);
  });
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((e) => e.addEventListener('click', addCarrinho));
  return results;
};

const render = () => {
  organizadorLocalStorage = getSavedCartItems('cartItems') || [];
  console.log(organizadorLocalStorage);
  organizadorLocalStorage.forEach((e) => cartItems.appendChild(createCartItemElement(e)));
};

window.onload = async () => { 
  await infosFetchProducts('computador');
  render();
};
