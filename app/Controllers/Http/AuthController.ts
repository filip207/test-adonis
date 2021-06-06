import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    // TODO: add/improve validation & error handler
    try {
      /* simple validation */
      const validationSchema = schema.create({
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.unique({ table: "users", column: "email" }),
        ]),
        username: schema.string({ trim: true }),
        password: schema.string({ trim: true }, [rules.confirmed()]),
      });

      const userDetails = await request.validate({
        schema: validationSchema,
      });

      const user = new User();
      user.email = userDetails.email;
      user.username = userDetails.username;
      user.password = userDetails.password;
      await user.save();
      const token = await auth.use("api").login(user);
      return token;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async login({ auth, request }: HttpContextContract) {
    // TODO: add/improve validation & error handler
    try {
      const email = request.input("email");
      const password = request.input("password");
      const token = await auth.use("api").attempt(email, password);
      return token;
    } catch (error) {
      // TODO: error handler
      console.log(error);
      return false;
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect("/");
  }
}
