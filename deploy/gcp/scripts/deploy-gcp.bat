@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo AstroGenie Google Cloud Platform Deployment Script
echo ===================================================
echo.

:: Check for help
if "%1"=="-h" goto show_help
if "%1"=="--help" goto show_help
if "%1"=="" goto show_help

:: Get deployment type (first argument)
set DEPLOYMENT_TYPE=%1
if /i not "%DEPLOYMENT_TYPE%"=="cloud-run" if /i not "%DEPLOYMENT_TYPE%"=="app-engine" (
    echo Error: Invalid deployment type. Must be 'cloud-run' or 'app-engine'
    goto show_help
)

echo Deployment type: %DEPLOYMENT_TYPE%

:: Get project ID (second argument)
set PROJECT_ID=%2
if "%PROJECT_ID%"=="" (
    echo Error: Google Cloud project ID is required
    goto show_help
)

echo Project ID: %PROJECT_ID%

:: Get region (third argument, optional)
set REGION=us-central1
if not "%3"=="" set REGION=%3
echo Region: %REGION%

:: Default values for other parameters
set IMAGE_NAME=astrogenie
set SERVICE_NAME=astrogenie

:: Skip tool checks - assume tools are installed
echo Assuming Google Cloud SDK and Docker are installed...

:: Check GCP permissions
echo Checking GCP permissions...
call gcloud projects get-iam-policy %PROJECT_ID% --format="table(bindings.role)" 2>nul | findstr "roles/artifactregistry.admin" >nul
if %ERRORLEVEL% neq 0 (
    echo WARNING: You may not have the required permissions to use Artifact Registry.
    echo Required roles: roles/artifactregistry.admin, roles/run.admin
    echo To grant these roles, run:
    echo   gcloud projects add-iam-policy-binding %PROJECT_ID% --member=user:YOUR_EMAIL --role=roles/artifactregistry.admin
    echo   gcloud projects add-iam-policy-binding %PROJECT_ID% --member=user:YOUR_EMAIL --role=roles/run.admin
    echo.
    echo Press Ctrl+C to cancel or any key to continue anyway...
    pause >nul
)

:: Set the Google Cloud project
echo Setting Google Cloud project to: %PROJECT_ID%
call gcloud config set project "%PROJECT_ID%"
if %ERRORLEVEL% neq 0 (
    echo Failed to set Google Cloud project
    exit /b 1
)

:: Ensure authentication is set up
echo Configuring Docker authentication for Google Cloud...
call gcloud auth configure-docker %REGION%-docker.pkg.dev
if %ERRORLEVEL% neq 0 (
    echo Failed to configure Docker authentication
    exit /b 1
)

:: Create Artifact Registry repository if it doesn't exist
echo Checking if Artifact Registry repository exists...
call gcloud artifacts repositories describe %IMAGE_NAME% --location=%REGION% >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Creating new Artifact Registry repository...
    call gcloud artifacts repositories create %IMAGE_NAME% --repository-format=docker --location=%REGION% --description="Repository for AstroGenie images"
    
    :: Check again if repository exists after creation attempt
    call gcloud artifacts repositories describe %IMAGE_NAME% --location=%REGION% >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        echo ERROR: Failed to create or access Artifact Registry repository.
        echo This may be due to insufficient permissions.
        echo Required role: roles/artifactregistry.admin
        echo To grant this role, run:
        echo   gcloud projects add-iam-policy-binding %PROJECT_ID% --member=user:YOUR_EMAIL --role=roles/artifactregistry.admin
        exit /b 1
    ) else (
        echo Repository created or already exists.
    )
) else (
    echo Repository already exists.
)

:: Store the current directory
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..\..\

:: Build the application
echo Building the application...
echo Current directory: %CD%
echo Project root: %PROJECT_ROOT%
cd /d "%PROJECT_ROOT%"
echo New directory: %CD%

set NODE_OPTIONS=--openssl-legacy-provider
set DISABLE_ESLINT_PLUGIN=true
call npm run build:web
if %ERRORLEVEL% neq 0 (
    echo Failed to build the application
    exit /b 1
)

