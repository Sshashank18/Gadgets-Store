const cartTable = $("#cartTable");
const total = $("#total");

$.get("/user/getOrderDetails", orders => {
    orders.map(order => {
        cartTable.append(
            `   
                <tr>
                    <td>${order.product.Name}</td>
                    <td>${order.quantity}</td>
                    <td>${order.product.Price}</td>
                    <td>${order.product.vendor.CompanyName}</td>
                </tr>
                
            `
        );
        let temp=parseInt(total.text()) + parseInt(parseInt(order.product.Price) * parseInt(order.quantity));
        total.text("₹"+temp);
    });

});

let orderForm = $("#orderForm");
orderForm.submit((event) => {
    event.preventDefault();
    $("#finalText").modal("show");
    setTimeout(() => {
        orderForm[0].submit();
    }, 2000);
});

let creditCardRadio = $("#creditCard");
let codRadio = $("#cod");

creditCardRadio.click(() => {
    $("#creditNumber").attr("required", "");
    $("#expiry").attr("required", "");
    $("#cvv").attr("required", "");
});

codRadio.click(() => {
    $("#creditNumber").removeAttr("required", "");
    $("#expiry").removeAttr("required", "");
    $("#cvv").removeAttr("required", "");
})



