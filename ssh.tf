resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "local_file" "private_key" {
  content  = tls_private_key.ssh_key.private_key_pem
  filename = "${path.module}/id_rsa"
}

output "ssh_command" {
  value = "ssh -i ${local_file.private_key.filename} ${var.admin_username}@${azurerm_public_ip.public_ip.ip_address}"
}
