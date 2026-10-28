# start_server.ps1
# Simple script to launch a local static server for Dev Task Hub
# Usage: Open PowerShell in the project folder and run `./start_server.ps1`

$port = 8080

function Start-PythonServer {
    if (Get-Command python -ErrorAction SilentlyContinue) {
        Write-Host "Starting Python HTTP server on http://localhost:$port ..."
        python -m http.server $port
        return $true
    }
    return $false
}

function Start-NodeServer {
    if (Get-Command npx -ErrorAction SilentlyContinue) {
        Write-Host "Python not found. Falling back to npm http-server on http://localhost:$port ..."
        npx http-server -p $port
        return $true
    }
    return $false
}

if (-not (Start-PythonServer)) {
    if (-not (Start-NodeServer)) {
        Write-Host "Neither Python nor npm (npx) were found. Please install Python (https://python.org) or Node.js (https://nodejs.org) and retry."
    }
}
