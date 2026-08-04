@echo off
call npm test
if errorlevel 1 exit /b 1
call npm start
