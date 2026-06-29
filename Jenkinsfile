pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                echo "Repository checked out successfully!"
                sh 'pwd'
                sh 'ls -la'
            }
        }
        stage('install dependency') {
            steps {
                echo "Installing dependencies..."
                sh 'npm install'
            }
        }
        stage("OWASP Dependency Check") {
            steps {
                echo "Running npm audit..."
                sh '''
                    npm audit --json > npm-audit-report.json || true
                '''
            }
    
        }
        stage('Publish Dependency Report') {
            steps {
                archiveArtifacts artifacts: 'npm-audit-report.json', fingerprint: true
            }
        }
    }
}