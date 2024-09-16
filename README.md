#Capstone Project

HOMEMADE API

For my project, I decided to build a custom API using Node.js, Express, and PostgreSQL. Instead of scraping data from the web or using external CSV files, I opted to create the data myself by allowing users to interact with the API. This approach is ideal for managing dynamic data, such as user registrations, service bookings, and service offerings. To test the API, I’ve been using dummy data like fake usernames and emails, which ensures the system functions correctly.


SCHEMA DESIGN

To structure the database, I focused on three core tables: Users, Services, and Bookings. These tables are connected using foreign keys and follow a one-to-many relationship.


1. Users Table:
-Fields: id, username, email, password, role.
-Purpose: This table stores user information, including credentials and roles (e.g., homeowner, cleaner, or admin). Each user is uniquely identified by their id, and I made sure both username and email are unique and not null to prevent duplicates.

2. Services Table:
-Fields: id, name, description, price.
-Purpose: This table holds the different types of services offered, such as deep cleaning, pressure washing, etc. I made sure the name field is required, and I can optionally include a description and price.

3. Bookings Table:
-Fields: id, userId, serviceId, date, status.
-Purpose: This table tracks bookings, associating users with services. The userId and serviceId fields are foreign keys pointing to the Users and Services tables, ensuring referential integrity.

PRIMARY AND FOREIGN KEYS

In my schema:


- Primary Keys: Each table (Users, Services, Bookings) has a primary key (id) to uniquely identify records.
- Foreign Keys: The Bookings table uses userId and serviceId as foreign keys to connect a booking to a specific user and service. This ensures that each booking is tied to a real user and a valid service.
  
RELATIONSHIPS AND CROW'S FOOT NOTATION

When designing the schema, I used one-to-many relationships:
- A User can have many Bookings (1-to-many).
- A Service can be booked many times, so it also has a 1-to-many relationship with Bookings.

If I were to draw this in Crow’s Foot notation, I’d show a single User entity relating to multiple Bookings, and similarly, a single Service entity would relate to multiple Bookings.

CONSTRAINTS

To ensure data integrity, I implemented several constraints:


- Unique Constraints: I made sure the username and email fields in the Users table are unique.
- Foreign Key Constraints: The Bookings table has foreign keys (userId and serviceId) that reference the Users and Services tables.
- Not Null Constraints: Critical fields like username, email, password, and date are required, ensuring that no essential data is missing.

COLLECTING DATA

For now, I’ve been collecting data directly through the API. Users can register by providing a username, email, and password. They can also make bookings for various services. I entered some dummy data (e.g., usernames like “AlexSmith” and emails like “alex.smith@example.com”) to test the API’s functionality, and it’s working as expected.

USER INPUT AND TESTING

To begin with, I created dummy users and services to test the relationships between these tables. For example, I registered a user and then created a booking for them, linking the userId in the Bookings table to the appropriate user. This helped ensure the foreign key constraints and relationships were working properly.

TECHNOLOGY STACK

For the tech stack, I’m using:
- Node.js with Express: For handling routes and API requests.
- Sequelize: To manage database queries and relationships with PostgreSQL.
- PostgreSQL: For the relational database, which stores users, services, and bookings.
- JWT Authentication: For securing routes like user login and sensitive data access.

WORKFLOW EXAMPLE

Here’s how the data flows through the API:

1. User Registration: A user signs up through the /register route, and their information is stored in the Users table.
2. Service Creation: I added various services to the Services table through the API, so users can select these services for bookings.
3. Bookings: A user can book a service, which creates a record in the Bookings table, associating the user and service.
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> cf4dfac (Add final geauxclean project, ignoring node_modules)
