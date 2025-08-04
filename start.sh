#!/bin/bash

DIR=$(dirname "$0")

cd "$SDIR" || exit

pause() {
    read -p "Press any key to exit . . ."
    exit
}

if ! [ -d "node_modules" ]; then
    npm i --silent --production
    if ! [ -d "node_modules" ]; then
        echo "A problem occurred while installing modules. Ensure that npm is installed."
        pause
    fi
fi

if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js to run this script."
    pause
else
    if [ -x "node" ]; then
        echo "Detected local Node.js executable, attempting to use it..."
        ./node src/app.js
    else
        echo "Did not detect local Node.js executable, attempting to use `npm`..."
        npm start
    fi
fi

if [ $? -ne 0 ]; then
    if [ "$1" = "--keep-on-error" ]; then
        pause
    fi
fi
