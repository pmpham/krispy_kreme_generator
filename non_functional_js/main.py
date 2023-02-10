from selenium import webdriver
import time
from datetime import datetime
import random
from selenium.webdriver.common.by import By
from twocaptcha import TwoCaptcha
from dotenv import load_dotenv
import os

load_dotenv()

driver = webdriver.Chrome()
driver.get('https://www.krispykreme.com/account/create-account')

solver = TwoCaptcha(os.getenv('twocaptchakey'))

fname = 'Kevin'
lname = 'Nguyen'

number = str(random.randint(1000000000,9999999999)) + ''
email = "kngu714" + number[3:6] + 'Abc@gmail.com'
password = 'Ilovedonuts123$'

sitekey = '6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA'    
url = 'https://www.krispykreme.com/account/create-account'

driver.find_element(By.NAME,"ctl00$plcMain$txtFirstName").send_keys(fname)
driver.find_element(By.NAME,"ctl00$plcMain$txtLastName").send_keys(lname)
driver.find_element(By.NAME,"ctl00$plcMain$ddlBirthdayMM").send_keys(('00'+str(datetime.now().month))[0:-2])
driver.find_element(By.NAME,"ctl00$plcMain$ddlBirthdayDD").send_keys(datetime.now().day)
driver.find_element(By.NAME,"ctl00$plcMain$txtZipCode").send_keys('92708')
driver.find_element(By.NAME,"ctl00$plcMain$ucPhoneNumber$txt1st").send_keys("714")
driver.find_element(By.NAME,"ctl00$plcMain$ucPhoneNumber$txt2nd").send_keys(number[3:6])
driver.find_element(By.NAME,"ctl00$plcMain$ucPhoneNumber$txt3rd").send_keys(number[6:10])
driver.find_element(By.NAME,"ctl00$plcMain$txtEmail").send_keys(email)
driver.find_element(By.NAME,"ctl00$plcMain$txtPassword").send_keys(password)
driver.find_element(By.NAME,"ctl00$plcMain$confirmPasswordTxt").send_keys(password)
driver.find_element(By.NAME,'ctl00$plcMain$cbTermsOfUse').send_keys(" ")

driver.execute_script('var element=document.getElementById("g-recaptcha-response"); element.style.display="";')

try:
    print('solving captcha')
    token = solver.recaptcha(sitekey= sitekey, url = url)
    token = token['code']
    print(token)
    driver.execute_script(f'document.getElementById("g-recaptcha-response").innerHTML = "{token}"')
    #time.sleep(5)
    driver.execute_script('var element=document.getElementById("g-recaptcha-response"); element.style.display="none"')
except:
    print('shit timed out lol')
#print('ready to click')

print('waiting to click')
time.sleep(5)
driver.find_element(By.NAME,'ctl00$plcMain$btnSubmit').click()
print('clicked submit')

while (driver.current_url == url):
    print("waiting for submission to complete")
    time.sleep(5)

driver.quit()

print('success!')
print(f'email: {email}')
print(f'password: {password}')
