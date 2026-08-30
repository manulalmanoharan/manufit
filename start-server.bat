@echo off
setlocal

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
    echo Node.js / npm was not found in PATH.
    echo Please install Node.js and restart your terminal before running this server.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing project dependencies...
    call npm install
    if errorlevel 1 (
        echo Dependency install failed.
        pause
        exit /b 1
    )
)

echo Starting ManuFit API server...
call npm run dev:api

endlocal
