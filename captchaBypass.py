import requests
import time
import os
import dotenv

load_dotenv()

def captchaBypass() -> str:
    APIKey = os.getenv('twocaptchakey')
    site_key = '6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA'
    url = 'https://www.krispykreme.com/account/create-account'
    return()