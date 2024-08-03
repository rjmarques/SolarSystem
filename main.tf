terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# List all files in the static directory
locals {
  static_files = fileset("${path.module}/dist/", "**/*")
}

output "name" {
  value = "solar"
}

output "path" {
  value = path.module
}

output "static_file_paths" {
  value = [for file in local.static_files : "${path.module}/dist/${file}"]
}