var itemList =
[
  { name: "Item 1", quantity: 10 },
  { name: "Item 2", quantity: 20 },
  { name: "Item 3", quantity: 30 },
  { name: "Item 4", quantity: 40 },
  { name: "Item 5", quantity: 50 }
];

(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
    var service = this;
    var buyItems = itemList;
    var boughtItems = [];

    service.buyItem = function(index) {
      boughtItems.push(buyItems[index]);
      buyItems.splice(index, 1);
    }

    service.removeItem = function(index) {
      buyItems.push(boughtItems[index]);
      boughtItems.splice(index, 1);
    }

    service.getBuyItemList = function() {
      return buyItems;
    }

    service.getBoughtItemList = function() {
      return boughtItems;
    }

};

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
    var toBuyController = this;

    toBuyController.buyList = ShoppingListCheckOffService.getBuyItemList();

    toBuyController.buy = function(index) {
      ShoppingListCheckOffService.buyItem(index);
    };
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtController = this;

  alreadyBoughtController.boughtList = ShoppingListCheckOffService.getBoughtItemList();

  alreadyBoughtController.remove = function(index) {
    ShoppingListCheckOffService.removeItem(index);
  };
};

})();
