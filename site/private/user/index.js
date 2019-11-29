let companiesMobiles=$('#companiesMobiles');
let companiesLaptops=$('#companiesLaptops');
let companiesEarphones=$('#companiesEarphones');
let companiesPendrives=$('#companiesPendrives');
let companiesCameras=$('#companiesCameras');

let mobiles=$('#mobilesd');
let cameras=$('#camerasd');
let pendrives=$('#pendrivesd');
let earphones=$('#earphonesd');
let laptops=$('#laptopsd');

let filters = $(".filter");

const productbox=$('#product-box');
const cartTable=$('#cartTable');
let total=$("#total");

const disableFilters=()=>{
    filters.each((index,filter)=>{
        filter.setAttribute("hidden"," ");
    })
}

const categoryButton = $("#categoryButton");

mobiles.click(()=>{
    disableFilters();
    companiesMobiles[0].removeAttribute("hidden");
    categoryButton.text("Mobiles");
});

cameras.click(()=>{
    disableFilters();
    companiesCameras[0].removeAttribute("hidden");
    categoryButton.text("Cameras");
});
laptops.click(()=>{
    disableFilters();
    companiesLaptops[0].removeAttribute("hidden");
    categoryButton.text("Laptops");
});
pendrives.click(()=>{
    disableFilters();
    companiesPendrives[0].removeAttribute("hidden");
    categoryButton.text("Pendrives");
});
earphones.click(()=>{
    disableFilters();
    companiesEarphones[0].removeAttribute("hidden");
    categoryButton.text("Earphones");
});


const render=(products)=>{
    productbox.empty();
    products.map(product=>{
        productbox.append(`
            <div class="card" style="width: 18rem;">
                <img src="./images/${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.Name}</h5>
                    <p class="card-text">₹ ${product.Price}</p>
                    <button type="button" class="btn btn-danger addToCart" data-productid="${product.id}" data-name="${product.Name}" data-price="${product.Price}">Add To Cart</button>
                </div>
            </div>
        `)
    })
}

$('#mobiles').click((event)=>{
    $.get('/user/getProductHomepage?productType=Mobiles',render);
});

$('#cameras').click((event)=>{
    $.get('/user/getProductHomepage?productType=Cameras',render);
});

$('#pendrives').click((event)=>{
    $.get('/user/getProductHomepage?productType=Pendrives',render);
});

$('#laptops').click((event)=>{
    $.get('/user/getProductHomepage?productType=Laptops',render);
});

$('#gamingconsoles').click((event)=>{
    $.get('/user/getProductHomepage?productType=Gamingconsoles',render);
});

const renderCart=(cartItems)=>{
    cartTable.empty();
    cartItems.map(cartItem=>{
        cartTable.append(
            `
                <tr data-productid="${cartItem.product.id}" data-priceItem="${cartItem.product.Price}">
                    <td>${cartItem.product.Name}</td>
                    <td>${cartItem.quantity}</td>
                    <td>${cartItem.product.Price * cartItem.quantity}</td>
                    <td><button type="button" class="btn btn-danger delete">X</button></td>
                </tr>
            `
        )
        total.text(parseInt(total.text())+parseInt(cartItem.product.Price * cartItem.quantity));
    });
}

// $.get("/user/getCartItems",renderCart);

const addToCart=(cartItem)=>{
    $.post("/user/addCartItem",{
        productId:cartItem.Product.id
    },()=>$.get("/user/getCartItems",renderCart));
}

$(document).on("click",".addToCart",event=>{
    const cartItem={
        id:event.target.getAttribute("data-productid"),
        name:event.target.getAttribute("data-name"),
        price:event.target.getAttribute("data-price"),
        quantity:1,
    }
    addToCart(cartItem);
});

$(document).on("click",".delete",event=>{
    $.ajax({                                            //Using AJAX because it updates without refreshing the whole page
        url:"/user/deleteCartItem",
        type:"DELETE",
        data:{
            productId:event.target.parentNode.parentNode.getAttribute("data-productid")
        },
        success:()=>$.get("/user/getCartItems",renderCart)
    });
})