@echo off
title Servidor EstudaMais - Celular e Tablet Android
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -NoExit -File "%~dp0server.ps1"
pause
