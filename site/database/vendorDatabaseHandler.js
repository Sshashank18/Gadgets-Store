const {Users,Products,Vendors,Orders,Cartitems}=require('./database');
const bcrypt=require('bcrypt');

const productParser=(products)=>{                       //parser means to break into small parts
    let productData=[];
    products.map(product => productData.push(product.get())); // product.get() is all the data present in product object
    return productData;
}

const addVendor=(CompanyName,CompanyAddress,CompanyEmail,CompanyPhone,Password)=>{
    bcrypt.hash(Password,10,function(err,hash){
        Vendors.create({
            CompanyName,
            CompanyAddress,
            CompanyPhone,
            CompanyEmail,
            Password:hash
        });
    });
}

const addProduct=(Name,Price,productType,productSubtype,image,vendorId)=>{
    Products.create({
        Name,
        Price,
        productType,
        productSubtype,
        image,
        vendorId,
    })
    .then(products=>products);
}

const getProducts=(vendorId)=>{
    return Products.findAll({
        attributes:['id','image','Name','Price','productSubtype','productType'],
        where:{
            vendorId
        }
    }).then(products=>products);
}

const deleteProduct=(vendorId,productId)=>{
    return Products.destroy({
        where:{
            id:productId,
            vendorId
        }
    })
}

const getOrders=(vendorId)=>{
    return Orders.findAll({
        where:{
            vendorId
        },
        attributes:['id','quantity','method','time','status'],
        include:[
            {
                model:Users,
                attributes:["Name","Address","Mobile"]
            },
            {
                model:Products,
                attributes:["Name","Price","image"]
            }
        ]
    })
    .then(orders=>productParser(orders));
}

const dispatchedOrder=(orderId)=>{
    return Orders.update({
        status:"Dispatched"
    },{
        where:{
            id:orderId
        }
    });
}

const declineOrder=(orderId)=>{
    return Orders.update({
        status:"Declined"
    },{
        where:{
            id:orderId
        }
    });
}

const getUsername=(vendorId)=>{
    return Vendors.findOne({
        where:{
            id:vendorId
        },
        attributes:["CompanyName"]
    })
    .then(vendor=>vendor);
}


module.exports={
    addVendor,
    addProduct,
    getProducts,
    deleteProduct,
    getOrders,
    dispatchedOrder,
    declineOrder,
    getUsername
}