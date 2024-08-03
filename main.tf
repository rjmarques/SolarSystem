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

output "build_path" {
  value = "${path.module}/dist/"
}

output "static_files" {
  value = [for file in local.static_files : file]
}