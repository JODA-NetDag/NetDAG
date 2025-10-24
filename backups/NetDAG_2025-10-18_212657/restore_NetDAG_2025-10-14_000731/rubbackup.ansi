@echo off
REM ============================
REM NetDAG backup (CMD-only)
REM Creates a timestamped folder snapshot and a .zip (if tar.exe exists)
REM ============================

setlocal EnableExtensions EnableDelayedExpansion

REM --- Go to the folder where this script lives (your project root)
cd /d "%~dp0"

REM --- Make backups folder if missing
if not exist "backups" mkdir "backups"

REM --- Build a robust timestamp (prefer WMIC; fallback to DATE/TIME)
set "ts="
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value 2^>NUL') do set "ldt=%%I"
if defined ldt (
  REM ldt=YYYYMMDDhhmmss.milliseconds+offset
  set "ts=!ldt:~0,4!-!ldt:~4,2!-!ldt:~6,2!_!ldt:~8,2!!ldt:~10,2!!ldt:~12,2!"
) else (
  REM locale fallback
  set "ts=%date%_%time%"
  set "ts=!ts::=!"
  set "ts=!ts:/=-!"
  set "ts=!ts: =0!"
  set "ts=!ts:.=!"
)

set "SNAP=backups\NetDAG_!ts!"
set "ZIP=backups\NetDAG_!ts!.zip"

REM --- Exclude heavy/irrelevant dirs; mirror everything else into snapshot
set "EXCL=/XD node_modules .git backups .next dist .vercel out build"
robocopy . "!SNAP!" /MIR /R:1 /W:1 /NFL /NDL /NJH /NJS %EXCL% >nul

REM --- Zip snapshot if tar.exe is available (Windows 10/11 usually have it)
where tar >nul 2>nul
if %errorlevel%==0 (
  if exist "!ZIP!" del /f /q "!ZIP!" >nul 2>nul
  tar -a -c -f "!ZIP!" -C "backups" "NetDAG_!ts!" >nul
  echo.
  echo ✅ Backup snapshot created at: "%CD%\!SNAP!"
  echo ✅ ZIP created:               "%CD%\!ZIP!"
) else (
  echo.
  echo ✅ Backup snapshot created at: "%CD%\!SNAP!"
  echo ⚠  "tar.exe" not found; skipped ZIP step. (Folder snapshot is still safe.)
)

echo.
echo Press any key to close...
pause >nul
endlocal