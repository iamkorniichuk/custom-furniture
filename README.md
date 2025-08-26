## Project Setup

### Firebase connection

Follow the steps below to connect the project to your Firebase app.

#### 1. Install Firebase CLI.
Make sure you have the Firebase CLI installed globally:
```bash
npm install -g firebase-tools
```

#### 2. Login to Firebase
Authenticate your local machine with your Firebase account:
```bash
firebase login
```

This step is required once per machine. It allows the Firebase CLI to access your projects.

#### 3. Create `.firebaserc` file in the root folder.
This file tells the Firebase CLI which project to use.

Your project id you can find under `Project ID` in `Firebase Console -> <Your Project> -> Project settings`

[Example of the file](/example.firebaserc)

#### 4. Create `environment.ts` file inside `/src/environments/` folder.
This file stores your Firebase app configuration.

You can find the full configuration in your `Project settings -> Your apps (Web)`

[Example of the file](/example.environment.ts)
