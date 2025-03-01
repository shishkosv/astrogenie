@echo off
setlocal

:: Change to the project root directory
cd /d "%~dp0\.."

:: Display help message
if "%1"=="-h" goto :help
if "%1"=="--help" goto :help

:: Process command line arguments
if "%1"=="-b" goto :build
if "%1"=="--build" goto :build
if "%1"=="-r" goto :run
if "%1"=="--run" goto :run
if "%1"=="-s" goto :stop
if "%1"=="--stop" goto :stop
if "%1"=="-d" goto :deploy
if "%1"=="--deploy" goto :deploy
if "%1"=="" goto :deploy

echo Unknown option: %1
echo Use -h or --help to see available options
exit /b 1

:help
echo Usage: deploy\deploy.bat [options]
echo.
echo Options:
echo   -h, --help     Show this help message
echo   -b, --build    Build the Docker image
echo   -r, --run      Run the Docker container
echo   -s, --stop     Stop the Docker container
echo   -d, --deploy   Build and run the Docker container
echo.
exit /b 0

:build
echo Building Docker image...
docker-compose -f deploy/docker-compose.yml build
echo Docker image built successfully!
exit /b 0

:run
echo Starting Docker container...
docker-compose -f deploy/docker-compose.yml up -d
echo Docker container started successfully!
echo The application is now running at http://localhost
exit /b 0

:stop
echo Stopping Docker container...
docker-compose -f deploy/docker-compose.yml down
echo Docker container stopped successfully!
exit /b 0

:deploy
echo Building and deploying Docker container...
call :build
call :run
exit /b 0 