require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  test(' se fetchProducts é uma função;',() => {
    expect(typeof fetchProducts).toBe('function')
  });

  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    await fetchProducts('Computador')
    expect(fetch).toHaveBeenCalled()
  });

  test('se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('Computador')
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });

  test('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    await expect(fetchProducts('Computador')).toEqual(computadorSearch)
  });

  test('se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    await expect(fetchProducts()).rejects.toThrow(new Error('You must provide an url'));
  });
});
