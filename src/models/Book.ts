import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'books',
    timestamps: false,
})
export class Book extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
    })
    declare isbn: bigint;

    @Column({
        type: DataType.STRING(120),
        allowNull: false
    })
    declare title: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare author: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare publisher: string;

    @Column({
        type: DataType.STRING(6),
        allowNull: false
    })
    declare publication_year: string;

    @Column({
        type: DataType.STRING(6),
        allowNull: false,
        unique: true
    })
    declare location: string;
}

export default Book;