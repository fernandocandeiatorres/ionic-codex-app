import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
    table.increments('id').primary()
    table.string('name', 255).notNullable().unique()
    table.string('email', 255).notNullable().unique()
    table.string('password', 180).notNullable()
    table.string('gender', 10).notNullable()
    table.string('todos').notNullable()
    table.string('completos').notNullable()
    table.string('image')
    table.integer('age').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}