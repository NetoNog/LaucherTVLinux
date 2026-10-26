# Fast TV Launcher - PowerShell Package Builder
$projectDir = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $projectDir "dist"
$wgtPath = Join-Path $outputDir "FastTVLauncher-raw.wgt"
$finalWgtPath = Join-Path $outputDir "FastTVLauncher.wgt"
$zipPath = Join-Path $outputDir "FastTVLauncher.zip"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "     Fast TV Launcher - Gerador de Pacote .WGT     " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

if (Test-Path $wgtPath) { Remove-Item $wgtPath -Force }
if (Test-Path $finalWgtPath) { Remove-Item $finalWgtPath -Force }
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

# Verifica se tizen CLI está instalado
$tizenCmd = Get-Command tizen -ErrorAction SilentlyContinue

if ($tizenCmd) {
    Write-Host "[INFO] Tizen CLI detectado! Gerando pacote assinado..." -ForegroundColor Green
    $profile = Read-Host "Perfil de segurança (pressione Enter para 'default')"
    if ([string]::IsNullOrWhiteSpace($profile)) { $profile = "default" }
    
    & tizen package -t wgt -s $profile -o $outputDir $projectDir
    if ($LASTEXITCODE -eq 0 -and (Test-Path $wgtPath)) {
        Write-Host "`n[SUCESSO] Pacote gerado com sucesso em: $wgtPath" -ForegroundColor Green
        return
    }
}

Write-Host "[INFO] Empacotando arquivos para container .WGT compatível com Tizen OS..." -ForegroundColor Yellow

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [System.IO.Compression.ZipFile]::Open($wgtPath, [System.IO.Compression.ZipArchiveMode]::Create)

$filesToInclude = @(
    "config.xml",
    "index.html",
    "icon.png",
    "css/style.css",
    "js/apps.js",
    "js/clock.js",
    "js/weather.js",
    "js/main.js",
    "js/navigation.js",
    "js/tizen-keys.js"
)

foreach ($relPath in $filesToInclude) {
    $fullPath = Join-Path $projectDir ($relPath.Replace('/', '\'))
    if (Test-Path $fullPath) {
        $entryName = $relPath.Replace('\', '/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $fullPath, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
}

$zip.Dispose()

if (Test-Path $wgtPath) {
    Write-Host "`n===================================================" -ForegroundColor Green
    Write-Host "[SUCESSO] Pacote .WGT criado com sucesso!" -ForegroundColor Green
    Write-Host "Arquivo: $wgtPath" -ForegroundColor White
    Write-Host "===================================================" -ForegroundColor Green
} else {
    Write-Host "`n[ERRO] Falha ao gerar o arquivo .wgt." -ForegroundColor Red
}
