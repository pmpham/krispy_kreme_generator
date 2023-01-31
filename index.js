import fetch from "node-fetch";

import on from "superagent"

//import superagent from "superagent";

//superagent = superagent.agent()

import fs from 'fs'

/* async function getKey(){
    const axios = require('axios');
    const fs = require('fs')
    
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
        fs.writeFile("key.txt", key, (err) => {if (err) throw err})
        console.log(key)
    }).catch(error => {
        console.log(error)
    })
    
} */

import { By,Key,Builder, promise} from "selenium-webdriver";
import { time } from "console";
import dotenv from "dotenv";
import chromedriver from 'chromedriver';
import { resolve } from "path";
import { rejects } from "assert";
//require("chromedriver");
    
async function example(){

        const fname = "peter";
        const lname = 'pham'
        const today = new Date()

        var number =Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        number = number+''
        var email = number.toString(16);
        const password = email + "AbC!#$";
        email = email+'abc@gmail.com'

        const sitekey = "6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA"
        const url = 'https://www.krispykreme.com/account/create-account'

        //require('dotenv').config()

        let driver = await new Builder().forBrowser("chrome").build();
    
        await driver.get("https://www.krispykreme.com/account/create-account");
            
        driver.findElement(By.name("ctl00$plcMain$txtFirstName")).sendKeys(fname);
        driver.findElement(By.name("ctl00$plcMain$txtLastName")).sendKeys(lname);
        driver.findElement(By.name("ctl00$plcMain$ddlBirthdayMM")).sendKeys(('0'+(today.getMonth()+1)).slice(-2));
        driver.findElement(By.name("ctl00$plcMain$ddlBirthdayDD")).sendKeys(today.getDate());
        driver.findElement(By.name("ctl00$plcMain$txtZipCode")).sendKeys('92708');
        driver.findElement(By.name("ctl00$plcMain$ucPhoneNumber$txt1st")).sendKeys(number.slice(0,3));
        driver.findElement(By.name("ctl00$plcMain$ucPhoneNumber$txt2nd")).sendKeys(number.slice(3,6));
        driver.findElement(By.name("ctl00$plcMain$ucPhoneNumber$txt3rd")).sendKeys(number.slice(6,10));
        driver.findElement(By.name("ctl00$plcMain$txtEmail")).sendKeys(email);
        driver.findElement(By.name("ctl00$plcMain$txtPassword")).sendKeys(password);
        driver.findElement(By.name("ctl00$plcMain$confirmPasswordTxt")).sendKeys(password);
        driver.findElement(By.name('ctl00$plcMain$cbTermsOfUse')).sendKeys(" ")

        /* var bypasskey = null
        fs.readFile('key.txt', (err, inputD) => {
            if (err) throw err;
               console.log(inputD.toString());
               bypasskey = inputD.toString()
        }) */
        /* console.log(bypasskey)
        console.log('made it pass solving') */

        //await driver.executeScript(`document.getElementById("g-recaptcha-response").innerHTML = ${bypasskey}`)
        await driver.executeScript('var element=document.getElementById("g-recaptcha-response"); element.style.display="";')
        //await driver.findElement(By.name('g-recaptcha-response')).sendKeys(bypasskey,Key.RETURN)
        //await driver.executeScript(`document.getElementById("g-recaptcha-response").innerHTML = '${bypasskey}'`)
        /* console.log('bypasskey '+bypasskey) */

        //solveCaptcha(sitekey,url)
        /* .then(driver.executeScript('var element=document.getElementById("g-recaptcha-response"); element.style.display="none";'))
        .then(await new Promise(resolve => setTimeout(resolve, 1000)))
        .then(await driver.quit()).then(console.log("email: "+email)).then(console.log("password: "+password)) */

        //await solveCaptcha(sitekey,url)
        //await new Promise(resolve => setTimeout(resolve, 30000));
        //await new Promise(resolve => setTimeout(solveCaptcha(sitekey,url), 5000));
        //await driver.executeScript('var element=document.getElementById("g-recaptcha-response"); element.style.display="none";')
        //await new Promise(resolve => setTimeout(resolve, 1000));
        

        //await driver.findElement(By.name('ctl00$plcMain$btnSubmit')).click() 
        /* await driver.executeScript('var element=document.getElementById("g-recaptcha-response"); element.style.display="none";')
        await driver.findElement(By.name('ctl00$plcMain$btnSubmit')).click() 
        await driver.quit();
        console.log("email: "+email)
        console.log("password: "+password)*/
        await solveCaptcha(sitekey,url).then(resolve=>
            {driver.executeScript('var element=document.getElementById("g-recaptcha-response"); element.style.display="none";')
            console.log(resolve)})
            .then(resolve=>{driver.findElement(By.name('ctl00$plcMain$btnSubmit')).click() 
            console.log(resolve)})
            .then(resolve=>{driver.quit()
                console.log(resolve)})
            .then(resolve=>{console.log("email: "+email)
            console.log("password: "+password)
            console.log(resolve)})

        var title = await driver.getTitle();
        console.log('Title is:',title);
    
        await new Promise(resolve => setTimeout(resolve, 5000));

        //await driver.quit();
        //console.log("email: "+email)
        //console.log("password: "+password)
    
        async function solveCaptcha(siteKey, pageUrl){
            //make printing text easier
            
            let log = (text) => {console.log(text)};
            let logErr = (text) => {console.error(text)};
            //your api key
            dotenv.config()
            const apiKey = process.env.twocaptchakey;
            //log(apiKey)
            //make a GET request to 2captcha
            fetch(`https://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha
            &googlekey=${siteKey}&pageurl=${pageUrl}&json=1`)
            .then(response => response.json())
            .then(data => {
                log('solving captcha...');
                //check if there's an error
                if(!data.status){
                    //print out error
                    logErr('Error:', (data.error_text !== undefined) ? 
                        data.error_text : data.request);
                }else{
                    log("Hurray! A worker has solved the captcha, we're retrieving the token...");
                    log("Please wait while we retrieve the token...");
                    setTimeout(function(captchaId = data.request){
                        //make another call with the ID to get the captcha's status
                        fetch(`https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}&json=1`)
                        .then(response => response.json())
                        .then(data => {
                            if(!data.status && data.request != "CAPCHA_NOT_READY"){
                                //print out error
                                logErr('Error:', (data.error_text !== undefined) ? data.error_text : data.request);
                            }else if(!data.status && data.request == "CAPCHA_NOT_READY"){
                                log("Attempt to retrieve token failed, trying again in 5 secs...");
                                //repeat request after 5 secs
                                while(!data.status && data.request == "CAPCHA_NOT_READY"){
                                    log("Attempt to retrieve token failed, trying again in 5 secs...")
                                    setTimeout(function(captchaId){
                                        fetch(`https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}&json=1`)
                                        .then(response => response.json())
                                        .then(data => {
                                            //check if there's an error
                                            if(!data.status){
                                                //print out error
                                                logErr('Error:', (data.error_text !== undefined) ? data.error_text : data.request);
                                            }else{
                                                log("Captcha token has been retrieved");
                                                //output token
                                                driver.executeScript(`document.getElementById("g-recaptcha-response").innerHTML = '${data.request}'`)
                                                log('captcha solved, you may submit the form');
                                                return Promise.resolve('successfuly solved')
                                            }
                                        })
                                        .catch(error => {
                                            logErr('Error:', error);
                                        });
                                    }, 5000);
                                } //end of step 3
                            }else{
                                log("Captcha token has been retrieved");
                                //output token
                                driver.executeScript(`document.getElementById("g-recaptcha-response").innerHTML = '${data.request}'`)
                                log('captcha solved');
                                return Promise.resolve('successfuly solved')
                            }
                        })
                        .catch(error => {
                            logErr('Error:', error);
                        });
                    }, 20000); //end of step 2
                }
            })
            .catch(error => {
                logErr('Error:', error);
            });//end of step 1
        }
}


example()