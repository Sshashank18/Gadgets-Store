const urlArray=window.location.href.split('/');
const lastUrl=urlArray[urlArray.length-1];
const id=lastUrl.split('?')[1].split('=')[1];

$.get('/user/getProductDetails/'+id,(productDetails)=>{
    let productBox=$('#productBox');
    productBox.empty();

    let reviews="";
    let stars="";

    productDetails.reviews.map(review=>{
        for(let i=1;i<=review.stars;i++)
        {
            stars+=`<img src="Images/star.jpeg" width="15px">`
        }
        reviews +=
        `
            <div class="review">
                <span><h5>${review.user.Name} </h5><span>${stars}</span></span>
                <br>
                <p>${review.review}</p>
            </div>
            <hr>
        `
        stars = "";
    })
    productBox.append(
        `
        <div class="col-4">
            <img src="/products/${productDetails.image}" class="orderImage" width="350px" height="250px" >
        </div>
        <div class="col-4">
            <div><u>Name: </u><h3>${productDetails.Name}</h3></div>
            <div><u>Price: </u><h4>${productDetails.Price}</h4></div>
            <div><u>Vendor: </u><h4>${productDetails.vendor.CompanyName}</h4></div>
    
            <button type="button" class="btn btn-danger" id="addToCart">Add To Cart</button>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter">
                Add Review
            </button>
        </div>
        <div class="col-4">
            <div class="reviews">
                <h3>Reviews</h3>
                <hr>
                ${reviews}                   
            </div>
        </div>   
        `
    )
});

const submitReviewButton=$('#submitReview');
const submitReviewForm=$('#submitReviewForm');

submitReviewForm.submit(()=>{
    $('<input />').attr("type","hidden")
        .attr('name','productId')
        .attr('value',id)
        .appendTo(submitReviewForm);
    return true;
})

