## Using Azure DevOps to deploy Gitbook 

After setting up the Gitbook locally, if you need to publish the written book to your Github Page, you need to manually push the _book folder separately to Github. If each modification of book, first you need to do run `gitbook buildand` then use git to push the rebuilt _book folder into github repo. The whole process is quite tedious. Using Azure Devops can automate this process and deploy Gitbook to Github Page.

### Prerequisites

Before automating this process, be sure a few things are already in place:

- Intalling the gitbook locally. Please refer to [Publish your GitBook on GitHub Page](/). It is recommended that you check the official gitbook documentation, which provides instructions on how to use gitbook.

- Your site committed to an Azure DevOps. Please refer to [Azure Repos Documentation](https://docs.microsoft.com/en-us/azure/devops/repos/?view=azure-devops).

- An GitHub repository provisioned and Github Page enabled. It is recommended that you check the official [GitHub Pages](https://help.github.com/en/github/working-with-github-pages) documentation.

### Setup your Build Pipeline

1. Sign in to your Azure DevOps organization and navigate to your project.

2. In your project, navigate to the **Pipelines** page. Then choose the action to create a new pipeline.

3. Walk through the steps of the wizard by first clicking **Use the classic editor** and selecting **Azure Repos Git** as the location of your source code.

4. You might be redirected to **Select a template**. If **apply Configuration as code**, enter your **YAML file path** as azure-pipelines.yml. You now have a working YAML pipeline (azure-pipelines.yml) in your repository that's ready for you to customize!

5. When you're ready to make changes to your pipeline, select it in the Pipelines page, and then Edit the azure-pipelines.yml file.

### Customize your Build Pipeline

The steps to create a pipeline are simple, but it is more difficult to write your customized azure-pipelines.yml file. This involves the logical steps of the deployment of the environment. The example below is the Pipeline I created for gitbook. The comment section explains the deployment logic.

```
# Use the master branch as a trigger
 trigger: 
-master

# Create proxy image for installation environment
 pool: 
  vmImage: 'Ubuntu-16.04' 

# Environment（Node.js，SSHKey）
steps:
- task: NodeTool@0 
  inputs:
    versionSpec: '10.x'
  displayName: 'Installing Node.js...'

- task: InstallSSHKey@0
  inputs:
    hostName: 
    sshPublicKey: 
    sshKeySecureFile: id_rsa 
  displayName: 'Installing SSH...'

# install gitbook
- script: |
    npm install gitbook-cli -g;
    gitbook build
  displayName: 'Installing dependencies...'

# Create a script to push the static files on the agent to the Github Page
 -script: 
    git remote add upstream git@github.com: chenhao2020 / pub-book.git; 
    cp -R _book / *.; 
    Rm -rf node_modules; username 
    rm -rf _book; 
    rm -rf azure-pipelines.yml; 
    git config --global user.name "username" ; 
    git config --global user.email "email" ; 
    git checkout -b gh-pages; 
    git add ; 
    git commit -m 'Update docs' ; 
    git push upstream gh-pages --force 
  displayName: 'Deploying ...'

# Code security test
 -task: WhiteSource Bolt @ 20 
  displayName: 'Run WhiteSource Bolt'

  ```

### Upload private key

In the left library, find the secret files and upload the private key. Click the private key to authorize the task. 

![](https://s2.ax1x.com/2020/01/20/1iNGL9.png)

### Check if the deployment is successful

Now you create a new article locally and git push to the devops repo to see if it is successfully deployed.

![](https://s2.ax1x.com/2020/01/20/1iNYZR.png)