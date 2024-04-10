@echo off
if NOT EXIST node_modules (
    ECHO Did not detect node_modules directory; Installing modules...
    CALL npm i --production --silent
    if NOT EXIST node_modules (
        START CMD /C "ECHO A problem occurred while installing modules. Ensure that npm is installed. && PAUSE"
        EXIT
    )
    ECHO Modules installed.
)

if exist node.exe (
    ECHO Detected local Node.js executable, attempting to use it...
    CALL node.exe --trace-deprecation src/app.js
) else (
    ECHO Did not detect local Node.js executable, attempting to use `npm`...
    CALL npm start
)

if errorlevel 1 (
    if "%1" == "--keep-on-error" (
        pause
    )
)
