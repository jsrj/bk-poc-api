### <strong> Basic Usage of The bk-poc-api </strong>
___
This API serves as a basic proof of concept for creating one endpoint that serves data aggregated from two separate API's and their corresponding endpoints.

 Specifically, it aggregates information about a product's name and price from one endpoint, and it's corresponding inventory count from a separate endpoint.

___
 #### Endpoints: 

Root Endpoint
* URL: `https://bk-poc-api.herokuapp.com/`
* <em>Description:</em> This is the index/root endpoint for the API. If this is queried, it will return these instructions in JSON format.
    
GET All Items
 * URL: `https://bk-poc-api.herokuapp.com/items`
 * <em>Description:</em> Returns an aggregated list of all products and their corresponding inventory count in JSON format.

GET Item By Name
* URL: `https://bk-poc-api.herokuapp.com/items/{itemName}`
* <em>Description:</em> Returns a specific item by item name (or an error message if no item by that name exists), where the ```{itemName}``` placeholder would be the desired item's name.
 
