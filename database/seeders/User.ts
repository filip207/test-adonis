import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        email: 'a@test.com',
        username: 'a',
        firstName: 'a',
        lastName: 'a',
        gender: 'male',
        contactNumber: '1234567890',
        password: '123',
        address: 'a',
      },
      {
        email: 'b@test.com',
        username: 'b',
        firstName: 'b',
        lastName: 'b',
        gender: 'female',
        contactNumber: '1234567890',
        password: '123',
        address: 'b',
      }
    ])
  }
}