:: Deploy based on the selected type
if /i "%DEPLOYMENT_TYPE%"=="cloud-run" (
    echo Deploying to Cloud Run...
    
    :: Use Artifact Registry instead of Container Registry
    set IMAGE_URL=%REGION%-docker.pkg.dev/%PROJECT_ID%/%IMAGE_NAME%/%SERVICE_NAME%:v1
    
    echo Building Docker image: !IMAGE_URL!
    call docker build -t "!IMAGE_URL!" -f deploy\Dockerfile .
    if %ERRORLEVEL% neq 0 (
        echo Failed to build Docker image
        exit /b 1
    )
    
    echo Pushing Docker image to Artifact Registry...
    call docker push "!IMAGE_URL!"
    if %ERRORLEVEL% neq 0 (
        echo Failed to push Docker image
        echo This may be due to insufficient permissions.
        echo Required role: roles/artifactregistry.writer
        echo To grant this role, run:
        echo   gcloud artifacts repositories add-iam-policy-binding %IMAGE_NAME% --location=%REGION% --member=user:YOUR_EMAIL --role=roles/artifactregistry.writer
        exit /b 1
    )
    
    echo Deploying to Cloud Run...
    call gcloud run deploy "%SERVICE_NAME%" ^
        --image="!IMAGE_URL!" ^
        --platform=managed ^
        --region="%REGION%" ^
        --allow-unauthenticated ^
        --memory=1Gi ^
        --cpu=1 ^
        --port=80 ^
        --set-env-vars=NODE_ENV=production
    if %ERRORLEVEL% neq 0 (
        echo Failed to deploy to Cloud Run
        echo This may be due to insufficient permissions.
        echo Required role: roles/run.admin
        echo To grant this role, run:
        echo   gcloud projects add-iam-policy-binding %PROJECT_ID% --member=user:YOUR_EMAIL --role=roles/run.admin
        exit /b 1
    )
    
    echo Deployment to Cloud Run completed successfully!
    for /f "tokens=*" %%a in ('gcloud run services describe "%SERVICE_NAME%" --region="%REGION%" --format="value(status.url)"') do (
        echo Your application is available at: %%a
    )
) else if /i "%DEPLOYMENT_TYPE%"=="app-engine" (
    echo Deploying to App Engine...
    
    :: Copy the app.yaml file to the root directory
    copy deploy\gcp\config\app.yaml app.yaml
    if %ERRORLEVEL% neq 0 (
        echo Failed to copy app.yaml
        exit /b 1
    )
    
    :: Deploy to App Engine
    call gcloud app deploy --quiet
    if %ERRORLEVEL% neq 0 (
        echo Failed to deploy to App Engine
        echo This may be due to insufficient permissions.
        echo Required role: roles/appengine.appAdmin
        echo To grant this role, run:
        echo   gcloud projects add-iam-policy-binding %PROJECT_ID% --member=user:YOUR_EMAIL --role=roles/appengine.appAdmin
        exit /b 1
    )
    
    :: Clean up
    del app.yaml
    
    echo Deployment to App Engine completed successfully!
    echo Your application is available at: https://%PROJECT_ID%.appspot.com
)

echo Deployment process completed!
goto :eof

:show_help
echo Usage: %0 DEPLOYMENT_TYPE PROJECT_ID [REGION]
echo.
echo Parameters:
echo   DEPLOYMENT_TYPE   Deployment type: cloud-run or app-engine
echo   PROJECT_ID        Google Cloud project ID
echo   REGION            Google Cloud region (default: us-central1, only used for Cloud Run)
echo.
echo Examples:
echo   %0 cloud-run my-gcp-project us-central1
echo   %0 app-engine my-gcp-project
echo.
echo Options:
echo   -h, --help        Show this help message
echo.
echo Required GCP Permissions:
echo   - For Cloud Run: roles/artifactregistry.admin, roles/run.admin
echo   - For App Engine: roles/appengine.appAdmin
exit /b 1

endlocal 