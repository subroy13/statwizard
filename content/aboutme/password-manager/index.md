---
title: "Pwdmgr"
date: "2022-11-20T00:00:00Z"
mytype: software
imageCaption: "Photo from Pngtree.com"    
summary: An open source python application for lightweight password management system through console.
tags:
  - Software Package

links:
    - name: Github Repository
      icon: fab fa-github
      link: "https://github.com/subroy13/pwdmgr"
      color: warning

---

# Pwdmgr: A lightweight console based password manager

## Why I felt like doing this?

I use tons of apps, and almost all of them requires you to sign up for an account. I provide my email address and the most common password that I can easily remember, but sometimes all those password validation rules take place, and that simple password is not accepted. So, I start modifying the password, retry with the modified password and repeat the steps as necessary. Finally, I store these passwords in a password-protected Excel sheet for future use, as the modified password with all uppercase, lowercase letters, number and symbols jumbled together, I cannot remember.

I need this Excel sheet to sync across my devices. So, I can convert it to Google sheets. But wow! Google sheets do not natively support password protection, I need to use 3rd party libraries to password-protect that sheet. This means, these 3rd party apps can read the unprotected sheet with all my sensitive information like passwords for different apps, my social apps password and may be even my bank account details. That sounds like a nightmare to you, and I cannot sleep with it.

## Features

Therefore, I decided to building a password storage system myself. I would like to have the following feature.

* Its code should be open source.
* No internet connection required, the entire application resides in your machine offline.
* Different user login, authentication system.
* The passwords will be encrypted on input using the master password provided by the user, and only encrypted data will be stored. So, even if the database is uploaded to cloud, synced across multiple devices, your password will be still protected by encryption. Also, even if an attacker probes into your machine, all he / she will see is encrypted sensitive info, and they cannot decrypt it without your master password.
* Lightweight, stores stuffs into simple CSV file or SQLite db.
* Your master password is stored using Scrypt and it irreversible, hence nobody except you knows the password.
* Sophisticated GUI would be nice, but not absolutely required.
* Adding some TOTP based authentication which can add MFA via Google Authenticator to user login process.

> **_NOTE:_** I am open to suggestions on how this password manager can be improved. Please check the GitHub repository [pwdmgr](https://github.com/subroy13/pwdmgr) and raise issues to offer insights and suggestions. 



