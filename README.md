# Calendarapp

This is a webapp that is currently under progress, where the user will be able to follow their favourite football leagues. The webapp is built with React Vite, Node, MongoDB and Tailwind. Log in feature is made with the Clerk library and the football leagues are fetched with TheSportsDB. The purpose of this webapp was to improve my React knowledge and try new libraries.

-------------------

# Setup

# 1. Clone the Repository
Start by cloning the project repository to your local machine. Then install dependencies.


>cd client

>npm install

>npm install @clerk/clerk-react

>npm install -D tailwindcss postcss autoprefixer

>npx tailwindcss init

For the server (Express):

>cd ../server

>npm install

# 2. Set Up Tailwind CSS
In the client directory, set up Tailwind CSS by editing the tailwind.config.js file to specify the content paths:


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Then, update your src/index.css or main CSS file to include the Tailwind directives:


@tailwind base;

@tailwind components;

@tailwind utilities;

# 3. Set Up Environment Variables

In both the client and server, create a .env file to store environment variables.

For the server, create .env in the root of the server directory:

>DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

>API=<your-thesportsdb-api-key>

>PORT=3001

For the client, create .env in the root of the client directory for Clerk:

>VITE_CLERK_FRONTEND_API=<your-clerk-frontend-api>

>CLERK_API_KEY=<your-clerk-api-key>

Replace the placeholders with your MongoDB URI, TheSportsDB API key, and Clerk API keys. You can obtain the Clerk API keys from the Clerk Dashboard.

# 4. Set Up Clerk for Authentication
In the client directory, set up Clerk for authentication.

Edit your main.jsx or App.jsx (or wherever you initialize your app) to include Clerk:

import { ClerkProvider } from '@clerk/clerk-react';

import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';

const frontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider frontendApi={frontendApi}>
    <App />
  </ClerkProvider>
);

Now, you can integrate Clerk's components (e.g., SignIn, SignUp, UserButton) for authentication where needed.

# 5. Set Up MongoDB
Ensure you have MongoDB running locally or use a service like MongoDB Atlas. Update your .env file with the connection URI.

# 6. Run the Express Server
Inside the server directory, run:

>npm start

This will start the Express server on port 3001 (or the port you specified in the .env file).

# 7. Run the Vite Frontend
To run the Vite frontend, navigate back to the client directory:

>cd ../client

>npm run dev

This will start the Vite development server, and you can access the app at http://localhost:3000.

------------------------------


# Screenshots

![Screenshot from 2024-09-11 16-13-30](https://github.com/user-attachments/assets/65cd1612-2fbf-4547-a52c-59a361c0ce7e)

![Screenshot from 2024-09-11 16-14-17](https://github.com/user-attachments/assets/b89a66bc-9ac7-4431-b01b-84163511598c)

![Screenshot from 2024-09-11 16-15-04](https://github.com/user-attachments/assets/9535fc27-16eb-45d0-8e29-0a892ac213e8)
