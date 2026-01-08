# CHANGE THESE IF NEEDED
$BASE_URL = "http://localhost:5000"
$EMAIL = "test@user.com"
$PASSWORD = "123456"

Write-Host "Logging in..."

$login = Invoke-RestMethod `
  -Uri "$BASE_URL/api/auth/login" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body (@{
    email = $EMAIL
    password = $PASSWORD
  } | ConvertTo-Json)

$TOKEN = $login.token
Write-Host "Token received"

$HEADERS = @{
  "Authorization" = "Bearer $TOKEN"
  "Content-Type"  = "application/json"
}

Write-Host "Fetching products..."
Invoke-RestMethod -Uri "$BASE_URL/api/products" -Method GET

Write-Host "Getting cart..."
Invoke-RestMethod -Uri "$BASE_URL/api/cart" -Method GET -Headers $HEADERS

Write-Host "Fetching my orders..."
Invoke-RestMethod -Uri "$BASE_URL/api/orders/my" -Method GET -Headers $HEADERS

Write-Host "ALL CORE APIS WORKING"
