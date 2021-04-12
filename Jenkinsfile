pipeline {
    agent any
     environment {
        ROOT_CREDENTIALS = credentials('rootCredentials')
    } 
    stages {
        stage('Checkout') {
            steps {
                sh('hostname')
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Cartucha/GTIO_LRD.git']]])
            }
        }
        stage('build') {
            steps {
                echo('TODO compile .js!')
            }
        }
        stage('compose') {
            steps {
                sh('sudo su ')
                echo('credenciales ' + ROOT_CREDENTIALS_USR)
                echo('' + ROOT_CREDENTIALS_PSW)
               echo('sudo docker-compose up --build') 
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