function autoFill() {
    const today = new Date();
    var month = today.getMonth() + 1;
    const kkurl = "https://www.krispykreme.com/account/create-account";
   
    //console.log(month)
    month = ("0" + month).slice(-2);
    document.getElementById("ctl00_plcMain_txtFirstName").value = "john";
    document.getElementById("ctl00_plcMain_txtLastName").value = "alex";
    document.getElementById("ctl00_plcMain_ddlBirthdayMM").value = month;
    document.getElementById("ctl00_plcMain_ddlBirthdayDD").value = today.getDate().toString();
    document.getElementById("ctl00_plcMain_txtZipCode").value = "92708";
   
    var number =Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
    var email = number.toString(16);
    const password = email + "!#$";
   
    email = email + "@gmail.com";
   
    document.getElementById("ctl00_plcMain_ucPhoneNumber_txt3rd").value = (
     "000" +
     (number % 10000)
    ).slice(-4);
    number = Math.floor(number / 10000);
   
    document.getElementById("ctl00_plcMain_ucPhoneNumber_txt2nd").value = (
     "000" +
     (number % 10000)
    ).slice(-3);
    number = Math.floor(number / 1000);
   
    document.getElementById("ctl00_plcMain_ucPhoneNumber_txt1st").value = (
     "000" +
     (number % 10000)
    ).slice(-3);
    number = Math.floor(number / 1000);
   
    document.getElementById("ctl00_plcMain_txtEmail").value = email;
    document.getElementById("ctl00_plcMain_txtPassword").value = password;
    document.getElementById("ctl00_plcMain_confirmPasswordTxt").value = password;
   
    document.getElementById("ctl00_plcMain_cbTermsOfUse").checked = true;
    console.log("email: " + email);
    console.log("password: " + password);
   
    const captcha =
     document.getElementsByClassName("g-recaptcha")[0].dataset.sitekey;
   
    //solveCaptcha(captcha,kkurl);
   
    //console.log(key)
    //alert(document.body.innerHTML);
   }

function main() {
var theWindow = window.open("https://www.krispykreme.com/account/create-account");
theScript = document.createElement("script");
theScript.innerHTML = "(" + autoFill.toString() + "());";
theWindow.onload = function () {
    this.document.body.appendChild(theScript);
};
}

autoFill();

