const Sequelize=require("sequelize");

const database=new Sequelize("Gadgets-Store","gadgets","123456",{
    host:"localhost",
    dialect:"mysql2",
    logging:false
});

const Users=database.define("users",{
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Email:{
        unique:true,
        type:Sequelize.STRING
    },
    Phone:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

const Vendors=database.define("vendors",{
    CompanyName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    CompanyAddress:{
        type:Sequelize.STRING,
        allowNull:false
    },
    CompanyPhone:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    CompanyEmail:{
        unique:true,
        type:Sequelize.STRING,
        allowNull:false
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

const Cartitems=database.define("cart-items",{
    quantity:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
});

const Orders=database.define("orders",{
    quantity:{
        type:Sequelize.INTEGER,
        defaultValue:1
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:"Confirmation Pending"
    },
    time:{
        type:Sequelize.STRING,
        allowNull:false
    },
    method:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

const Products=database.define("products",{
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    productType:{
        type:Sequelize.STRING,
    },
    productSubtype:{
        type:Sequelize.STRING,
    },
    Price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

Cartitems.belongsTo(Users);
Cartitems.belongsTo(Products);

Orders.belongsTo(Users);
Orders.belongsTo(Products);
Orders.belongsTo(Vendors);

Products.belongsTo(Vendors);
Vendors.hasMany(Products);

module.exports={
    database,
    Users,
    Vendors,
    Products,
    Cartitems,
    Orders
}
