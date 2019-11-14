pipeline {

  agent { docker { image 'node:lts' } }

  stages {

    stage('Build') {
      steps {
        sh 'rm -rf .npmrc dist node_modules'
        sh 'npm ci'
      }
    }

    stage('Analyze') {
      steps {
        withCredentials([string(credentialsId: 'sonarqube-analysis-token', variable: 'TOKEN')]) {
          sh 'npm run sonar -- -Dsonar.host.url=https://ia-tools-sonarqube.doit.wisc.edu/ -Dsonar.login="$TOKEN"'
        }
      }
    }

    stage('Publish PR Version') {
      when { changeRequest() }
      environment {
        PR_VERSION="PR-$env.CHANGE_ID"
      }
      steps {
        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'ia-tools-jenkins-myuw-s3'
        ]]) {
          sh 'ARTIFACT_VERSION="$PR_VERSION" node publish.js'
          sh 'ARTIFACT_VERSION="unstable" node publish.js'
        }
      }
    }

    stage('Publish Release Version') {
      when { branch 'master' }
      steps {
        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'ia-tools-jenkins-myuw-s3'
        ]]) {
          sh 'node publish.js'
          sh 'ARTIFACT_VERSION="latest" node publish.js'
        }
      }
    }

    stage('Tag Distributable') {
      when { branch 'master' }
      environment {
        VERSION=sh(script: '''node -p "require('./package.json').version"''', returnStdout: true).trim()
     }
      steps {
        sh 'git add dist --force'
        sh 'git commit -m "Tagging v$VERSION-dist for $VERSION"'
        sh 'git tag v$VERSION-dist'
        withCredentials([string(credentialsId: 'github-api-token', variable: 'TOKEN')]) {
          sh 'git push https://adi-ia-jenkins:$TOKEN@github.com/myuw-web-components/myuw-app-bar.git --tags'
          sh 'git checkout -B gh-pages'
          sh 'git push https://adi-ia-jenkins:$TOKEN@github.com/myuw-web-components/myuw-app-bar.git gh-pages --force'
        }
      }
    }

    stage('Publish to NPM') {
      when { branch 'master' }
      steps {
        sh '''echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc'''
        withCredentials([string(credentialsId: 'npm-token', variable: 'NPM_TOKEN')]) {
          sh 'npm publish'
        }
      }
    }

  }

}
