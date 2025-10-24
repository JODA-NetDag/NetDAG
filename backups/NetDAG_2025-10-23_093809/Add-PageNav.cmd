@echo off
setlocal EnableDelayedExpansion

echo Creating backup folder...
if not exist "backup-before-pagenav" mkdir "backup-before-pagenav"

echo.
echo Injecting <nav> into all .html files...
for %%f in (*.html) do (
  echo Processing %%f
  copy "%%f" "backup-before-pagenav\%%f" >nul

  >"%%f.tmp" (
    for /f "usebackq delims=" %%a in ("%%f") do (
      set "line=%%a"
      echo(!line!| find "</main>" >nul
      if !errorlevel! == 0 (
        echo     ^<nav id="page-nav" class="page-nav" aria-label="Page navigation"^>^</nav^>
      )
      echo(!line!
    )
  )
  move /Y "%%f.tmp" "%%f" >nul
)
echo.
echo ✅ Done! Backup saved in "backup-before-pagenav".
pause