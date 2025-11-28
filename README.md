# MEAN Stack CRUD Application

A full-stack MEAN (MongoDB, Express.js, Angular, Node.js) application with Docker containerization and CI/CD pipeline.
In this DevOps task, you need to build and deploy a full-stack CRUD application using the MEAN stack (MongoDB, Express, Angular 15, and Node.js). The backend will be developed with Node.js and Express to provide REST APIs, connecting to a MongoDB database. The frontend will be an Angular application utilizing HTTPClient for communication.  
The application will manage a collection of tutorials, where each tutorial includes an ID, title, description, and published status. Users will be able to create, retrieve, update, and delete tutorials. Additionally, a search box will allow users to find tutorials by title.

## Project setup

## Architecture
- **Frontend**: Angular served by Nginx
- **Backend**: Node.js/Express.js API
- **Database**: MongoDB with Docker
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions

## Prerequisites
- Docker & Docker Compose
- Node.js 18+
- MongoDB (if running locally)

## Local Development
1. Clone the repository
2. Run `docker-compose up -d`
3. Access application at `http://localhost`

## Production Deployment
1. Set up Ubuntu VM
2. Run `setup-vm.sh`
3. Configure GitHub Secrets
4. Push to main branch to trigger deployment

## CI/CD Pipeline
The GitHub Actions workflow:
- Builds Docker images on push to main
- Pushes images to Docker Hub
- Deploys to VM via SSH
- Restarts containers automatically

## Access Points
- Frontend: http://your-vm-ip
- Backend API: http://your-vm-ip/api
- MongoDB: localhost:27017 (from VM)

## Screenshots
[Include screenshots of:]
- GitHub Actions workflow execution
- Docker Hub with pushed images
- Application UI working
- Docker containers running on VM
- Nginx configuration

Run `ng serve --port 8081`

You can modify the `src/app/services/tutorial.service.ts` file to adjust how the frontend interacts with the backend.

Navigate to `http://localhost:8081/`

