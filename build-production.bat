@echo off
:: setlocal enabledelayedexpansion

:: for /f "tokens=2 delims==" %%G in ('wmic os get localdatetime /value') do set "datetime=%%G"
:: set "year=!datetime:~0,4!"
:: set "month=!datetime:~4,2!"
:: set "day=!datetime:~6,2!"
:: set "hour=!datetime:~8,2!"
:: set "minute=!datetime:~10,2!"
:: set suffix=_%day%%month%%year%_%hour%%minute%

echo starting...
:: Run vite build
CALL echo building...
CALL npm run build-manual

:: Copy files using xcopy
CALL echo coping...
CALL xcopy "WEB-INF" "dist\WEB-INF" /E /I

:: Create jar file
CALL echo building jar...
:: CALL jar -cvf toa-an-fe!suffix!.war -C dist .
CALL jar -cvf toa-an-fe.war -C dist .

CALL echo done!!!
CALL pause