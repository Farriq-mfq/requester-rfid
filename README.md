# Cara Install

### Install Nodejs (root only)
- Install nvm (node version manager) di armbian linux
- letakan file ini di file manager armbian desktop cth : /Documents/requester
- ```bash
  nvm install 16.5
- ```bash
   nvm use 16.5
- ```bash
  node -v
- ```bash
  npm install pm2 -g
- ```bash
  pm2 save

### Install Firefox
- ```bash
  sudo apt install firefox

### Setup Timezone
- Buka armbian config 
  ```bash
  sudo armbian-config
- Masuk Personal > Timezone > pilih indonesia

### Setup autologin desktop
- buka terimnal ketik
  ```bash
  sudo su
  nano /etc/lightdm/lightdm.conf.d/11-armbian-conf

### Setup remote desktop protocol (RDP)
- Buka armbian config 
  ```bash
  sudo armbian-config
- Software > RDP > Enable
