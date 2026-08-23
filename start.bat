@echo off
setlocal

cd /d "%~dp0"
set "PORT=5173"

for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
    echo Stopping existing application on port %PORT%, PID %%P...
    taskkill /F /PID %%P >nul 2>&1
)

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo Starting application...
call npm run dev -- --host 127.0.0.1 --port %PORT%

endlocal
