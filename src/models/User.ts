import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
 	tableName: 'users',
	 timestamps: false
})
class User extends Model {
	
	@Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		unique: true,
	})
	declare email: string;

	@Column({
		type: DataType.CHAR(60),
		allowNull: false,
	})
	declare password: string;
}

export default User