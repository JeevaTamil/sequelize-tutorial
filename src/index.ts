import { log } from "console";
import sequelize from "./config/database";
import User from "./models/user.model";

async function main() {
  try {
    await sequelize.authenticate();
    log("db connection established");

    await sequelize.sync();
    log("all models were synced forcefully");

    const user = await User.create({
      name: "Jeeva",
      email: "jeevat13@gmail.com",
    });
    log(`user created: ${user.toJSON()}`);

    const allUsers = await User.findAll();
    log(allUsers);
  } catch (error) {
    log(`Unable to connect the database ${error}`);
  }
}

main();
