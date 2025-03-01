@echo off
setlocal enabledelayedexpansion

:: Default values
set DOMAIN=localhost
set OUTPUT_DIR=.\deploy\ssl
set DAYS=365

:: Display help message
if "%1"=="-h" goto :help
if "%1"=="--help" goto :help

:: Process command line arguments
:parse_args
if "%1"=="" goto :generate
if "%1"=="-d" (
    set DOMAIN=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--domain" (
    set DOMAIN=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="-o" (
    set OUTPUT_DIR=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--output" (
    set OUTPUT_DIR=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="-v" (
    set DAYS=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--validity" (
    set DAYS=%2
    shift
    shift
    goto :parse_args
)

echo Unknown option: %1
echo Use -h or --help to see available options
exit /b 1

:help
echo Usage: deploy\generate-ssl-cert.bat [options]
echo.
echo Options:
echo   -h, --help              Show this help message
echo   -d, --domain DOMAIN     Specify domain name (default: %DOMAIN%)
echo   -o, --output DIR        Specify output directory (default: %OUTPUT_DIR%)
echo   -v, --validity DAYS     Specify validity period in days (default: %DAYS%)
echo.
exit /b 0

:generate
:: Check if OpenSSL is installed
where openssl > nul 2>&1
if errorlevel 1 (
    echo OpenSSL is not installed or not in the PATH.
    echo Please install OpenSSL and try again.
    exit /b 1
)

:: Create output directory if it doesn't exist
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

:: Generate SSL certificate
echo Generating self-signed SSL certificate for %DOMAIN%...
openssl req -x509 -nodes -days %DAYS% -newkey rsa:2048 ^
  -keyout "%OUTPUT_DIR%\key.pem" ^
  -out "%OUTPUT_DIR%\cert.pem" ^
  -subj "/CN=%DOMAIN%" ^
  -addext "subjectAltName=DNS:%DOMAIN%,DNS:www.%DOMAIN%,IP:127.0.0.1"

if errorlevel 1 (
    echo Failed to generate SSL certificate.
    exit /b 1
)

echo SSL certificate generated successfully!
echo Certificate: %OUTPUT_DIR%\cert.pem
echo Private key: %OUTPUT_DIR%\key.pem
echo Validity: %DAYS% days

:: Instructions for trusting the certificate
echo.
echo To trust this certificate in your browser:
echo.
echo Chrome/Edge:
echo   1. Open chrome://settings/certificates (or edge://settings/certificates)
echo   2. Go to 'Authorities' tab
echo   3. Click 'Import' and select %OUTPUT_DIR%\cert.pem
echo   4. Check 'Trust this certificate for identifying websites' and click OK
echo.
echo Firefox:
echo   1. Open about:preferences#privacy
echo   2. Scroll down to 'Certificates' and click 'View Certificates'
echo   3. Go to 'Authorities' tab
echo   4. Click 'Import' and select %OUTPUT_DIR%\cert.pem
echo   5. Check 'Trust this CA to identify websites' and click OK
echo.

exit /b 0 