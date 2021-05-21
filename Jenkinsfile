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
                script {
                    def apiUrl = "http://172.18.69.88:88/item"
                    def itemId = env.BUILD_NUMBER;
                    def expectedValue = "m"+ itemId;
                    sh("curl --silent ${apiUrl}/${itemId}")
                    sh("curl --silent --request POST --header \"Content-type: application/json\" --data '{\"value\":\"${expectedValue}\"}' ${apiUrl}/${itemId}")
                    def value = sh(script: "curl --silent ${apiUrl}/${itemId} | jq -r '.value'", returnStdout: true).trim()
                    if (expectedValue != value) { error("Test de sistema, Api ${apiUrl} expected value ${expectedValue} but ${value}") } else { echo("Test de sistema, Ok") }
                    //TODO probar los mismo a traves del kong
                } 
            }
        }
    }
}