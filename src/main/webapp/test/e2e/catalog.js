describe('E2E: Catalog', function () {

  beforeEach(function () {
    browser.get('http://localhost:8080/#/catalog');
  });

  it('should add an item to the shopping cart when the button is pressed', function () {
    var addButton = element(by.id('add'));
    var cartAmountSpan = element(by.id('cartAmount'));
    expect(cartAmountSpan.getText()).toEqual('0');
    addButton.click();
    expect(cartAmountSpan.getText()).toEqual('1');
  });

  it('should sort the catalog by name when name is clicked', function () {
    var nameHeader = element(by.id('sortName'));
    var products = by.repeater('product in products.content');
    var name1 = element(products.row(0)).element(by.id('name'));
    var name2 = element(products.row(1)).element(by.id('name'));

    expect(name2.getText()).toBeGreaterThan(name1.getText());
    nameHeader.click();
    expect(name1.getText()).toBeGreaterThan(name2.getText());
  });

  it('should sort the catalog by price when price is clicked', function () {
    var priceHeader = element(by.id('sortPrice'));
    var products = by.repeater('product in products.content');

    var price1 = function (products) {
      return element(products.row(0)).element(by.id('price')).getText().then(function (text) {
        return parseFloat(text.substring(1).replace(',', ''));
      });
    };
    var price2 = function (products) {
      return element(products.row(1)).element(by.id('price')).getText().then(function (text) {
        return parseFloat(text.substring(1).replace(',', ''));
      });
    };

    var newPrice1 = price1(products);
    var newPrice2 = price2(products);
    expect(newPrice2).toBeGreaterThan(newPrice1);
    priceHeader.click();
    newPrice1 = price1(products);
    newPrice2 = price2(products);
    expect(newPrice1).toBeGreaterThan(newPrice2);
  });

  it('should filter the catalog when the search bar has input', function() {
    var products = by.repeater('product in products.content');
    expect(element.all(products).count()).toBe(4);
    element(by.model('searchProduct')).sendKeys('bicycle');
    expect(element.all(products).count()).toBe(1);
  });

});
