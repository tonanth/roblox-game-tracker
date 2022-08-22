# This Python file stores attribute names along with their HTML selector and selector type for Selenium
# they are stored in two dictionaries below.
# For a given attribute to work properly, its selector and selector type needs to be present in their respective
# dictionaries.

from selenium.webdriver.common.by import By

# Stores selector of an attribute
attribute_selector_dict = {
    "name": '/html/body/div[3]/div[3]/div[2]/div[2]/div[3]/div[2]/div[1]/h1',
    "date_updated": '/html/body/div[3]/div[3]/div[2]/div[2]/div[4]/div/div[1]/div[1]/div[2]/ul/li[5]/p[2]',
    "description": '/html/body/div[3]/div[3]/div[2]/div[2]/div[4]/div/div[1]/div[1]/div[2]/pre'
}

# Stores the corresponding selector type
attribute_selector_type_dict = {
    "name": By.XPATH,
    "description": By.XPATH,
    "date_updated": By.XPATH
}
