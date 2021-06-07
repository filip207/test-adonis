import User from "App/Models/User";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUser from "App/Validators/CreateUserValidator";

export default class AuthController {
  public async register({ request, auth, response }: HttpContextContract) {
    // TODO: add/improve validation & error handler
    try {
      const userDetails = await request.validate(CreateUser);

      const user = new User();
      user.email = userDetails.email;
      user.username = userDetails.username;
      user.password = userDetails.password;
      await user.save();
      const token = await auth.use("api").login(user);
      return token;
    } catch (error) {
      console.log(error);
      return response.badRequest(error.messages);
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    // TODO: add/improve validation & error handler
    try {
      const email = request.input("email");
      const password = request.input("password");
      const token = await auth.use("api").attempt(email, password);
      return token;
    } catch (error) {
      console.log(error);
      // TODO: error handler
      return response.badRequest("Failed! Please check your email or password.");
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect("/");
  }
}
