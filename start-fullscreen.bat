@echo off
REM Christmas Countdown - Start in Fullscreen
echo Starting Christmas Countdown in fullscreen...
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the Next.js dev server and open in browser
start /B npm run dev
timeout /t 3 /nobreak >nul
start chrome --kiosk http://localhost:3000

REM Keep window open
pause

