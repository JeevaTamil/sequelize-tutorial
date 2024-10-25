import { log } from "console";
import sequelize from "./config/database";
import User from "./models/user.model";
import Post from "./models/post.model";
import Role from "./models/role.model";
import UserRole from "./models/userRole.model";
import "./associations";

async function main() {
  await dbConnectionEstablishment(false);

  // await getPostsByUserId(1);
  const adminRole = await fetchRole("Admin");
  const userRole = await fetchRole("User");
  const user = await fetchUserById(1);

  if (adminRole && userRole && user) {
    await user.addRole(adminRole);
    await user.addRole(userRole);
    log("Admin role added to user:", user.name);
  } else {
    log("no role named: Admin or no user with id 1");
  }
}

main();

async function dbConnectionEstablishment(shouldForceSync: boolean) {
  await sequelize.authenticate();
  log("db connection established");

  await sequelize.sync({ force: shouldForceSync });
  log("all models were synced forcefully");
}

async function createUser(name: string, email: string) {
  try {
    const createdUser = await User.create({ name: name, email: email });
    log(`New user created ${createUser.name}`);
    return createdUser;
  } catch (error) {
    log(`Error on creating user ${error}`);
  }
}

async function fetchUserById(userId: number) {
  const fetchedUser = await User.findOne({
    where: {
      id: userId,
    },
  });

  log("fetched User: ", fetchedUser?.toJSON());
  return fetchedUser;
}

async function createPost(title: string, content: string, userId: number) {
  try {
    const post = await Post.create({
      title: title,
      content: content,
      userId: userId,
    });
    log(`Post created successfully: ${post}`);
  } catch (error) {
    log(`Error on creating post ${error}`);
  }
}

async function fetchAllUsers() {
  return await User.findAll();
}

async function fetchUserWithPosts(userId: number) {
  const userWithPost = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: Post,
        as: "posts",
      },
    ],
  });

  return userWithPost?.toJSON();
}

async function createRole(name: string) {
  try {
    const createdRole = await Role.create({ name: name });
    log(`Role created successfully: ${createdRole.toJSON()}`);
    return createdRole;
  } catch (error) {
    log(`Error on creating role: ${error}`);
  }
}

async function fetchRole(name: string) {
  try {
    const fetchedRole = await Role.findOne({ where: { name: name } });
    log("fetched role: ", fetchedRole?.name);
    return fetchedRole;
  } catch (error) {
    log(`Error on fetching role: ${error}`);
  }
}

async function getPostsByUserId(userId: number) {
  const user = await fetchUserById(userId);
  const posts = await user?.getPosts();

  log(`posts by user id ${userId}: `, posts);
}
