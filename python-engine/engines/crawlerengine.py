from typing import List
from selenium import webdriver
from engines.crawlerselector import attribute_selector_dict, attribute_selector_type_dict


class CrawlerEngine:
    """Accesses and parses Roblox game pages using Selenium.

    Accesses Roblox game pages and extracts attributes of interest using the Selenium testing framework
    and the Chromium web browser. An installation of Chromium browser is required for the class to run.

    Args:
        attribute_table: A List of attributes to look for.
        headless: If set to true, Selenium will run in headless mode (browser window won't be visible)
            Default: False
        retries: The number of times to attempt loading a page before giving up
            Default: 3
        use_custom_port: If set to true, will instruct Selenium use a custom port to connect to the browser
            Default: False
        custom_port: A custom port number for Selenium to connect to the browser
            Default: 1234

    Returns:
        None

    Raises:
        ValueError: One or more attributes in attribute_table is missing or improperly configured in crawlerselector.py
    """
    def __init__(self,
                 attribute_table: List[str],
                 headless: bool = False,
                 retries: int = 3,
                 use_custom_port: bool = False,
                 custom_port: int = 1234):

        # TODO: consider splitting into separate method
        for attribute in attribute_table:
            if (attribute not in attribute_selector_dict) or (attribute not in attribute_selector_type_dict):
                raise ValueError("Attribute does not exist or is improperly configured in crawlerselector.py")
        self.attribute_table = attribute_table

        # TODO: Add code for headless
        options = webdriver.ChromeOptions()
        if use_custom_port:
            options.add_argument(f'--remote-debugging-port={custom_port}')

        # TODO: Migrate to Selenium 4 style code with driver manager
        self.driver = webdriver.Chrome(executable_path='./browser-driver/chromedriver.exe', options=options)

    def get_attributes_from_url(self, page_url: str):
        """Returns a list of desired attributes from a given page URL.

        Uses Selenium to navigate to a given Roblox game page URL and extract attributes of interest using
        HTML selectors as configured in crawlerselector.py

        Args:
            page_url:
                A full URL for a Roblox game page.

        Returns: A List of strings containing the attributes of interest of the game at the page_url. The positions
        of attributes in the List corresponds to the position of the attributes present in attribute_table in the
        constructor.
        """
        # TODO: implement retries and error handling
        self.driver.get(page_url)
        game_attributes = []
        for attribute in self.attribute_table:
            result = self.driver.find_element(by=attribute_selector_type_dict[attribute],
                                              value=attribute_selector_dict[attribute]).text
            game_attributes.append(result)
        return game_attributes

    def close(self):
        """Closes the Selenium browser"""
        self.driver.close()
        return
