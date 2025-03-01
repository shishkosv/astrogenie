@echo off
echo ===================================================
echo AstroGenie Google Cloud Platform Deployment Script
echo ===================================================
echo.

REM Check arguments
if "%1"=="" goto show_help
if "%2"=="" goto show_help

REM Set variables
set TYPE=%1
set PROJECT=%2
set REGION=us-central1
if not "%3"=="" set REGION=%3

echo Deployment type: %TYPE%
echo Project ID: %PROJECT%
echo Region: %REGION%

REM Set project
echo Setting Google Cloud project...
gcloud config set project "%PROJECT%"
if errorlevel 1 (
    echo Failed to set project
    goto end
)

REM Configure Docker authentication
echo Configuring Docker authentication...
gcloud auth configure-docker %REGION%-docker.pkg.dev
if errorlevel 1 (
    echo Failed to configure Docker authentication
    goto end
)

REM Create Artifact Registry repository if needed
echo Checking Artifact Registry repository...
gcloud artifacts repositories describe astrogenie --location=%REGION% >nul 2>&1
if errorlevel 1 (
    echo Creating Artifact Registry repository...
    gcloud artifacts repositories create astrogenie --repository-format=docker --location=%REGION% --description="Repository for AstroGenie images"
    if errorlevel 1 (
        echo Failed to create repository
        goto end
    )
)

REM Store the current directory and get project root
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..\..\

REM Build application
echo Building application...
echo Current directory: %CD%
echo Project root: %PROJECT_ROOT%
cd /d "%PROJECT_ROOT%"
echo New directory: %CD%

set NODE_OPTIONS=--openssl-legacy-provider
set DISABLE_ESLINT_PLUGIN=true
call npm run build:web
if errorlevel 1 (
    echo Failed to build application
    goto end
)

REM Deploy based on type
if /i "%TYPE%"=="cloud-run" (
    echo Deploying to Cloud Run...
    
    REM Use Artifact Registry instead of Container Registry
    set IMAGE=%REGION%-docker.pkg.dev/%PROJECT%/astrogenie/astrogenie:v1
    
    echo Building Docker image: %IMAGE%
    docker build -t %IMAGE% -f deploy\Dockerfile .
    if errorlevel 1 (
        echo Failed to build Docker image
        goto end
    )
    
    echo Pushing Docker image to Artifact Registry...
    docker push %IMAGE%
    if errorlevel 1 (
        echo Failed to push Docker image
        goto end
    )
    
    echo Deploying to Cloud Run...
    gcloud run deploy astrogenie ^
        --image=%IMAGE% ^
        --platform=managed ^
        --region=%REGION% ^
        --allow-unauthenticated ^
        --memory=1Gi ^
        --cpu=1 ^
        --port=80 ^
        --set-env-vars=NODE_ENV=production
    if errorlevel 1 (
        echo Failed to deploy to Cloud Run
        goto end
    )
    
    echo Deployment to Cloud Run completed successfully!
    
) else if /i "%TYPE%"=="app-engine" (
    echo Deploying to App Engine...
    
    copy deploy\gcp\config\app.yaml app.yaml
    if errorlevel 1 (
        echo Failed to copy app.yaml
        goto end
    )
    
    gcloud app deploy --quiet
    if errorlevel 1 (
        echo Failed to deploy to App Engine
        goto end
    )
    
    del app.yaml
    
    echo Deployment to App Engine completed successfully!
    echo Your application is available at: https://%PROJECT%.appspot.com
    
) else (
    echo Error: Invalid deployment type. Must be 'cloud-run' or 'app-engine'
    goto show_help
)

echo Deployment process completed!
goto end

:show_help
echo Usage: %0 TYPE PROJECT [REGION]
echo.
echo Parameters:
echo   TYPE      Deployment type: cloud-run or app-engine
echo   PROJECT   Google Cloud project ID
echo   REGION    Google Cloud region (default: us-central1, only for Cloud Run)
echo.
echo Examples:
echo   %0 cloud-run my-gcp-project us-central1
echo   %0 app-engine my-gcp-project

:end 