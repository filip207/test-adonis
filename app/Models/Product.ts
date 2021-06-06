import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import ProductCategory from "App/Models/ProductCategory";
import ProductSubCategory from "App/Models/ProductSubCategory";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public price: number;

  @column()
  public status: number;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column()
  public productCategoryId: number;

  @belongsTo(() => ProductCategory)
  public productCategory: BelongsTo<typeof ProductCategory>;

  @column()
  public productSubCategoryId: number;

  @belongsTo(() => ProductSubCategory)
  public productSubCategory: BelongsTo<typeof ProductSubCategory>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
