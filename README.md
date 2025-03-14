# G-Lingua

G-Lingua is a web-based interactive learning application that allows users to study English materials online through various features, including user authentication, progress tracking, and interactive content. **Link**: https://g-lingua.vercel.app/

## Features

- **User Authentication**
  - Users can register and log in using their email and password.
  - Authentication system based on JSON Web Tokens (JWT).
- **Progress Tracking**
  - Tracks user learning progress in the database, enabling users to resume anytime.
- **Interactive Content**
  - Interactive learning materials with features such as:
    - Arrange the Words
    - Listen to the Audio
    - Match the Words
- **Sidebar Navigation**
  - A sidebar to help users navigate through the application's features.
- **Dashboard Page**
  - Displays a list of lessons based on the user's progress.

## Technologies Used

### Frontend
- HTML, CSS, JavaScript
- Frameworks and Libraries:
  - Font Awesome for icons
  - Google Fonts (Poppins)
- **Hosting**: Static web hosting (Netlify or GitHub Pages)

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** as the database
- Libraries:
  - `bcryptjs` for password hashing
  - `jsonwebtoken` for JWT-based authentication
  - `dotenv` for managing environment variables
  - `cors` for enabling communication between frontend and backend
- **Hosting**: Cloud services (Render or Railway)


## How to Run the Project

### 1. **Preparation**
- Ensure that Node.js is installed on your system.
- Configure MongoDB Atlas with a URI for the database connection.

### 2. **Backend Setup**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file inside the backend folder with the following content:
   ```bash
   MONGO_URI=<MongoDB_Atlas_Connection_String>
   JWT_SECRET=<Your_Secret_Key>
   PORT=5000
4. Start the backend server:
   ```bash
   node api/index.js

### 3. **Frontend Setup**
Open the vercel link

### 4. **Mobile APK**
Download here to use the mobile version of G-Lingua! https://github.com/spacetimist/glingua-mobile.git 
