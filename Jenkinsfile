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
                sh('sudo docker-compose up --build --detach') 
            }
        }
         stage('Tests sistema') {
            steps {
                echo('Test de sistema')
                def apiUrl = "http://localhost:88/item"
                def itemId = 1;
                sh("curl ${apiUrl}/${itemId}")
                sh("curl --request POST --header \"Content-type: application/json\" --data '{\"value\":\"a1\"}' ${apiUrl}/${itemId}")
                sh("curl ${apiUrl}/${itemId}")
                //TODO checkear las respuestas
               //TODO probar los mismo a traves del kong
            }
        }
    }
}