@echo off
title AdMix Server Status
echo.
echo  =============================================
echo    AdMix Server Status
echo  =============================================
echo.
pm2 status admix
echo.
echo  URL: http://localhost:3000
echo.
pause
