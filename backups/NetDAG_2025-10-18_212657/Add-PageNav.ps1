# Add-PageNav.ps1
# Inserts the <nav id="page-nav"> placeholder into every .html file (once).
# It prefers to place it right AFTER </header>, otherwise after <body>.
# Makes a timestamped backup before changing anything.

$root = Get-Location
$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupDir = Join-Path $root "backup_page_nav_$stamp"
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

$snippet = '<nav id="page-nav" class="page-nav" aria-label="Page navigation"></nav>'

$files = Get-ChildItem -Path $root -Filter *.html -File -Recurse |
         Where-Object { $_.FullName -notmatch '\\backup_page_nav_' }  # skip previous backups

$changed = 0

foreach ($file in $files) {
    $text = Get-Content -Raw -LiteralPath $file.FullName

    # Skip if nav already exists
    if ($text -match 'id="page-nav"') {
        Write-Host "SKIP (already has page-nav): $($file.Name)"
        continue
    }

    # Decide where to inject
    $new = $null
    if ($text -match '</header>') {
        $new = $text -replace '</header>', "</header>`r`n$snippet"
    } elseif ($text -match '<body[^>]*>') {
        $new = $text -replace '(<body[^>]*>)', "`$1`r`n$snippet"
    } else {
        # As a last resort, put it at the top
        $new = "$snippet`r`n$text"
    }

    # Backup original
    $rel = Resolve-Path -LiteralPath $file.FullName | Split-Path -Leaf
    Copy-Item -LiteralPath $file.FullName -Destination (Join-Path $backupDir $rel)

    # Write back (UTF-8)
    Set-Content -LiteralPath $file.FullName -Value $new -Encoding UTF8

    Write-Host "OK  (injected): $($file.Name)"
    $changed++
}

Write-Host "----------------------------------------------"
Write-Host "Done. Files changed: $changed"
Write-Host "Backup folder: $backupDir"