import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string("username").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("remember_me_token").nullable();
      table.enum("type", ["admin", "vendor"]).defaultTo("admin");
      table.string("first_name").nullable();
      table.string("last_name").nullable();
      table.string("gender").nullable();
      table.string("contact_number").nullable();
      table.string("address").nullable();
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
