# Introduction
This is a Python program developed using JetBrains Pycharm to continuously check Roblox game pages for updates and updates a Postgres database accordingly.  

# Prerequisites
## Windows (not necessarily)
This program is created, tested and ran on Windows 11. It may work flawlessly on other OSes or may require some tinkering.

## Postgres 
The database used is Postgres version 14.4. Installion on Windows is a tad different than on Linux distributions. The offical Postgres website does not provide an installation file, instead it is supplied by another website, EDB, located here - <https://www.enterprisedb.com/downloads/postgres-postgresql-downloads>

Postgres on Windows also comes with the pgAdmin tool to help set up and administer the database. When installing, set the Postgres user password to `password`.

After installing Postgres, using pgAdmin, create a database called `roblox_game_tracker` with a password of `password`.

Now we'll need to add a `roblox_game_tracker` table with the necessary fields. Open up a cursor in the `roblox_game_tracker` database and run 

```
create table roblox_game_tracker (
    url                     text,
    name                    text,
    date_updated            text,
    description             text,
    checked_name            text,
    checked_date_updated    text,
    checked_description     text,
    primary key             (url)
);
```

This will finish the database setup.

## Python
This program uses Python 3.9.7 in a `virtualenv` created by Pycharm. Interaction between Python and Postgres will be done using `psycopg2` module. Retrieving data from Roblox game pages will be done through a Chrome browser and controlled using the `selenium` module / framework. A `requirements.txt` file is supplied to facilitate installation of required modules. The virtual environment is not included on the GitHub repo and is suggested to be created and used to avoid changes on the global Python installation. 

To create using PyCharm, open this folder as the project folder, then follow the instructions here :
https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html

## Chrome, Chromedriver, and Selenium

This program will utilize the Selenium testing framework together with the Chrome browser to access Roblox game pages. Chrome can be installed from <https://www.google.com/chrome/>. 

Selenium requires a WebDriver for Chrome in order to control it. The webdriver can be downloaded from <https://chromedriver.chromium.org/downloads>. Extract the WebDriver into the `browser-driver` directory. 

# Running the Backend

After the above installation steps are done, run `main.py`. The program will run until halted. 