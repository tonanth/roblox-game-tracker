# A dictionary which maps attributes of a certain game i.e. date it was updated to their respective xpath for Selenium
# The attribute name will be the same as the column name for the database.
attribute_xpath_dict = {
    'date-updated': '//*[@id="about"]/div[1]/div[2]/ul/li[5]/p[2]',  # Date type
    'name': '//*[@id="game-detail-page"]/div[3]/div[2]/div[1]/h1'  # String type
}

game_url_col_name = 'game-url'  # Name of column for game URL

test_place_url = None  # TODO: create a test place with known attributes for testing

enable_test_place = False  # Enables checking a known place to ensure proper operation
