import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Post from "./post.model";
import Role from "./role.model";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  public getPosts!: () => Promise<Post[]>;

  public addRole!: (role: Role) => Promise<void>;
  public getRoles!: () => Promise<Role[]>;
  public removeRole!: (role: Role) => Promise<void>;

  public createAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);

export default User;
