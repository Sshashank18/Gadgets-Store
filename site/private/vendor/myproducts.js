let mobiles=[];
let pendrives=[];
let earphones=[];
let consoles=[];
let cameras=[];
let laptops=[];

const mobilebox=$('#mobiles');
const earphonebox=$('#earphones');
const camerabox=$('#cameras');
const laptopbox=$('#laptops');
const consolebox=$('#consoles');

let deleteProductButtons =$('.deleteProductButton');

const render=(box,products)=>{
    box.empty();
    products.map((product)=>{
        box.append(
            `
            <div class="product bg-light text-dark p-3 mb-2">
                <div class="productName">Name: <b>${product.Name}</b></div>
                <div class="productPrice">Price: <b>${product.Price}</b></div>
                <div class="productSubtype">SubType: <b>${product.productSubtype}</b></div>
                <button type="button" class="btn btn-danger deleteProductButton"  style="margin-bottom: 10px;" value="${product.id}">Delete Product</button>
            </div>
            `
        );
    });
    deleteProductButton=$('.deleteProductButton');
}

$.get('/vendor/products',(products)=>{
    products.map((product)=>{
        if(product.productType=="Mobiles")
            mobiles.push(product);
        else if(product.productType=="Cameras")
            cameras.push(product);
        else if(product.productType=="Consoles")
            consoles.push(product);
        else if(product.productType=="Laptops")
            laptops.push(product);
        else    
            earphones.push(product);
    })

    render(mobilebox,mobiles);
    render(earphonebox,earphones);
    render(laptopbox,laptops);
    render(camerabox,cameras);
    render(consolebox,consoles);

    deleteProductButtons.each((index)=>{
        deleteProductButtons[index].addEventListener("click",(event)=>{
            $.ajax({
                url:'/vendor/deleteProduct',
                type:'DELETE',
                data:{
                    id:event.target.value
                },
                success: function(){
                    event.target.parentNode.remove();
                }
            });
        })
    })
});

let mobileSearch=$('#mobileSearch');
let cameraSearch=$('#cameraSearch');
let laptopSearch=$('#laptopSearch');
let earphoneSearch=$('#earphoneSearch');
let consoleSearch=$('#consoleSearch');

mobileSearch[0].addEventListener("input",()=>{
    const filtered=mobiles.filter(mobile=>{
        if(mobile.name.toLowerCase().includes(mobileSearch[0].value.toLowerCase()))
            return mobile;
    });
    render(mobilebox,filtered);
});

cameraSearch[0].addEventListener("input",()=>{
    const filtered=cameras.filter(camera=>{
        if(camera.name.toLowerCase().includes(cameraSearch[0].value.toLowerCase()))
            return camera;
    });
    render(camerabox,filtered);
});

laptopSearch[0].addEventListener("input",()=>{
    const filtered=laptops.filter(laptop=>{
        if(laptop.name.toLowerCase().includes(laptopSearch[0].value.toLowerCase()))
            return laptop;
    });
    render(laptopbox,filtered);
});

earphoneSearch[0].addEventListener("input",()=>{
    const filtered=earphones.filter(earphone=>{
        if(earphone.name.toLowerCase().includes(earphoneSearch[0].value.toLowerCase()))
            return earphone;
    });
    render(earphonebox,filtered);
});

consoleSearch[0].addEventListener("input",()=>{
    const filtered=consoles.filter(mobile=>{
        if(console.name.toLowerCase().includes(mobileSearch[0].value.toLowerCase()))
            returnconsolee;
    });
    render(consolebox,filtered);
});
