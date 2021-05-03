pipeline {
    agent any
   // environment {
   //     ROOT_CREDENTIALS = credentials('rootCredentials') no es necesario
   // } 
    stages {
        stage('Checkout') {
            steps {
                sh('hostname')
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Cartucha/GTIO_LRD.git']]])
            }
        }
        stage('build') {
            steps {
                echo('TODO linter .js')
            }
        }
        stage('compose') {
            steps {
                sh('docker-compose up --build --detach') 
            }
        }
         stage('Tests sistema') {
            steps {
                echo('TODO test de sistema')
               //TODO Probar sin proxy inverso Load,save,Load
               //sh('wget http://localhost:80/item/1' + key)
               //TODO probar los mismo a traves del kong
            }
        }
    }
}