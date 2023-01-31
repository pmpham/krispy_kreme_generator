from selenium import webdriver
import time
from datetime import datetime
import random
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get('https://www.krispykreme.com/account/create-account')

fname = 'peter'
lname = 'pham'
#today = date.today()

number = str(random.randint(1000000000,9999999999)) + ''
email = number[0:6] + 'Abc@gmail.com'
password = 'Ilovedonuts123$'

driver.find_element(By.NAME,"ctl00$plcMain$txtFirstName").send_keys(fname)
driver.find_element(By.NAME,"ctl00$plcMain$txtLastName").send_keys(lname)
driver.find_element(By.NAME,"ctl00$plcMain$ddlBirthdayMM").send_keys(('00'+str(datetime.now().month))[0:-2])
driver.find_element(By.NAME,"ctl00$plcMain$ddlBirthdayDD").send_keys(datetime.now().day)
driver.find_element(By.NAME,"ctl00$plcMain$txtZipCode").send_keys('92708')
driver.find_element(By.NAME,"ctl00$plcMain$ucPhoneNumber$txt1st").send_keys(number[0:3])
driver.find_element(By.NAME,"ctl00$plcMain$ucPhoneNumber$txt2nd").send_keys(number[3:6])
driver.find_element(By.NAME,"ctl00$plcMain$ucPhoneNumber$txt3rd").send_keys(number[6:10])
driver.find_element(By.NAME,"ctl00$plcMain$txtEmail").send_keys(email)
driver.find_element(By.NAME,"ctl00$plcMain$txtPassword").send_keys(password)
driver.find_element(By.NAME,"ctl00$plcMain$confirmPasswordTxt").send_keys(password)
driver.find_element(By.NAME,'ctl00$plcMain$cbTermsOfUse').send_keys(" ")
time.sleep(5)
driver.quit()