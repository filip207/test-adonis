import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import CreateProduct from "App/Validators/CreateProductValidator";

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.all();
    return products;
  }

  public async byUserId(
    { auth }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    const user = await auth.authenticate();
    await user.preload("products");
    const products = user.products;
    return products;
  }

  public async show(
    { params }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    try {
      const product = await Product.find(params.id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  public async update(
    { request, params }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    try {
      const product = await Product.find(params.id);

      if (product) {
        product.title = request.input("title");
        product.description = request.input("description");
        product.productCategoryId = request.input("product_category_id");
        product.productSubCategoryId = request.input("product_sub_category_id");
        await product.save();
        return product;
      }

      return; // 401
    } catch (error) {
      return error;
    }
  }

  public async store(
    { auth, request, response }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    try {
      const productDetails = await request.validate(CreateProduct);
      const user = await auth.authenticate();
      const product = new Product();

      product.title = productDetails.title;
      product.description = productDetails.description;
      product.productCategoryId = productDetails.product_category_id;
      product.productSubCategoryId = productDetails.product_sub_category_id;
      product.userId = user.id;
      await product.save();
      return product;
    } catch (error) {
      console.log(error);
      return response.badRequest(error.messages);
    }
  }

  public async destroy({ auth, params }: HttpContextContract) {
    try {
      const user = await auth.authenticate();
      if (user.type === "admin") {
        await Product.query().where("id", params.id).delete();
      } else {
        await Product.query()
          .where("user_id", user.id)
          .where("id", params.id)
          .delete();
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
