module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'display_name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'users'
    });

    User.associate = function (models) {
        User.hasMany(models.BlogPost, {
            foreignKey: 'userId',
            as: 'blogPosts'
        });
    };

    return User;
};
