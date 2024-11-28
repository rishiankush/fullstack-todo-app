import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface TodoAttributes {
  id: number;
  title: string;
  userId: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type TodoCreationAttributes = Optional<TodoAttributes, "id">;

export class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: number;
  public title!: string;
  public userId!: string;
  public completed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
  }
);
