# Introduction
A Python and NodeJS based program to automatically check for Roblox game updates.

# Setting up

This program has 2 main parts - the Python backend and the React frontend. The Python backend will be continuously checking Roblox sites for game updates and pushing them onto a Postgres database while the React frontend will display the games' data and organize them depending on whether they have been updated or not. Both will need to be running for the program to work as intended. 

Start firstly with the python-engine/README.md. It has information on how to set up the database which the React frontend requires to function properly. 

After finishing with the python-engine README, go to react-frontend/README.md to finish setting up and getting the program running.

# Running the program

To run the program after setting up, run `main.py` in `python-engine/` and run `npm run start` in `react-frontend/`. Then open any browser and go to <http://localhost:3000>.