@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo     Fast TV Launcher - Deploy na Samsung Smart TV
echo ===================================================
echo.

set SCRIPT_DIR=%~dp0
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%sign-and-install.ps1"

echo.
pause
