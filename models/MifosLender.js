const {DataTypes} = require('sequelize');

module.exports.MifosLenderModel = (sequelize) => {
    return sequelize.define(
        'MifosLender',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lenderId: {
                type: DataTypes.STRING,
            },
            firstName:{
                type:DataTypes.STRING,
                allowNull:true
            },
            lastName:{
                type:DataTypes.STRING,
                allowNull:true
            },
            phoneNumber:{
                type:DataTypes.STRING,
                allowNull:true
            },
            emailAddress:{
                type:DataTypes.STRING,
                allowNull:true,  
            }
            
        },
        {
            // Other model options go here
            freezeTableName: true,
            //tableName: 'tablename',
            timestamps: true,
        }
    );
}