function solveCaptcha(siteKey, pageUrl){
    //make printing text easier
    let log = (text) => {console.log(text)};
    let logErr = (text) => {console.error(text)};
    //your api key
    const apiKey = "YOUR_API_KEY";

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
                                    document.querySelector('#g-recaptcha-response').innerHTML = data.request;
                                    log('captcha solved, you may submit the form');
                                }
                            })
                            .catch(error => {
                                logErr('Error:', error);
                            });
                        }, 5000); //end of step 3
                    }else{
                        log("Captcha token has been retrieved");
                        //output token
                        document.querySelector('#g-recaptcha-response').innerHTML = data.request;
                        log('captcha solved');
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