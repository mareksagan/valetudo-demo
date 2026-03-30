@echo off
chcp 65001 >nul
echo ==========================================
echo    Valetudo Demo - Starting Server
echo ==========================================
echo.
echo Open http://localhost:3000 in your browser
echo Press Ctrl+C to stop
echo.

set VALETUDO_CONFIG_PATH=valetudo_config.json
node index.js

pause
