import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Product from "App/Models/Product";
import ProductSubCategory from "App/Models/ProductSubCategory";

export default class ProductCategories extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public status: boolean;

  @hasMany(() => Product)
  public products: HasMany<typeof Product>;

  @hasMany(() => ProductSubCategory)
  public productSubCategories: HasMany<typeof ProductSubCategory>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
