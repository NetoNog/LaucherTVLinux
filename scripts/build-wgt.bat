@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo     Fast TV Launcher - Gerador de Pacote .WGT
echo ===================================================
echo.

set SCRIPT_DIR=%~dp0
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%build-wgt.ps1"

echo.
pause
