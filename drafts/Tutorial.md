# Tutorial: Deploy Gitbook with Azure DevOps

After setting up the Gitbook locally, if you need to publish your book to Github Page, you have to manually use command to push the _book folder separately to Github Repo. The whole process is quite tedious. Using Azure Devops can automate this process.

In this tutorial, you learn how to:

* Build your Gitbook locally
* Upload your book to Devops Repo
* Setup your Build Pipeline
* Customize your Build Pipeline

If you don’t have an Azure DevOps subscription, create a [free account](url).

## Prerequisites

Before automating this process,be sure a few things are already in place:

* Nodejs.

* Git command-line tools:
  * Install Git for Windows, which includes Git Credential Manager - Windows
  * Install Git for macOS and Linux.
    * For macOS and Linux, we recommend configuring SSH authentication

* An organization in Azure DevOps. If you don't have one, you can sign up for one for free.

* A Project in Azure DevOps. Please refer to [Create a project - Azure DevOps](/).

* A Repo in Azure DevOps. Please refer to [Create a new Git repo in your project - Azure Repos](/).Each organization includes free, unlimited private Git repositories.

* A GitHub account, where you can create a repository.

* A public&private SSH key.
  * [Checked for existing SSH keys](https://docs.github.com/en/enterprise/2.15/user/articles/checking-for-existing-ssh-keys)
  * [Generated a new SSH key and added it to the ssh-agent](https://docs.github.com/en/enterprise/2.15/user/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## Sign in to Azure DevOps

Sign in to the [Azure DevOps](url).

## Build your Gitbook locally

Open your Git Bash/Linux Shell or “Terminal”, run the following commands,

```bash
mkdir -p mybook;
cd mybook;
npm install -g gitbook-cli;
gitbook init;
```

After the installation finished, you will see two files below *mybook* folder,

```bash
$ ll -a
total 19
drwxr-xr-x 1 user 197609    0 Aug 21 14:05 ./
drwxr-xr-x 1 user 197609    0 Sep  2 16:49 ../
-rw-r--r-- 1 user 197609   16 Aug 21 13:28 README.md
-rw-r--r-- 1 user 197609   40 Aug 21 13:28 SUMMARY.md
```

## Upload your book to Devops Repo

1. In your Azure DevOps, navigate to the **Repos** page.
2. find **Push an existing repository from command line**
3. Open your Git Bash/Linux Shell or “Terminal”, run the following commands,

```bash
cd mybook;
git init;
git remote add origin https://{username}@dev.azure.com/{organization}/{project}/_git/{repo};
git push -u origin --all;
```

## Setup your Build Pipeline

1. In your Azure DevOps, navigate to the **Pipelines** page. Then choose the action to create a new pipeline.
2. Walk through the steps of the wizard by first clicking **Use the classic editor** and selecting **Azure Repos Git** as the location of your source code.
3. You might be redirected to **Select a template**. If **apply Configuration as code**, enter your **YAML file path** as azure-pipelines.yml. You now have a working YAML pipeline (azure-pipelines.yml) in your repository that's ready for you to customize!
4. When you're ready to make changes to your pipeline, select it in the Pipelines page, and then edit the **azure-pipelines.yml** file.

## Customize your Build Pipeline

In order to deploy Gitbook to Github Page, you need to write your customized azure-pipelines.yml file to automate this process. The example is as below,

```yml
# Use the master branch as a trigger
 trigger:
-master
# Create proxy image for installation environment
 pool:
  vmImage: 'Ubuntu-16.04'
# Environment（Node.js, SSHKey）
steps:
- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Installing Node.js...'
- task: InstallSSHKey@0
  inputs:
    hostName:
    sshPublicKey:
    sshKeySecureFile: id_rsa
  displayName: 'Installing SSH...'
# install gitbook
- script: |
    npm install gitbook-cli -g;
    gitbook build
  displayName: 'Installing dependencies...'
# Create a script to push the static files on the agent to the Github Page
 -script:
    git remote add upstream git@github.com: reponame / pub-book.git;
    cp -R _book / *.;
    Rm -rf node_modules; username
    rm -rf _book;
    rm -rf azure-pipelines.yml;
    git config --global user.name "username" ;
    git config --global user.email "email" ;
    git checkout -b gh-pages;
    git add ;
    git commit -m 'Update docs' ;
    git push upstream gh-pages --force
  displayName: 'Deploying ...'
# Code security test
 -task: WhiteSource Bolt @ 20
  displayName: 'Run WhiteSource Bolt'
```

## Upload Public&Private key.

In order to push your book codes from Azure DevOps proxy image into Github, you need upload a private key to Azure Devops and the public key to Github.

1. In your project, navigate to the **Library** page, find the secret files and upload the private key. Click the private key to authorize the task. 

![](https://s2.ax1x.com/2020/01/20/1iNGL9.png)

2. For Upload the public key, Please refer to [Adding a new SSH key to your GitHub account](https://docs.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account).

## Check if the deployment is successful

Now you can create a new article below mybook folder and then push to the Devops Repo to see if successfully deployed.
![](https://s2.ax1x.com/2020/01/20/1iNYZR.png)

