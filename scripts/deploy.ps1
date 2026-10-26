# Fast TV Launcher - PowerShell SDB Deployment Script
param (
    [string]$TvIp = ""
)

$projectDir = Split-Path -Parent $PSScriptRoot
$wgtPath = Join-Path $projectDir "dist\FastTVLauncher.wgt"
$appId = "xY6K9b1Lau.FastTVLauncher"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "     Fast TV Launcher - Deploy na Samsung Smart TV " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

if (-not (Test-Path $wgtPath)) {
    Write-Host "[ERRO] Pacote .wgt não encontrado em $wgtPath" -ForegroundColor Red
    Write-Host "Execute scripts/build-wgt.ps1 primeiro!" -ForegroundColor Yellow
    exit 1
}

# Localiza sdb.exe no PATH ou em locais padrão conhecidos
$sdbCmd = Get-Command sdb -ErrorAction SilentlyContinue
$sdbExe = if ($sdbCmd) { $sdbCmd.Source } else { $null }

if (-not $sdbExe) {
    $knownSdbPaths = @(
        "C:\Users\zigle\.tizen-extension-platform\server\sdktools\data\tools\sdb.exe",
        "$env:LOCALAPPDATA\tizen-studio\tools\sdb.exe",
        "C:\tizen-studio\tools\sdb.exe"
    )
    foreach ($p in $knownSdbPaths) {
        if (Test-Path $p) {
            $sdbExe = $p
            break
        }
    }
}

if (-not $sdbExe) {
    Write-Host "[ERRO] 'sdb.exe' não encontrado!" -ForegroundColor Red
    Write-Host "Instale o Tizen Studio ou adicione o 'tools' ao PATH." -ForegroundColor Yellow
    exit 1
}

if ([string]::IsNullOrWhiteSpace($TvIp)) {
    $TvIp = Read-Host "Digite o IP da Smart TV Samsung (ex: 192.168.1.100)"
}

if ([string]::IsNullOrWhiteSpace($TvIp)) {
    Write-Host "[ERRO] IP inválido." -ForegroundColor Red
    exit 1
}

$targetDevice = "${TvIp}:26101"

Write-Host "`n1. Conectando a Smart TV via SDB ($targetDevice)..." -ForegroundColor Yellow
& $sdbExe connect $targetDevice

Write-Host "`n2. Verificando dispositivos conectados..." -ForegroundColor Yellow
& $sdbExe devices

Write-Host "`n3. Instalando o pacote FastTVLauncher.wgt na TV..." -ForegroundColor Yellow
$tizenCmd = Get-Command tizen -ErrorAction SilentlyContinue
if ($tizenCmd) {
    & tizen install -n $wgtPath -t $targetDevice
} else {
    & $sdbExe install $wgtPath
}

Write-Host "`n4. Iniciando o Fast TV Launcher..." -ForegroundColor Yellow
if ($tizenCmd) {
    & tizen run -p $appId -t $targetDevice
} else {
    & $sdbExe shell 0 was_execute $appId
}

Write-Host "`n===================================================" -ForegroundColor Green
Write-Host "  Deploy concluído! Verifique a tela da sua TV.   " -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
