#!/bin/bash
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

if ! [ -e "node" ]; then
    echo "Detected local Node.js executable, attempting to use it..."
    node src/app.js
else
    echo "Did not detect local Node.js executable, attempting to use `npm`..."
    npm start
fi

if [ $? -ne 0 ]; then
    if [ "$1" -eq "--keep-on-error" ]; then
        pause
    fi
fi
