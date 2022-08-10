const fetchItem = async (itemId) => {
  const endpoint = `https://api.mercadolibre.com/items/${itemId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

console.log(fetchItem('MLB1615760527'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
