pipeline {
  agent { 
    docker { 
      // image 'mcr.microsoft.com/playwright:v1.27.0-focal'
      image 'mcr.microsoft.com/playwright'
      label 'AWS_Linux_PrimeUI'
    } 
    // label 'AWS_Linux_PrimeUI'
  }
  stages {
    stage('Install Playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npx playwright install
        '''
      }
    }
    stage('Run Tests') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test
          npx test-results-reporter publish -c teams.config.json
        '''
      }
      post {
        success {
            echo 'Test Finished'
          //archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          //sh 'rm -rf *.png'
        }
      }
    }
  }
}