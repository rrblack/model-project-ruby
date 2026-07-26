@echo off
REM Copies images, audio, and public files from the Rails app into static-site\
REM Run this from the model-site folder (double-click works too).
cd /d "%~dp0"

robocopy "app\assets\images" "static-site\images" /E /NFL /NDL /NJH
robocopy "app\assets\audio" "static-site\audio" /E /NFL /NDL /NJH
copy /Y "public\chart.pdf" "static-site\chart.pdf"
copy /Y "public\icon.png" "static-site\icon.png"
copy /Y "public\icon.svg" "static-site\icon.svg"

echo.
echo Done! static-site\ is now complete and ready to deploy.
pause
