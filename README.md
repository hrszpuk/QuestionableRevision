# Questionable Revision

## Firebase

### Install firebase
``` 
npm install -g firebase-tools
```

### Log in
1. Create an account on the firebase website (Google account)
2. Join the project that Remy has set up
3. Login via the command line
``` 
firebase login
```

### Deploying locally 
You can deploy a version of the web app on your computer. This is useful for testing.
1. Make sure Java is installed
2. Deploy via the command line
``` 
firebase emulators:start
```
There is also a way to monitor functions and other firebase related stuff.

### Deploying to production

#### Deploying through GitHub
1. Create a pull request and merge your content into `dev`. 
2. Then create a pull request and merge your content into `main`.
3. A GitHub Action will run and automatically deploy to production

#### Deploying manually
``` 
firebase deploy --only hosting 
```
The `--only hosting` part only deploys the content in the `public` folder. 
You can deploy the entire app by excluding it.