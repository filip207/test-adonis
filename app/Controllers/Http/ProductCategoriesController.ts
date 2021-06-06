import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductCategory from "App/Models/ProductCategory";

export default class ProductCategoriesController {
  public async index({}: HttpContextContract) {
    const categories = await ProductCategory.all();
    return categories;
  }

  public async update(
    { request, params }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    try {
      const category = await ProductCategory.find(params.id);

      if (category) {
        category.name = request.input("name");
        category.status = request.input("status") ? true : false;
        await category.save();
        return category;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async store(
    { request }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    try {
      const category = new ProductCategory();

      category.name = request.input("name");
      category.status = request.input("status") ? true : false;
      await category.save();
      return category;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async destroy(
    { params }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    try {
      await ProductCategory.query().where("id", params.id).delete();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
