const ordersContainers=$('#orders');

$.get('/user/getOrders',orders=>{
    ordersContainers.empty();
    orders.map(order=>{
        ordersContainers.append(
            `
            <div class="order">
                    <div class="time ml-3"><b>Ordered Placed: ${order.time}</b></div>
                    <div class="name ml-3">Signed By: ${order.user.Name}</div>
                    <div class="container mt-3">
                        <div class="row">
                            <div class="col-6">
                                <img src="/products/${order.product.image}" class="orderImage" width=200px height=200px>
                            </div>
                            <div class="col-3">
                                <div class="orderName"><a href="/user/product.html?productId=${order.product.id}"><b>${order.product.Name}</b></a></div>
                                <div class="price">Price: ₹ ${order.product.Price}</div>
                                <div class="price">Quantity: ${order.quantity}</div>
                                <div class="price">Total: ₹ ${order.product.Price * order.quantity}</div>
                                <br>
                                <div class="vendorName">Sold By: ${order.vendor.CompanyName}</div>
                                <div class="vendorName">Vendor Mobile: ${order.vendor.CompanyMobile}</div>
                                <div class="vendorName">Vendor Email Address: ${order.vendor.CompanyEmail}</div>
                                <div class="vendorName">Status: <b>${order.status}</b></div>
                                
                                
                            </div>
                            <div class="col-3">
                                <button class="btn btn-outline-info my-2 my-sm-0" data-productid=${order.product.id} id="reviewButton">Write A Product Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            <hr>
            `
        )
    })
});

$(document).on("click", "#reviewButton", (event) => {
    window.location = "/user/product.html?productId=" + event.target.getAttribute("data-productid");
})
