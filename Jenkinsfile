pipeline {
    agent { docker { image 'node:8.9.4' } }
    stages {
        stage('test') {
            steps {
                sh 'npm install'
                sh 'npm run test:jenkins'
            }
        }
    }
}
