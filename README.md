# NotesApp

NotesApp is a full-stack MERN stack application using ReactJS, Redux, Node.js, MongoDB, and Express for creating, managing, and organizing personal notes. It features user authentication, a clean dashboard interface, and intuitive note management capabilities.

## Features

- **User Authentication**: Secure login and sign-up system
- **Dashboard**: 
  - Navigation bar with app name, search functionality, and user profile
  - Note display area
  - Add note button (bottom right)
- **Note Management**:
  - Create notes with title, content, and tags
  - Update and delete existing notes
  - Pin important notes
- **Responsive Design**: Optimized for various screen sizes

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

### Backend
    MONGODB_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_backend_api_url

### Frontend
    VITE_BASE_URL=your_backend_api_url


## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT) for authentication
- Cors for cross-origin resource sharing
- Dotenv for environment variable management
- Bcrypt for password hashing

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Moment.js for date formatting
- React Icons for UI icons
- React Modal for pop-up forms

### Database
- MongoDB

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB



## Installation

1. Clone the repository:
```bash
git clone https://github.com/Amey1004/Notes-App.git cd notes-app
```
2. Install backend dependencies:
```bash
cd backend npm install
```
3. Install frontend dependencies:
```bash
cd ../frontend npm install
```

4. Set up environment variables:
- Create a `.env` file in the backend directory
- Add necessary environment variables (e.g., MongoDB URI, JWT secret)

## Usage

1. Start the backend server:
```bash
cd backend npm start
```
2. In a new terminal, start the frontend development server:
```bash
cd frontend npm run dev
```
3. Open your browser and navigate to `http://localhost:1000` (or the port specified by your React app)


#### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.