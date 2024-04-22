# Azure VM Deployment with Terraform

This repository contains Terraform scripts to deploy an Ubuntu 22.04 virtual machine (VM) in Azure within an existing network and subnet. The VM is accessible via SSH using a generated SSH key pair. The setup follows best practices for infrastructure as code (IaC) and uses Azure's France Central region.

## Features

- **Azure Virtual Machine**: Deploys a Ubuntu 22.04 VM using the Standard_D2s_v3 size.
- **SSH Access**: Generates an SSH key pair and configures the VM to allow SSH access.
- **Public IP**: Assigns a static public IP address to the VM for remote access.
- **Existing Network**: Utilizes an existing virtual network and subnet for VM deployment.
- **Security**: Disables password authentication to ensure access is secured via SSH keys only.

## Prerequisites

Before you begin, ensure you have the following:
- Azure CLI installed
- Terraform v0.12.x or later
- An Azure subscription
- Access to an existing resource group, virtual network, and subnet

## Quick Start

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/azure-terraform-vm.git
cd azure-terraform-vm
```

### 2. Initialize Terraform

Run the following command to initialize a working directory with Terraform configuration files:

```bash
terraform init
```

### 3. Create SSH Keys

Generate an SSH key pair if not already done:

```bash
ssh-keygen -t rsa -b 2048 -f ./id_rsa
```

### 4. Apply Terraform Plan

Execute the following command to create the infrastructure:

```bash
terraform apply
```

You will be prompted to review the proposed changes and approve them.

### 5. Connect to Your VM

Once the deployment is complete, connect to your VM using SSH:

```bash
ssh -i ./id_rsa devops@$(terraform output -raw public_ip_address)
```

### 6. Clean up Resources

To destroy the Azure resources created by Terraform, run:

```bash
terraform destroy
```

## Repository Structure

- `main.tf` - Terraform configuration for creating the Azure VM and associated resources.
- `variables.tf` - Variables used in Terraform configurations.
- `outputs.tf` - Outputs after Terraform execution.
- `providers.tf` - Provider configuration for Terraform.
- `ssh.tf` - Terraform configuration for SSH key management.

## Contributing

Contributions to this project are welcome! Please consider forking the repository and submitting a pull request.
