# Quickstart: Deploy Thumbsup gallery to Github Page with Azure DevOps

Thumbsup is a static gallery generator which can turn any folder with photos & videos into a web gallery. Get started with Azure DevOps by using Thumbsup to create a gallery that can be stored in Github Page. Completing this quickstart incurs no costs in your Azure account.

## Prerequisites

- Git command-line tools:
    - [Install Git for Windows](/), which includes Git Credential Manager - Windows
    - [Install Git for macOS and Linux](/).
        - For macOS and Linux, we recommend configuring SSH authentication
- An organization in Azure DevOps. If you don't have one, you can [sign up for one for free(/). Each organization includes free, unlimited private Git repositories.
- A Project in Azure DevOps. Please refer to [Create a project - Azure DevOps](/).
- A Repo in Azure DevOps. Please refer to [Create a new Git repo in your project - Azure Repos](/).
- A GitHub account, where you can create a repository. 
- A public&private SSH key.
    - [Checked for existing SSH keys](https://docs.github.com/en/enterprise/2.15/user/articles/checking-for-existing-ssh-keys)
    - [Generated a new SSH key and added it to the ssh-agent](https://docs.github.com/en/enterprise/2.15/user/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## Create your gallery locally

Open your Git Bash/Linux Shell or “Terminal”, run the following commands,

```
mkdir -p mygallery/media
```
Put your favorite photos and videos in to /media folder, You can have nested folders. Using the default configuration, each folder will become an album.

For example:

```
mygallery
  |__ media
      |__ day 1
      |   |__ img001.jpg
      |   |__ vid001.mp4
      |__ day 2
          |__ img003.jpg
          |__ vid001.mp4
```
## Sign in to Azure DevOps

Sign in to the [Azure DevOps](url).

## Upload your gallery to Devops Repo

1. In your project, navigate to the **Repos** page.
2. find **Push an existing repository from command line**
3. Open your Git Bash/Linux Shell or “Terminal”, run the following commands,

```
cd mygallery;
git init;
git remote add origin https://{username}@dev.azure.com/{organization}/{project}/_git/{repo};
git push -u origin --all;
```
## Setup your Build Pipeline

1. In your project, navigate to the **Pipelines** page. Then choose the action to create a new pipeline.
2. Click **Use the classic editor** to create a pipeline without YAML.
3. Walk through the steps of the wizard by first selecting **Azure Repo** as the location of your source code.
4. Start with an **Empty Job**.

## Customize your Build Pipeline

1. Under Agent Job 1 add a new step, search for & add **Docker CLI installer**. 

![Docker CLI installer](https://ftp.bmp.ovh/imgs/2020/09/b36561ae9a132cd9.png)

2. Under Agent Job 1 add a new step, search for & add **Install SSH key**. Input your Known Hosts, SSH Public Key.

![Install SSH key](https://ftp.bmp.ovh/imgs/2020/09/dddc3d42bcf41fb3.png)

3. Under Agent Job 1 add a new step, search for & add **Command line**.

![Install Thumbsup](https://ftp.bmp.ovh/imgs/2020/09/b36561ae9a132cd9.png)

Under Display name add in Install Thumbsup and then under script add
 
```
docker run -t              \
  -v "$(pwd):/work"        \
  -u $(id -u):$(id -g)     \
  thumbsupgallery/thumbsup \
  thumbsup --input /mygallery/media --output /mygallery/gallery --theme cards --title " 相册" --footer "© 2020 My Gallery"
```
1. Under Agent Job 1 add a new step, search for & add **Command line**.
Under Display name add Deploy to Github and then under script add
![Deploy to Github](https://ftp.bmp.ovh/imgs/2020/09/a906f012b5bbfcea.png) 
```
    ssh-keyscan -t rsa e.coding.net >> ~/.ssh/known_hosts
    git remote add github git@example.git
    git config --global user.name "username"
    git config --global user.email "email"
    cp -R mygallery/gallery/* .
    rm -rf mygallery
    git add .
    git commit -m 'Update docs'
    git checkout -b gh-pages
    git push coding gh-pages --force
```

## Upload public&private key.
In order to push your book codes from proxy image into Github, you need upload a private key to Azure Devops and the public key to Github.
1. In your project, navigate to the **Library** page, find the secret files and upload the private key. Click the private key to authorize the task. 
![](https://s2.ax1x.com/2020/01/20/1iNGL9.png)
2. For Upload the public key, Please refer to [Adding a new SSH key to your GitHub account](https://docs.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account).

## Check if the deployment is successful
Now you can create a new article below mybook folder and then push to the Devops Repo to see if successfully deployed.
![](https://s2.ax1x.com/2020/01/20/1iNYZR.png)

