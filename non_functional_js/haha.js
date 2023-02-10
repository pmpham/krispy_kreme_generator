import { By,Key,Builder, promise} from "selenium-webdriver";
import { time } from "console";
import dotenv from "dotenv";
import chromedriver from 'chromedriver';
import { resolve } from "path";
import { rejects } from "assert";

async function example(){
    let driver = await new Builder().forBrowser("chrome").build();
    
    await driver.get("https://www.krispykreme.com/account/create-account");

    await console.log(pp())

    await console.log("done")

    driver.quit()
}

async function pp(){
    await new Promise(resolve => setTimeout(resolve, 30000));
    return ('hi')
    
}

example()