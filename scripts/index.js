// console.log("login js connected");
const loginBtn = document.getElementById("login-id");
loginBtn.addEventListener("click", () => {
    // alert("clicked on login btn");
    const loginUserName = document.getElementById("login-user-name");
    const loginUserPassword = document.getElementById("login-password");
    const loginUserNameValue = loginUserName.value;
    const loginUserPassValue = loginUserPassword.value;
    if(loginUserNameValue == "admin" && loginUserPassValue == "admin123"){
        // alert("inputed credentials correct");
        window.location.assign("issues.html");
    }else{
        alert("username or password is not valid");
    }
})