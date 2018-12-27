pipeline {
    agent {
        docker {
            image 'node:8.9.4'
            args '--user root:root'
        }
    }
    stages {
        stage('test') {
            steps {
                sh 'npm install'
                sh 'npm run test:jenkins'
            }
        }
    }
}
