let userLoginButton=document.getElementById('userLoginButton');
let vendorLoginButton=document.getElementById("vendorLoginButton");

let userForm=document.getElementById('userForm');
let vendorForm=document.getElementById('vendorForm');

userLoginButton.addEventListener('click',()=>{
    userForm.classList.remove("hide");
    vendorForm.classList.add("hide");

    userLoginButton.classList.add("btn-primary");
    userLoginButton.classList.remove("btn-secondary");

    vendorLoginButton.classList.add("btn-secondary");
    vendorLoginButton.classList.remove("btn-primary");
});

vendorLoginButton.addEventListener('click',()=>{
    vendorForm.classList.remove("hide");
    userForm.classList.add("hide");

    vendorLoginButton.classList.add("btn-primary");
    vendorLoginButton.classList.remove("btn-secondary");

    userLoginButton.classList.add("btn-secondary");
    userLoginButton.classList.remove("btn-primary");
});