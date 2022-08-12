const saveCartItems = (cartItemsList) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItemsList));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
