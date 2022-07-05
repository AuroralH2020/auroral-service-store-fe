# INSTRUCTIONS

## Requirements

### OS X
You should be all set. OS X has by default openssl installed.

### Windows 10
Install openssl. I recommend using the Git bash. It has openssl preinstalled. Git Bash is bundled with the Git installer: https://git-scm.com/

## Step 1: Generate a certificate

In case `localhost.crt` and `localhost.key` are not present in `/ssl` folder, execute `generate-certificate.sh` to create them.

## Step 2: Install the certificate

We have to make sure the browser trust our certificate, so we’re going to install it on our local machine.

### OS X

- Double click on the certificate (`localhost.crt`)
- Select your desired keychain (login should suffice)
- Add the certificate
- Open Keychain Access if it isn’t already open
- Select the keychain you chose earlier
- You should see the certificate localhost
- Double click on the certificate
- Expand Trust
- Select the option Always Trust in When using this certificate
- Close the certificate window

The certificate is now installed.

### Windows 10

- Double click on the certificate (`localhost.crt`)
- Click on the button “Install Certificate...”
- Select whether you want to store it on user level or on machine level
- Click “Next”
- Select “Place all certificates in the following store”
- Click “Browse”
- Select “Trusted Root Certification Authorities”
- Click “Ok”
- Click “Next”
- Click “Finish”
- If you get a prompt, click “Yes”

The certificate is now installed.

### Step 3: Serve app through HTTPS

Run

```
ng serve -o --ssl true --ssl-cert ./ssl/localhost.crt --ssl-key ./ssl/localhost.key
```

The command above is defined in `package.json` for `npm start` script.
