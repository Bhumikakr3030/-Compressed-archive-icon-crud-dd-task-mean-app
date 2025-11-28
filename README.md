🚀 MEAN Stack CRUD Application (DevOps Task)

A complete MEAN Stack CRUD Application deployed using Docker, Docker Compose, Nginx Reverse Proxy, and GitHub Actions CI/CD.
This project demonstrates full DevOps workflow implementation including containerization, orchestration, and automated deployment.

📌 Features

Full CRUD operations for Tutorials

Angular 15 frontend served using Nginx

Node.js + Express backend providing REST APIs

MongoDB database running in a Docker container

Docker Compose for multi-container orchestration

Nginx reverse proxy routing all traffic to Angular frontend & API

GitHub Actions CI/CD:

Build Docker images

Push to Docker Hub

SSH into VM & redeploy updated containers

🏛️ Architecture
                ┌────────────────────┐
                │     Angular UI     │
                │     (Nginx)        │
                └─────────┬──────────┘
                          │
                 Reverse Proxy (Nginx)
                          │
              ┌───────────┴───────────┐
              │       Backend API      │
              │    Node.js + Express   │
              └───────────┬───────────┘
                          │
                  MongoDB Database
                   (Dockerized)

📦 Tech Stack
Component	Technology
Frontend	Angular 15 + Nginx
Backend	Node.js 18 + Express.js
Database	MongoDB
Containerization	Docker + Docker Compose
Reverse Proxy	Nginx
CI/CD	GitHub Actions
Cloud VM	Ubuntu (AWS/Azure/GCP)
🛠️ Prerequisites

Ensure the following are installed:

Docker & Docker Compose

Node.js 18+ (only if running locally without Docker)

MongoDB (optional, for local non-Docker testing)

🔧 Local Development
1️⃣ Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2️⃣ Start application using Docker Compose
docker-compose up -d --build

3️⃣ Access the application

Frontend → http://localhost

Backend API → http://localhost/api

MongoDB → localhost:27017

🚀 Production Deployment
1️⃣ Create an Ubuntu VM (AWS / Azure / GCP)
2️⃣ Install Docker & Docker Compose

Run the provided script:

sudo bash setup-vm.sh

3️⃣ Configure GitHub Secrets
Secret Name	Description
DOCKERHUB_USERNAME	Docker Hub username
DOCKERHUB_TOKEN	Docker Hub access token
SSH_HOST	Public IP of VM
SSH_USER	SSH username
SSH_KEY	Base64 encoded private key
4️⃣ Push to main

This triggers CI/CD:

Build images

Push to Docker Hub

SSH into VM

Pull new images & redeploy

⚙️ CI/CD Workflow (GitHub Actions)

The workflow automatically:

✔ Builds backend & frontend Docker images
✔ Pushes them to Docker Hub
✔ Connects to VM via SSH
✔ Pulls latest images
✔ Restarts containers

You can find the workflow file at:

.github/workflows/deploy.yml

🌐 Reverse Proxy (Nginx)

All traffic is routed through port 80:

http://<your-vm-ip> → Angular UI
http://<your-vm-ip>/api → Express backend


Nginx config file is included in:

nginx/default.conf

🔗 Access Points
Component	URL
Frontend UI	http://your-vm-ip

Backend API	http://your-vm-ip/api

MongoDB	localhost:27017 (inside VM)
🖼️ Screenshots

(Add your captured images here)

✔ Application UI

Include:

Add Tutorial page

Tutorials List page

✔ Docker Images Pushed to Docker Hub

(Add screenshot)

✔ GitHub Actions CI/CD Pipeline

(Add screenshot)

✔ VM Running Containers

(Add screenshot of docker ps -a)

✔ Nginx Reverse Proxy Working

(Add screenshot)

🧩 Development Notes

To run Angular locally:

ng serve --port 8081


To modify frontend API calls, edit:

src/app/services/tutorial.service.ts

📚 Folder Structure
.
├── backend/                # Express API
├── frontend/               # Angular App
├── nginx/                  # Reverse proxy config
├── docker-compose.yml
├── setup-vm.sh
└── .github/workflows/      # CI/CD

🙌 Author

Ramesh
DevOps | Cloud | MEAN Stack
