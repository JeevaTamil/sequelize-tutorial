import User from "./models/user.model";
import Post from "./models/post.model";
import Role from "./models/role.model";
import UserRole from "./models/userRole.model";

User.hasMany(Post, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  otherKey: "userId",
  as: "users",
});
