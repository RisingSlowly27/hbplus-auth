# HBPlus Domain Restricted Authentication App

A cross-platform authentication application built using **React Native (Expo + React Native for Web)** that allows users to log in using **Google OAuth** and restricts access to users belonging to a specific email domain.

Only users with emails ending in **@hbplus.fit** are allowed to access the dashboard.

---

## Tech Stack

- React Native (Expo)
- React Native for Web
- Google OAuth 2.0
- Expo Auth Session
- React Context API (State Management)
- Expo Router (Navigation)

---

## Features

- Google Sign-In authentication
- Email domain validation
- Access restriction for unauthorized domains
- Protected dashboard route
- Logout functionality
- Loading state during authentication
- Clean and responsive UI
- Cross-platform compatibility (Web + Mobile)

---

## Authentication Flow

1. User clicks **Login with Google**
2. Google OAuth authentication popup opens
3. User selects a Google account
4. App retrieves the **access token**
5. The token is used to fetch the user's Google profile
6. The app extracts the **email address**
7. Email domain is validated

### Access Logic

If user.email.endsWith("@hbplus.fit") ➡ User is redirected to **Dashboard**
Otherwise -> Access restricted. Please login using your official domain email.

---

## Domain Restriction Logic

Domain validation is implemented using a simple email suffix check.

Example:

```javascript
if (user.email.endsWith("@hbplus.fit")) {
  router.push("/dashboard");
} else {
  alert("Access restricted. Please login using your official domain email.");
}

Protected Routes

The Dashboard page is protected.

Users cannot directly navigate to:

/dashboard

without authentication.

If user === null, the application redirects to the Login page.

Project Structure
hbplus-auth
│
├── app
│   ├── index.tsx          # Login Page
│   ├── dashboard.tsx      # Protected Dashboard
│   └── _layout.tsx        # Navigation Layout
│
├── src
│   ├── context
│   │   └── AuthContext.js
│   │
│   └── utils
│       └── googleAuth.js
│
├── assets
├── package.json
└── README.md
Setup Instructions
1. Clone Repository
git clone https://github.com/yourusername/hbplus-auth.git
cd hbplus-auth
2. Install Dependencies
npm install
3. Start Development Server
npx expo start

Press:

w

to run the Web version.

Google OAuth Setup

Go to Google Cloud Console

Create an OAuth 2.0 Client ID

Enable Google Identity Services

Add the redirect URI:

http://localhost:8081

Copy the Client ID

Paste it in:

src/utils/googleAuth.js
Deployment

This application can be deployed on Netlify.

Build for web:

npx expo export:web

Deploy the generated dist folder to Netlify.

Future Improvements

Role-based access (Admin / User)

Firebase or Supabase integration

Persistent login using secure token storage

Improved UI/UX with design system

Author

Don Aloysius
GitHub: https://github.com/RisingSlowly27
```
