'use strict';

describe('Controller: cartController', function () {

  var scope, ctrl, window;
  var productJSON = {
    "content": {
      "id": "98765",
      "name": "bike",
      "amount": 1,
      "price": 125.5
    },
    "links": [
      {
        "rel": "self",
        "href": "http://localhost:6789/products/98765/"
      },
      {
        "rel": "previous_step",
        "href": "http://localhost:6789/products/98764/"
      },
      {
        "rel": "next_step",
        "href": "http://localhost:6789/products/98766/"
      },
      {
        "rel": "update",
        "href": "http://localhost:6789/products/98765/"
      },
      {
        "rel": "delete",
        "href": "http://localhost:6789/products/98765/"
      }
    ]
  };

  beforeEach(function () {
    module('kantileverAngular');
    inject(function ($controller, _$rootScope_, $window) {
      scope = _$rootScope_.$new();
      window = $window;
      ctrl = $controller('cartController', {$scope: scope});
      productJSON.content.amount = 1;
    });
  });

  afterEach(function() {
    window.localStorage.clear();
  });

  it('should check if a product is already present in the shopping cart', function () {
    scope.addToCart(productJSON);
    scope.addToCart(productJSON);
    scope.addToCart(productJSON);
    scope.addToCart(productJSON);
    expect(scope.products[0].amount).toBe(4);
  });
  it('should remove an item from the shopping cart', function () {
    window.localStorage.setItem('order', {});
    scope.addToCart(productJSON);
    expect(scope.getCartItemAmount()).toBe(1);
    scope.removeProduct(productJSON.content);
    expect(scope.getCartItemAmount()).toBe(0);
  });
  it('should remove all items from the shopping cart', function () {
    scope.addToCart(productJSON);
    scope.addToCart(productJSON);
    expect(scope.getCartItemAmount()).toBe(2);
    scope.emptyCart();
    expect(scope.getCartItemAmount()).toBe(0);
  });
  it('should reduce the item amount by one when it is removed and there are multiple in the shopping cart', function() {
    var product = {
      id: 1,
      amount: 2,
      price: 0
    };

    scope.products.push(product);
    expect(scope.products.length).toBe(1);
    expect(scope.products[0].amount).toBe(2);
    scope.removeProduct(product);
    expect(scope.products.length).toBe(1);
    expect(scope.products[0].amount).toBe(1);
  });
});
