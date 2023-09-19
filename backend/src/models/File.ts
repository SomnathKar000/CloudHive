import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./User";

export class File extends Model {
  public id!: number;
  public filename!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "File",
    tableName: "files",
    timestamps: true,
  }
);

File.belongsTo(User, { foreignKey: "userId" });
