const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const remover = event.target.parentElement;
  remover.removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addCarrinho = async (event) => {
  const ids = getSkuFromProductItem(event.target.parentElement);
  const item = await fetchItem(ids);
  const itemCarrinho = { sku: item.id, name: item.title, salePrice: item.price };
  cartItems.appendChild(createCartItemElement(itemCarrinho));
  return itemCarrinho;
};

const infosFetchProducts = async (query) => {
  const { results } = await fetchProducts(query);
  results.forEach((result) => {
    const criarProduto = createProductItemElement({
    sku: result.id,
    name: result.title,
    image: result.thumbnail,
    });
    items.appendChild(criarProduto);
  });
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((e) => e.addEventListener('click', addCarrinho));
};

window.onload = async () => { 
  await infosFetchProducts('computador');
};
