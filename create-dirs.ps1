$directories = @(
    "src\app\dashboard\crm\contacts",
    "src\app\dashboard\crm\conversations",
    "src\app\dashboard\crm\templates",
    "src\app\dashboard\analytics",
    "src\app\dashboard\analytics\performance",
    "src\app\dashboard\analytics\reports",
    "src\app\dashboard\subscription",
    "src\app\dashboard\settings",
    "src\app\dashboard\scraping\scheduled",
    "src\app\dashboard\scraping\history",
    "src\app\dashboard\leads\all",
    "src\app\dashboard\leads\starred",
    "src\app\dashboard\leads\active",
    "src\app\dashboard\leads\tags"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "Creating directory: $dir"
        New-Item -ItemType Directory -Path $dir -Force
    } else {
        Write-Host "Directory already exists: $dir"
    }
}
