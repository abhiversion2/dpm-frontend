pipeline {
    agent any  // Runs on any available agent (your Amazon Linux EC2 agent with Docker installed)

    environment {
        APP_NAME      = 'dpm-frontend'
        CONTAINER_NAME = 'dpm-frontend-container'
        IMAGE_NAME    = 'dpm-frontend'
        PORT          = '80'          // Change if you want to expose on a different host port
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out develop branch from Bitbucket..."
                checkout scm  // Jenkins automatically uses the branch that triggered the build
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image using the provided Dockerfile..."
                script {
                    // Build the image with a tag including build number
                    sh """
                        docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                        docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo "Stopping and removing old container if it exists..."
                script {
                    // Stop and remove old container (ignore errors if it doesn't exist)
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    """
                }

                echo "Starting new container..."
                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${PORT}:80 \
                        --restart unless-stopped \
                        ${IMAGE_NAME}:${BUILD_NUMBER}
                """

                echo "Deployment completed successfully!"
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Checking if container is running..."
                sh """
                    docker ps | grep ${CONTAINER_NAME}
                    echo "Application should be accessible at http://<your-server-ip>:${PORT}"
                """
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline succeeded! React app deployed via Docker."
        }
        failure {
            echo "❌ Pipeline failed. Check logs for details."
        }
        always {
            // Optional: Clean up old unused images to save disk space
            sh 'docker image prune -f || true'
        }
    }
}