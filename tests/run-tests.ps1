$testDirectory = "$PSScriptRoot\pages"
$testFiles = Get-ChildItem -Path $testDirectory -File
foreach ($testFile in $testFiles) {
  $logFile = "$PSScriptRoot\output\result-$testFile.log"
  $testFileName = $testFile.FullName
  Start-Process -FilePath "msedge" -ArgumentList "$testFileName --user-data-dir=C:\msedge-dev-data\ --disable-web-security --enable-logging --i=1 --log-file=$logFile"
}
