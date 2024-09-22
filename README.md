PROJECT OVERVIEW
GeauxClean is a web-based application designed to help users easily find and book cleaning services. The platform offers various cleaning options, including deep cleaning, regular cleaning, vacuuming, and pressure washing. Users can sign up, log in, and manage their bookings via their profiles, while receiving email and SMS notifications after scheduling services.

FEATURES
User Authentication: Sign up, log in, and log out using email and password.
Profile Management: Each user has a profile displaying their name and booking history.
Service Booking: Users can schedule a cleaning service and receive notifications.
Responsive Design: The app is fully responsive, offering a smooth experience across devices.
Notifications: Sends confirmation emails (via SendGrid) and SMS notifications (via Twilio) after booking.

TOOLS AND TECH

Frontend:
React.js for building the user interface.
Custom CSS along with Bootstrap for styling and layout.
State management via lifting state up.

Backend:
Node.js and Express.js for server-side logic.
PostgreSQL for the database.
RESTful API for managing users, services, and bookings.

Additional Libraries:
JWT for user authentication.
SendGrid for sending email notifications.
Twilio for sending SMS notifications.

Deployment:
Hosted using [Netlify].

API DOCUMENTATION
The backend API provides the following routes:

User Authentication:
POST /register: Register a new user.
POST /login: Log in with email and password.

Bookings:
GET /bookings: Fetch all bookings for a logged-in user.
POST /bookings: Schedule a new booking.

SETUP AND INSTALLATION

Clone the repository:
bash
git clone https://github.com/your-username/capstone.git

Install dependencies for both frontend and backend:

bash
cd frontend
npm install
cd ../backend
npm install

Create a .env file in the backend/ directory and add your environment variables:
bash
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
SENDGRID_API_KEY=your-sendgrid-api-key
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

Start the development servers:
For the frontend:
bash
cd frontend
npm start

For the backend:
bash
cd backend
npm start

How to Use
Navigate to the home page and sign up or log in.
Once logged in, you can book a cleaning service.
You’ll receive a confirmation email and SMS notification.

Future Improvements
Implement Google and Facebook authentication.
Add more cleaning service options.
Implement rating and feedback for cleaning services.
Expand payment options with Stripe and PayPal integration.

Author
Name: Denzel Johnson
Email: metazell@gmail.com
LinkedIn: https://www.linkedin.com/in/denzel-johnson-06280545/
GitHub: https://github.com/metazell
