# Fast TV Launcher - Automatic Signing and TV Installation Script
$projectDir = Split-Path -Parent $PSScriptRoot
$tzExe = "C:\Users\zigle\.tizen-extension-platform\server\sdktools\data\tools\tizen-core\tz.exe"
$sdbExe = "C:\Users\zigle\.tizen-extension-platform\server\sdktools\data\tools\sdb.exe"

$rawWgtPath = Join-Path $projectDir "dist\FastTVLauncher-raw.wgt"
$wgtPath = Join-Path $projectDir "dist\FastTVLauncher.wgt"
$authorP12 = Join-Path $projectDir "author.p12"
$profilesXml = Join-Path $projectDir "profiles.xml"
$tvIp = "192.168.0.7:26101"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " Fast TV Launcher - Assinador e Instalador Tizen  " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# 1. Cria Certificado de Autor se não existir
if (-not (Test-Path $authorP12)) {
    Write-Host "`n1. Gerando Certificado de Autor (author.p12)..." -ForegroundColor Yellow
    & $tzExe cert -n "FastLauncher" -p "12341234" -f $authorP12
}

# 2. Configura profiles.xml com chaves oficiais do Tizen
Write-Host "`n2. Configurando perfil de segurança..." -ForegroundColor Yellow
$distCert = "C:\Users\zigle\.tizen-extension-platform\server\sdktools\data\tools\certificate-generator\patches\public\certificates\tizen-distributor-signer.p12"
$distCa = "C:\Users\zigle\.tizen-extension-platform\server\sdktools\data\tools\certificate-generator\patches\public\certificates\tizen-distributor-ca.cer"

& $tzExe security-profiles add `
    -n "tvprofile" `
    -A `
    -x $profilesXml `
    -a $authorP12 `
    -p "12341234" `
    -d $distCert `
    -P "tizenpkcs12passfordsigner" `
    -C $distCa

# 3. Assina o pacote .wgt com o perfil configurado
Write-Host "`n3. Assinando o pacote .WGT com certificado Tizen..." -ForegroundColor Yellow
& $tzExe pack -w $projectDir -t wgt -s "tvprofile" -p $profilesXml -b $rawWgtPath -o $wgtPath

# 4. Conecta e Instala na TV
Write-Host "`n4. Conectando a TV Samsung ($tvIp)..." -ForegroundColor Yellow
& $sdbExe connect $tvIp
Start-Sleep -Milliseconds 600

Write-Host "Instalando pacote na TV..." -ForegroundColor Yellow
& $tzExe install -p $wgtPath -e $tvIp

# 5. Executa na TV
Write-Host "`n5. Executando Fast TV Launcher na tela da TV..." -ForegroundColor Yellow
& $sdbExe -s $tvIp shell 0 was_execute "xY6K9b1Lau.FastTVLauncher"

Write-Host "`n===================================================" -ForegroundColor Green
Write-Host "  Concluído com sucesso! Verifique sua Smart TV!   " -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
