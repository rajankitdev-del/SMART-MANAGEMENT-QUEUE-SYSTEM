@echo off
echo Starting Git Push to https://github.com/rajankitdev-del/SMART-MANAGEMENT-QUEUE-SYSTEM.git...

:: Initialize Git if it isn't already
if not exist ".git" (
    git init
)

:: Add all files
git add .

:: Commit with a default message
git commit -m "Initialize project and add basic backend setup"

:: Set branch to main and add remote (ignores error if remote already exists)
git branch -M main
git remote add origin https://github.com/rajankitdev-del/SMART-MANAGEMENT-QUEUE-SYSTEM.git

:: Push to remote
git push -u origin main

echo.
echo Process complete! Press any key to exit.
pause
