import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductSubCategory from "App/Models/ProductSubCategory";

export default class ProductSubCategoriesController {
  public async index({}: HttpContextContract) {
    const subCategories = await ProductSubCategory.all();
    return subCategories;
  }

  public async update(
    { request, params }: HttpContextContract // TODO: add/improve validation & error handler
  ) {
    try {
      const subCategory = await ProductSubCategory.find(params.id);

      if (subCategory) {
        subCategory.name = request.input("name");
        subCategory.productCategoryId = request.input("product_category_id");
        subCategory.status = request.input("status") ? true : false;
        await subCategory.save();
        return subCategory;
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
      const subCategory = new ProductSubCategory();

      subCategory.name = request.input("name");
      subCategory.productCategoryId = request.input("product_category_id");
      subCategory.status = request.input("status") ? true : false;
      await subCategory.save();
      return subCategory;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async destroy({ params }: HttpContextContract) { // TODO: add/improve validation & error handler
    
    try {
      await ProductSubCategory.query().where("id", params.id).delete();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
