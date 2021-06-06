import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class ProductSubCategories extends BaseSchema {
  protected tableName = "product_sub_categories"

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.integer("product_category_id").unsigned().references("product_categories.id").onDelete('CASCADE');
      table.boolean("status").defaultTo(false);
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
