@echo off
echo Starting Serenitea...

:: Start Backend
echo Opening Backend [FastAPI]...
start "Serenitea Backend" cmd /k "cd backend && call venv\Scripts\activate && uvicorn main:app --reload"

:: Start Frontend
echo Opening Frontend [React]...
start "Serenitea Frontend" cmd /k "cd frontend && call node-env\Scripts\activate && npm run dev"

echo.
echo Waiting 3 seconds for servers to start...
timeout /t 3 /nobreak >nul

echo Opening website in your default browser...
start http://localhost:5173

echo.
echo Both servers are running in separate terminal windows.
echo Keep those terminals open while you use the app!
echo.
pause
