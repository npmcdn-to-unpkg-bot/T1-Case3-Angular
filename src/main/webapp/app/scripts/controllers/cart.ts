'use strict';
/**
 * @ngdoc function
 * @name CartController
 * @description
 * # CartController
 * Controller
 */
angular.module('kantileverAngular').controller('cartController', function ($scope, orderService) {

  $scope.order = orderService.newOrder;
  $scope.products = $scope.order.products;

  $scope.addToCart = function (product) {
    var isInCart = false;

    for (var i = 0; i < $scope.products.length; i++) {
      if ($scope.products[i].id === product.content.id) {
        isInCart = true;

        $scope.products[i].amount += 1;
        break;
      }
    }

    if (!isInCart) {
      product.content.amount = 1;
      $scope.products.push(product.content);
    }
    $scope.order.totalPrice += product.content.price;
    $scope.setLocalStorage($scope.order);
  };

  $scope.removeProduct = function (product) {
    for (var i = 0; i < $scope.products.length; i++) {
      if (product.id === $scope.products[i].id) {
        var cartProduct = $scope.products[i];
        if (cartProduct.amount > 1) {
          cartProduct.amount -= 1;
        }
        else {
          $scope.products.splice(i, 1);
        }
      }
    }
    $scope.order.totalPrice -= product.price;
    $scope.setLocalStorage($scope.order);
  };

  $scope.setLocalStorage = function(order) {
    if ($scope.products.length === 0){
      localStorage.removeItem('order');
    }
    else {
      localStorage.setItem('order', JSON.stringify(order));
    }
  };

  $scope.emptyCart = function () {
    $scope.order = orderService.emptyCart();
    $scope.products.length = 0;
  };

  $scope.getCartItemAmount = function () {
    var order = JSON.parse(localStorage.getItem('order'));
    var amount = 0;
    if (order === null) {
      return 0;
    }
    else {
      for (var i = 0; i < order.products.length; i++) {
        amount += order.products[i].amount;
      }
      return amount;
    }
  };

});
