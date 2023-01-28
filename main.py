""" from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.headless = False
driver = webdriver.Chrome(options=options)
driver.get("http://google.com/")
time.sleep(5)
print ("Headless Chrome Initialized")
driver.quit() """

import time

from selenium import webdriver

driver = webdriver.Chrome('/path/to/chromedriver')  # Optional argument, if not specified will search path.

driver.get('http://www.google.com/');

time.sleep(5) # Let the user actually see something!

search_box = driver.find_element('name','q')
search_box.send_keys('ChromeDriver')

search_box.submit()

time.sleep(5) # Let the user actually see something!

driver.quit()