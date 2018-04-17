
const express = require('express');
const request = require('request');
const router  = express.Router();

/* Aggregates data from two separate API endpoints  */
/* GET API Root */
router.get('/', (req, res, next) => {
  res.json({
    "GET All Items" : {
      URL : "http://localhost:3000/items",
      Description : "Returns an aggregated list of all products and their corresponding inventory in JSON format."
    },
    "GET Item By Name" : {
      URL : "http://localhost:3000/items/{itemName}",
      Description : "Returns the aggregated name, price, and inventory count of a specific item who's name is entered into the area occupied by the {itemName} placeholder."
    }
  });
});

const baseURI = 'http://autumn-resonance-1298.getsandbox.com';

// First retrieve inventory list to correlate to products
queryFor = (endPointName) => {
  return new Promise((get, reject) => {
    request(`${baseURI}/${endPointName}`, (err, res, body) => {
      if (err == null) {
        get((res.statusCode == 200)? JSON.parse(body) : err);
      } else {
        reject(err);
      }
    });
  });  
};

/* GET /items : returns list of products with their associated inventory */
router.get('/items', (req, res, next) => {
  let inventory = null;
  let items = [];
  queryFor('inventory').then(inventoryResults => {
    inventory = inventoryResults.inventory;
  })
  .then(() => {
    queryFor('products').then(productResults => {
      productResults.forEach(product => {
        inventory.forEach(item => {
          if (item.name == product.name) {
            let itemObject = {
              name: product.name,
              price: product.price,
              inventory: item.inventory
            };
            items.push(itemObject);
          }
        });
      });
    })
    .then(() => {
      res.json(items);
    });
  });
});

/* GET /items/:itemName : returns specific product with it's associated inventory, by product name */
router.get('/items/:itemName', (req, res, next) => {
  let inventory = null;
  let name      = req.params.itemName.toLowerCase();
  queryFor(`inventory/${name}`).then(inventoryResults => {
     inventory = (inventoryResults.inventory.length > 0)? inventoryResults.inventory[0].inventory : null;
  })
  .then(() => {
    queryFor(`products/${name}`).then(productResults => {
      let itemObject = (productResults.product.length > 0)?  
      {
        name: productResults.product[0].name,
        price: productResults.product[0].price,
        inventory: inventory
      } 
      :
      { 
        error : `Could not locate '${name}' in inventory. Please check the name and try again.` 
      } ;
      res.json(itemObject);
    })
  });
});
module.exports = router;
