ECHO OFF
SET name=%1
SET template=%2

::Validate input paramters
IF [%1] == [] GOTO INVALID_INPUTS
IF [%2] == [] GOTO INVALID_INPUTS

::Check for valid templates
IF %template% NEQ field IF %template% NEQ dataset GOTO TEMPLATE_ERROR

::Check if pnpm is installed 
WHERE pnpm
IF %ERRORLEVEL% NEQ 0 npm i -g pnpm 

::Create PFC control
ECHO Initializing control
MKDIR %name%
CD %name%
CMD /C pac pcf init -ns Antares.Pcf -n %name% -t %template% 


::Install node dependencies
ECHO Installing node dependencies
CMD /C pnpm i


::Add control to soltion
ECHO Adding control reference to solution
CD ../../Solution
CMD /C pac solution add-reference --path "..\Controls\%name%"

::Increment solution version
ECHO Incrementing solution version
"../Tools/IncrementVersion.exe" ".\Other\Solution.xml" "/ImportExportXml/SolutionManifest/Version"
GOTO END

:TEMPLATE_ERROR
ECHO %template% is wrong template. Please use one of the following. & ECHO.1. field & ECHO.2. dataset
GOTO END

:INVALID_INPUTS
ECHO Error: Required agrument/s are missing. 
ECHO. & ECHO.Usage: CreateControl.bat ^<Control Name^> ^<Template^>
ECHO Use one of the following. & ECHO.1. field & ECHO.2. dataset
GOTO END

:END