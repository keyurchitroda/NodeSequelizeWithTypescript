import { Model, Optional,Sequelize,DataTypes} from 'sequelize';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password:string;
  role:string
};

/*
  We have to declare the UserCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

module.exports = (sequelize:Sequelize,Sequelize:any)=>{
    
    const User = sequelize.define<UserInstance>('user',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            unique: true,
          },
          firstName: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          lastName: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          email: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          password: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          role: {
            type: Sequelize.ENUM("user", "admin"),
            defaultValue: "user",
          },
      
    },
    {
        freezeTableName: true,
        timestamps: true,
      })
    return User
}