const { on } = require('superagent');

const superagent = require('superagent').agent()
const fs = require('fs')

const gen = async () => {
    var number =Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
    number = number+''
    var email = number.toString(16)+'AbC';
    const password = email + "AbC!#$";

    const today = new Date()

    getKey()
    var bypasskey = fs.readFile('key.txt', (err, inputD) => {
        if (err) throw err;
           console.log(inputD.toString());
     })
   
    email = email + "@gmail.com";
    let home = await superagent.post('https://www.krispykreme.com/account/create-account').send({
        ctl00$plcMain$txtFirstName: "alex",
        ctl00$plcMain$txtLastName: "smith",
        ctl00$plcMain$ddlBirthdayMM: today.getMonth() + 1,
        ctl00$plcMain$ddlBirthdayDD: today.getDate(),
        ctl00$plcMain$txtZipCode: '92708',
        ctl00$plcMain$ucPhoneNumber$txt1st: number.slice(0,3),
        ctl00$plcMain$ucPhoneNumber$txt2nd: number.slice(3,6),
        ctl00$plcMain$ucPhoneNumber$txt3rd: number.slice(6,10),
        ctl00$plcMain$txtEmail: email,
        ctl00$plcMain$txtPassword: password,
        ctl00$plcMain$confirmPasswordTxt: password,
        ctl00$plcMain$cbTermsOfUse: on,
        'g-recaptcha-response': bypasskey,
        ctl00$plcMain$btnSubmit: "Sign Up"
    }).set('Content-Type', 'application/x-www-form-urlencoded');

    console.log(home.text);
    console.log("email: "+ email)
    console.log("pass: "+ password)
}


function getKey(){
    const axios = require('axios');
    
    const anchor_url = 'https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA&co=aHR0cHM6Ly93d3cua3Jpc3B5a3JlbWUuY29tOjQ0Mw..&hl=en&v=RGRQD9tdxHtnt-Bxkx9pM75S&size=normal&cb=k8i44cqg02oi'
    var url_base = 'https://www.google.com/recaptcha/'
    var re = new RegExp('([api2|enterprise]+)\/anchor\?(.*)');
    var matches = anchor_url.match(re);
    url_base += matches[0]+'/';
    params = matches[1]
    axios({
        method: 'GET',
        url: url_base + 'anchor',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        params: {params}
    }).then(response => { 
        var re = new RegExp('"recaptcha-token" value="(.*?)"');
        var token = response.data.match(re)
        params2 = ""
        for (var pair of params.split('&')) {  
            params2 += pair.split('=')
        }
        var post_data = params2['v'] + token + params2['k'] + params2['co']
        var re = new RegExp('value="(.*?)"');
        var key = post_data.match(re)[0].split('"')[1]
        console.log(key)
        fs.writeFile("key.txt", key, (err) => {if (err) throw err})
    }).catch(error => {
        console.log(error)
        return (null)
    })
    }



const {By,Key,Builder} = require("selenium-webdriver");
const { time } = require('console');
require("chromedriver");
    
async function example(){
    
        const fname = "peter";
        const lname = 'pham'
        const today = new Date()

        var number =Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        number = number+''
        var email = number.toString(16);
        const password = email + "AbC!#$";
        email = email+'abc@gmail.com'
    
        //To wait for browser to build and launch properly
        let driver = await new Builder().forBrowser("chrome").build();
    
        //To fetch http://google.com from the browser with our code.
        await driver.get("https://www.krispykreme.com/account/create-account");

        /*
        ctl00$plcMain$ddlBirthdayMM: today.getMonth() + 1,
        ctl00$plcMain$ddlBirthdayDD: today.getDate(),
        ctl00$plcMain$txtZipCode: '92708',
        ctl00$plcMain$ucPhoneNumber$txt1st: number.slice(0,3),
        ctl00$plcMain$ucPhoneNumber$txt2nd: number.slice(3,6),
        ctl00$plcMain$ucPhoneNumber$txt3rd: number.slice(6,10),
        ctl00$plcMain$txtEmail: email,
        ctl00$plcMain$txtPassword: password,
        ctl00$plcMain$confirmPasswordTxt: password,
        ctl00$plcMain$cbTermsOfUse: on, */
            
        await driver.findElement(By.name("ctl00$plcMain$txtFirstName")).sendKeys(fname);
        await driver.findElement(By.name("ctl00$plcMain$txtLastName")).sendKeys(lname);
        await driver.findElement(By.name("ctl00$plcMain$ddlBirthdayMM")).sendKeys(('0'+(today.getMonth()+1)).slice(-2));
        await driver.findElement(By.name("ctl00$plcMain$ddlBirthdayDD")).sendKeys(today.getDate());
        await driver.findElement(By.name("ctl00$plcMain$txtZipCode")).sendKeys('92708');
        await driver.findElement(By.name("ctl00$plcMain$ucPhoneNumber$txt1st")).sendKeys(number.slice(0,3));
        await driver.findElement(By.name("ctl00$plcMain$ucPhoneNumber$txt2nd")).sendKeys(number.slice(3,6));
        await driver.findElement(By.name("ctl00$plcMain$ucPhoneNumber$txt3rd")).sendKeys(number.slice(6,10));
        await driver.findElement(By.name("ctl00$plcMain$txtEmail")).sendKeys(email);
        await driver.findElement(By.name("ctl00$plcMain$txtPassword")).sendKeys(password);
        await driver.findElement(By.name("ctl00$plcMain$confirmPasswordTxt")).sendKeys(password);
        await driver.findElement(By.name('ctl00$plcMain$cbTermsOfUse')).sendKeys(" ")

        //var element = await driver.findElement(By.id('g-recaptcha-response'))
        console.log('befre solving')
        await getKey()
        var bypasskey = await fs.readFile('key.txt', (err, inputD) => {
            if (err) throw err;
               console.log(inputD.toString());
        })
        console.log('made it pass solving')
        //driver.execute_script('var element=document.getElementById("g-recaptcha-response"); element.style.display="";')

        await driver.executeScript('document.getElementById("g-recaptcha-response").innerHTML = arguments[0]', bypasskey)
        //driver.execute_script('var element=document.getElementById("g-recaptcha-response"); element.style.display="none";')
        
        //driver.findElement(By.XPATH, '//*[@id="recaptcha-demo-submit"]').click()
        await driver.findElement(By.name('ctl00$plcMain$btnSubmit')).click()
        //await Delay(5000)
        //Verify the page title and print it
        var title = await driver.getTitle();
        console.log('Title is:',title);
    
        //await setTimeout(10000)
        //It is always a safe practice to quit the browser after execution
        await driver.quit();
    
}
    
example()