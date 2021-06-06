import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Product from "App/Models/Product";
import ProductCategory from "App/Models/ProductCategory";

export default class ProductSubCategories extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public status: boolean;

  @hasMany(() => Product)
  public products: HasMany<typeof Product>;

  @column()
  public productCategoryId: number;

  @belongsTo(() => ProductCategory)
  public productCategory: BelongsTo<typeof ProductCategory>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
