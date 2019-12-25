let mobiles=$('#mobiled');
let cameras=$('#camerasd');
let pendrives=$('#pendrivesd');
let earphones=$('#earphonesd');
let laptops=$('#laptopsd');
let consoles=$('#consolesd');

let filters = $(".filter");

const disableFilters=()=>{
    filters.each((index,filter)=>{
        filter.setAttribute("hidden"," ");
    })
}

const categoryButton = $("#categoryButton");

mobiles.click(()=>{
    disableFilters();
    companiesMobiles.removeAttribute("hidden");
    categoryButton.text("Mobiles");
    productType="Mobiles";
});
cameras.click(()=>{
    disableFilters();
    companiesCameras.removeAttribute("hidden");
    categoryButton.text("Cameras");
    productType="Cameras";
});
laptops.click(()=>{
    disableFilters();
    companiesLaptops.removeAttribute("hidden");
    categoryButton.text("Laptops");
    productType="Laptops";
});
pendrives.click(()=>{
    disableFilters();
    companiesPendrives.removeAttribute("hidden");
    categoryButton.text("Pendrives");
    productType="Pendrives";
});
earphones.click(()=>{
    disableFilters();
    companiesEarphones.removeAttribute("hidden");
    categoryButton.text("Earphones");
    productType="Earphones";
});
consoles.click(()=>{
    disableFilters();
    companiesConsoles.removeAttribute("hidden");
    categoryButton.text("Consoles");
    productType="Consoles";
});


$("#newitemForm").submit((event) => {                           //Will pass productType to the addProduct function as its been selected here
    $("<input />").attr("type", "hidden")
        .attr("name", "productType")
        .attr("value", productType)
        .appendTo("#newitemForm");
    return true;
});