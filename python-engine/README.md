# Introduction
This is a python program to continuously check for game updates and update a Postgres database.  

# Prerequisites
## Ubuntu
This program is created using Ubuntu 21.10. It may work flawlessly on other distros or OS or may require some tinkering.

## Postgres 
The database used is Postgres version 13.7. It can be installed in Ubuntu from the commandline using
`sudo apt-get install postgresql`.

A database with the name `roblox-game-tracker` will need to be manually created in Postgres, perhaps using the
following steps in the terminal after installing Postgres. In addition, the user running the program must have
permission to access and modify the database.

`sudo su postgres` to switch to postgres to add users.

`createuser user` where user will be running the Python program.

`createdb user` to allow user to connect to Postgres.

`createdb roblox-game-tracker` creates the database that the program will use.

`exit` to get out of postgres user.

At this point, `user` should have access to the `psql` frontend of Postgres. 

`psql roblox-game-tracker` to connect to the `roblox-game-tracker` database.

While in `psql`, set the password of the current user using `\password` and setting the password to `password`.




## Python
This program uses Python 3.9.7 in a `virtualenv` created by Pycharm. Interaction between Python and Postgres will be done
using `psycopg2` module. A `requirements.txt` file is included to facilitate installation of required modules. The 
virtual environment is not included on the GitHub repo and is suggested to be created and used to avoid changes on the global
Python installation. 

To create using PyCharm, open this folder as the project folder, then follow the instructions here :
https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html

## Chromium and Selenium
This program will utilize the Selenium testing framework together with the Chromium browser to access Roblox game pages.
Chromium can be installed on 


