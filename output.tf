output "resource_group_name" {
  value= var.resource_group_name
}

output "public_ip_address" {
  value = azurerm_public_ip.public_ip.ip_address
}
