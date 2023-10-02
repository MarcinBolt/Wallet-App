# Wallet App by Hi5 Team <img src="./imgReadme/hi5-logo.png" width="44" height="44"/>



> Wallet App is a web-based application that allows users to manage their finances, monitor transactions and track account balances. The app is designed for personal use and provides tools for tracking income and expenses.


## Table of Contents
* [General Info](#general-information)
* [Site](#site)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Project Status](#project-status)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

---
# Site 
## Version for Mobile/Tablet/Desktop
#
## Mobile
### Login and Register Page 
![register-mobile](./imgReadme/login-register-mobile.jpg)
### Balance Page

### Currency Page

### Add Transaction Page 

### Edit Transaction Page 

### Statistics
![statistic-mbile](./imgReadme/statistic-mobile.jpg)

---

### User Panel

---

### Logout Page

---

## Tablet
### Login and Register Page 
![login-registration-tablet](./imgReadme/login-registration-tablet.jpg)

---

### Balance Page

---

### Currency Page

---

### Add Transaction Page 
![addTransaction-tablet-desktop](./imgReadme/addtransaction-tablet-desktop%20.jpg)

---

### Edit Transaction Page Income / Expense
![editTransaction-tablet-desktop](./imgReadme/editTransaction-tablet-desktop.jpg)

---

### Statistics
![statstic-tablet](./imgReadme/statistick-tablet.jpg)

---

### User Panel

---

### Logout Page


---

## Desktop

---

### Register Page 
![register-desktop](./imgReadme/register-desktop.jpg)
---

### Login Page
![login-desktop](./imgReadme/login-desktop.jpg)
---

### Balance Page

---

### Currency Page

---

### Add Transaction Page 
![addTransaction-tablet-desktop](./imgReadme/addtransaction-tablet-desktop%20.jpg)

---

### Edit Transaction Page 
![editTransaction-tablet-desktop](./imgReadme//edittransaction-tablet-desktop.jpg)

---

### Statistics

---

### User Panel

---

### Logout Page

---

## General Information
- The Wallet application created is the final task to take advantage of all the areas faced during the full year of fullstack learning

---

## Technologies Used
Frontend (client side):
- React.js: JavaScript framework for building the user interface.
- Redux: Library for managing the state of the application.
- React Router: For navigating between different views of the application.
- Formik and Yup: For handling forms and validation.
- Material-UI: For building user interfaces and components.
- Chart.js and react-chartjs-2: For charts and data visualisation.
- React-Loader-Spinner: For displaying the loading indicator (spinner).
- Axios: For making HTTP requests to the server.
- react-password-strength-bar: Library for password strength indication.
- Datetime: Library for date and time input.


Backend (server side):
- Node.js: The runtime environment for the server.
- Express.js: Framework for creating an HTTP server.
- MongoDB: NoSQL database, perhaps using mongoose as the database interaction tool.
- JWT (JSON Web Tokens): For user authentication.
- Swagger UI: For generating API endpoint documentation.
![API endpoints](./imgReadme/swagger-api-endpoints-user.png)
![API endpoints](./imgReadme/swagger-api-endpoints-transaction.png)
![API endpoints](./imgReadme/swagger-api-schema.png)

---

Other:
- CSS: For user interface styling.
- Redux-Persist: For storing the state of the application, including the token in localStorage.
- React-Media: For adapting the interface to different screen resolutions.
- React-Toastify: For displaying error notifications and other messages to the user.
- LocalStorage: For storing certain data on the client side, such as tokens.
- Squoosh: For image optimization and compression.
- IcoMoon.io: For creating and managing custom icon fonts.

---

## Features
List the ready features here:
- Registration and Login:
- The application handles the registration and login process for users. It uses the Formik and Yup (or Indicative) library to validate form fields, including checking the validity of email address and password length.
- Session Management: After a successful user login, the user's token and credentials are stored in the Redux Store, and the session.isAuth flag is set to true. In case of a login error, the error is stored in the session state and displayed to the user.
- Routing Protection: Higher-Order Components (HOCs) such as withAuthRedirect are used, which control access to specific sites based on the user's authentication status. In this way, routing protection is provided.
- Data Retrieval: The application retrieves transaction and balance status data. These operations are performed when the DashboardPage component is loaded and are asynchronous.
- Displaying Data on Charts: The Chart component uses the react-chartjs-2 library to display data on charts. This data is likely to come from the user's transactions and can be presented as charts.
- Adding Transactions: The app allows you to add new transactions using a form that appears when you click the "Add Transaction" button. Values such as date, amount, transaction type and comment are validated before being sent to the server.
- Transaction Categories: There is an endpoint for obtaining transaction categories, which suggests that transactions can be grouped by category.
- Transaction Statistics: There is an endpoint for obtaining detailed statistics for the month and year with user transactions. This allows you to generate reports and analyze expenses.
- Modal Logout: When the user clicks on the "Logout" button, a modal window appears to confirm the logout. This is an extra layer of security to avoid accidental logout.
- Loader (Spinner): A spinner is used to indicate activity during asynchronous operations, such as downloading data. This spinner is called in the center of the screen.
- Balance Display: The Balance component subscribes to the total balance data and displays it.
- Dynamic Navigation: Navigation between different sections of the app is handled by react-router-dom navigation. Users can navigate between pages, such as "Home" and "Diagram," via the Navigation component.
- Filtering Transactions: The app provides the ability to filter and view transactions to help users keep track of their finances.
- Performance Optimization: There is a suggestion about saving the response with the date of the last request in localStorage and reusing this data for a period of an hour to reduce server load.
- Fonts and Favicon: The app manages fonts and favicon, which affects the look and style of the user interface.
- API documentation: There is a plan to create API endpoint documentation with Swagger UI Express, making it easier to understand and test the API.

---

## Setup
## For Developers:
### To install all dependencies from package.json use: npm install
### To run front-end App: <font color="orange">npm run dev</font>
### To run back-end server.js: <font color="orange">npm run start:dev</font>

**Node.js and npm Versions:**
- Node.js Version: v18.17.1
- npm Version: 9.8.0

## Install all packages included in package.json: npm install

**Installed Packages:**

- Vite: `npm create vite@latest // Use React + Vite / JavaScript + SWC (Speedy Web Compiler)`
- modern-normalize: `npm install modern-normalize`
- Prettier: `npm install --save-dev --save-exact prettier`
- Redux Toolkit: `npm install @reduxjs/toolkit`
- React-Redux: `npm install @reduxjs/toolkit react-redux`
- redux-persist: `npm install redux-persist`
- react-router-dom: `npm install react-router-dom`
- react-password-strange-bar: `npm install react-password-strange-bar`
- Firebase: `npm install -g firebase-tools`
- dotenv: `npm install dotenv --save`
- Axios: `npm install axios`
- Mui/material: `npm install @mui/material @emotion/react @emotion/styled`
- Notiflix: `npm i notiflix`


gh-pages: npm install gh-pages --save-dev

Deploying Vite App to GitHub Pages using gh-pages and script deploy:

Install gh-pages: npm install gh-pages --save-dev

Add script in package.json:
"scripts": { "deploy": "npm run build && gh-pages -d dist" },

Run script to build and publish in gh-pages branch on github: 
npm run deploy

---

## Project status
The project is:completed

---

## Acknowledgements
- This project as mentioned is the concluding phase of the training - Thanks to Team 5 and Go IT

---

## Contact
Created by Hi5 Team 
welcome to contact us! 
# 
 <img src="./imgReadme/hi5-logo.png" width="44" height="44"/>