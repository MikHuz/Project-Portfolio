# Define folders
$src = "originals"
$dest = "resized"
$desktop = Join-Path $dest "desktop"
$tablet = Join-Path $dest "tablet"
$mobile = Join-Path $dest "mobile"

# Loop through all image files in subfolders
Get-ChildItem $src -Include *.jpg, *.jpeg, *.png, *.webp -Recurse | ForEach-Object {
    # Just keep the *immediate parent folder* name (e.g. "traditional")
    $relativePath = Split-Path $_.DirectoryName -Leaf
    $filename = $_.BaseName
    $ext = $_.Extension

    # Destination paths for each size (simplified folder structure)
    $desktopDest = Join-Path $desktop $relativePath
    $tabletDest  = Join-Path $tablet $relativePath
    $mobileDest  = Join-Path $mobile $relativePath

    # Create destination subfolders if needed
    New-Item -ItemType Directory -Force -Path $desktopDest, $tabletDest, $mobileDest | Out-Null

    # Resize and save
    magick $_.FullName -resize 1920x -quality 80 (Join-Path $desktopDest "$filename$ext")
    magick $_.FullName -resize 1080x -quality 80 (Join-Path $tabletDest  "$filename$ext")
    magick $_.FullName -resize 480x  -quality 80 (Join-Path $mobileDest  "$filename$ext")

    Write-Host "Processed $relativePath\$filename$ext"
}