#!/bin/bash

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Create app directory
mkdir -p ~/mean-crud-app
cd ~/mean-crud-app

# Clone repository (or copy files manually)
git clone https://github.com/yourusername/mean-crud-app.git .

echo "VM setup complete. Please log out and log back in for group changes to take effect."
