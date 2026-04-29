@echo off
title AdMix Server
cd /d C:\AdMix

echo.
echo  =============================================
echo    AdMix Local Production Server
echo  =============================================
echo.

echo [1/3] Building production assets...
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo  BUILD FAILED. Check errors above.
  pause
  exit /b 1
)

echo.
echo [2/3] Starting server with PM2...
where pm2 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo PM2 not found. Installing...
  call npm install -g pm2
)

pm2 describe admix >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  pm2 restart admix
) else (
  pm2 start node --name "admix" -- ./node_modules/next/dist/bin/next start
)

echo.
echo [3/3] Opening browser...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo  AdMix is running at http://localhost:3000
echo  To stop: pm2 stop admix
echo  To view logs: pm2 logs admix
echo.
