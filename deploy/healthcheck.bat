@echo off
setlocal enabledelayedexpansion

:: Default values
set CONTAINER_NAME=astrogenie-web
set HOST=localhost
set PORT=80
set TIMEOUT=5

:: Display help message
if "%1"=="-h" goto :help
if "%1"=="--help" goto :help

:: Process command line arguments
:parse_args
if "%1"=="" goto :check
if "%1"=="-c" (
    set CONTAINER_NAME=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--container" (
    set CONTAINER_NAME=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="-H" (
    set HOST=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--host" (
    set HOST=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="-p" (
    set PORT=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--port" (
    set PORT=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="-t" (
    set TIMEOUT=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--timeout" (
    set TIMEOUT=%2
    shift
    shift
    goto :parse_args
)

echo Unknown option: %1
echo Use -h or --help to see available options
exit /b 1

:help
echo Usage: deploy\healthcheck.bat [options]
echo.
echo Options:
echo   -h, --help              Show this help message
echo   -c, --container NAME    Specify container name (default: %CONTAINER_NAME%)
echo   -H, --host HOST         Specify host (default: %HOST%)
echo   -p, --port PORT         Specify port (default: %PORT%)
echo   -t, --timeout SECONDS   Specify timeout in seconds (default: %TIMEOUT%)
echo.
exit /b 0

:check
:: Check if container is running
echo Checking if container %CONTAINER_NAME% is running...
docker ps | findstr %CONTAINER_NAME% > nul
if errorlevel 1 (
    echo Container %CONTAINER_NAME% is not running!
    exit /b 1
)

:: Check if container is healthy
echo Checking container health...
for /f "tokens=*" %%a in ('docker inspect --format="{{.State.Status}}" %CONTAINER_NAME%') do set CONTAINER_STATUS=%%a
if not "%CONTAINER_STATUS%"=="running" (
    echo Container %CONTAINER_NAME% is not healthy! Status: %CONTAINER_STATUS%
    exit /b 1
)

:: Check if application is responding
echo Checking if application is responding at http://%HOST%:%PORT%...
curl -s --head --request GET --connect-timeout %TIMEOUT% http://%HOST%:%PORT% | findstr "200 OK\|301 Moved Permanently" > nul
if errorlevel 1 (
    echo Application is not responding!
    exit /b 1
)

echo Health check passed! Container %CONTAINER_NAME% is running and application is responding.
exit /b 0 