import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Todos extends BaseSchema {
  protected tableName = "products";
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title");
      table.text("description").nullable();
      table.integer("price").nullable();
      table.integer("user_id").unsigned().references("users.id").onDelete('CASCADE');
      table.integer("product_category_id").unsigned().references("product_categories.id").onDelete('CASCADE');
      table.integer("product_sub_category_id").unsigned().references("product_sub_categories.id").onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }
  public async down() {
    this.schema.dropTable(this.tableName);
  }
}