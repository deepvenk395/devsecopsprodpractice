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
                dependencyCheck(
                    additionalArguments: '--scan .',
                    odcInstallation: 'Dependency-Check')
            }
    
        }
        stage('Publish Dependency Report') {
            steps {
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    }
}
    }
}