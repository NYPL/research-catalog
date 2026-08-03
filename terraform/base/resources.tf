provider "aws" {
  region     = "us-east-1"
}

locals {
  tags = {
    Project = "Research Catalog"
    BusinessUnit = "LSP"
  }
}

variable "environment" {
  type = string
  default = "qa"
  description = "The name of the environment (qa, production). This controls the env vars loaded."

  validation {
    condition     = contains(["qa", "production"], var.environment)
    error_message = "The environment must be 'qa' or 'production'."
  }
}



