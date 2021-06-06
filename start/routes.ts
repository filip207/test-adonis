/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});
Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.group(() => {

    /* ProductCategories */
    Route.group(() => {
      Route.get("/", "ProductCategoriesController.index");
      Route.post("/", "ProductCategoriesController.store");
      Route.put("/:id", "ProductCategoriesController.update");
      Route.delete("/:id", "ProductCategoriesController.destroy");
    }).prefix("/categories");

    /* ProductSubCategories */
    Route.group(() => {
      Route.get("/", "ProductSubCategoriesController.index");
      Route.post("/", "ProductSubCategoriesController.store");
      Route.put("/:id", "ProductSubCategoriesController.update");
      Route.delete("/:id", "ProductSubCategoriesController.destroy");
    }).prefix("/sub-categories");

    /* Products */
    Route.group(() => {
      Route.get("/", "ProductsController.index");
      Route.get("/:id", "ProductsController.show");
      Route.post("/", "ProductsController.store");
      Route.put("/:id", "ProductsController.update");
      Route.delete("/:id", "ProductsController.destroy");

    }).prefix("/products");
  }).middleware("auth");
}).prefix("/api/v1");

Route.post("logout", "AuthController.logout").as("logout");
