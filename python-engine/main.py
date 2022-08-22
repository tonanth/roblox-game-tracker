import time
from driver import Driver


driver = Driver('roblox_game_tracker', 'roblox_game_tracker', 'url', ['name', 'date_updated', 'description'],
                database_user='postgres', database_password='password')

# TODO: Add SIGINT and SIGTERM handlers
while True:
    driver.iterate()
    time.sleep(10)

driver.close()
