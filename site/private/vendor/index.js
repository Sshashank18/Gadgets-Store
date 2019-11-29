let mobiles=$('#mobilesd');
let cameras=$('#camerasd');
let pendrives=$('#pendrivesd');
let earphones=$('#earphonesd');
let laptops=$('#laptopsd');

let filters = $(".filter");

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
    productType="Mobiles";
});

cameras.click(()=>{
    disableFilters();
    companiesCameras[0].removeAttribute("hidden");
    categoryButton.text("Cameras");
    productType="Cameras";
});
laptops.click(()=>{
    disableFilters();
    companiesLaptops[0].removeAttribute("hidden");
    categoryButton.text("Laptops");
    productType="Laptops";
});
pendrives.click(()=>{
    disableFilters();
    companiesPendrives[0].removeAttribute("hidden");
    categoryButton.text("Pendrives");
    productType="Pendrives";
});
earphones.click(()=>{
    disableFilters();
    companiesEarphones[0].removeAttribute("hidden");
    categoryButton.text("Earphones");
    productType="Earphones";
});

const pendingOrders=$('#pendingOrders');
const dispatchedOrders=$('#dispatchedOrders');

const renderOrders=()=>{
    $.get('/vendor/getOrders',orders=>{
        pendingOrders.empty();

        orders.map(order=>{
            if(order.status=="Confirmation Pending")
            {
                pendingOrders.append(
                    `
                    <div class="item-details">
                    <img src="/Products/${order.product.image}">
                    Name:${order.product.Name}
                    <br>
                    Price:${order.product.Price}
                    <br>
                    Quantity:${order.product.quantity}
                    <br>
                    Total:${order.quantity * order.product.Price}
                    <hr>
                    <h3>Customer Details</h3>
                    Name: ${order.user.Name}
                    <br>
                    Address: ${order.user.Address}
                    <br>
                    Mobile: ${order.user.Mobile}
                    <br>
                    Payment Method: ${order.method}
                    <br>
                    Time: ${order.time}
                </div>
                <br>
                <button class="btn btn-success orderAccept" data-orderid=${order.id}>Accept</button>
                <button class="btn btn-danger orderDecline" data-orderid=${order.id}>Decline</button>
                    `
                );
            }
            else if(order.status=="Dispatched")
            {
                dispatchedOrders.append(
                    `
                    <div class="item-details">
                    <img src="/Products/${order.product.image}">
                    Name:${order.product.Name}
                    <br>
                    Price:${order.product.Price}
                    <br>
                    Quantity:${order.product.quantity}
                    <br>
                    Total:${order.quantity * order.product.Price}
                    <hr>
                    <h3>Customer Details</h3>
                    Name: ${order.user.Name}
                    <br>
                    Address: ${order.user.Address}
                    <br>
                    Mobile: ${order.user.Mobile}
                    <br>
                    Payment Method: ${order.method}
                    <br>
                    Time: ${order.time}
                </div>
                    `
                );
            }
        });
    });
}
renderOrders();

$(document).on("click",".orderAccept",event=>{
    $.ajax({
        url:"/vendor/dispatchedOrder",
        data:{
            id:event.target.getAttribute("data-orderid")
        },
        type:"PATCH",
        success:()=>{
            event.target.parentNode.parentNode.parentNode.remove();
            renderOrders();
        }
    });
});

$(document).on("click",".orderDecline",event=>{
    $.ajax({
        url:"/vendor/declineOrder",
        data:{
            id:event.target.getAttribute("data-orderid")
        },
        type:"PATCH",
        success:()=>{
            event.target.parentNode.parentNode.parentNode.remove();
            renderOrders();
        }
    });
});

