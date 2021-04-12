pipeline {
    agent any 
    stages {
        stage('Checkout') {
            steps {
                sh('hostname')
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Cartucha/GTIO_LRD.git']]])
            }
        }
        stage('build') {
            steps {
               echo('build!') 
            }
        }
    }
}