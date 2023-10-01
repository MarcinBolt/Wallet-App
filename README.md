# Wallet-App README

## Contents

- [Introduction](#introduction)
- [Technologies](#Technologies)
- [For Developers](#for-developers)
- [Features](#Features)
- [Scope of Functionality](#scope-of-functionality)
- [Usage Example](#usage-examples)

## Introduction

### Goal of the Project

The Wallet App is a financial management application designed to help users efficiently manage their
finances. This README provides an overview of the app's features and instructions for getting
started.

## Technologies

The Wallet App is built using the following technologies: Frontend:

- HTML, CSS, and JavaScript for the user interface.
- React.js for building a dynamic and responsive frontend.
- Redux for state management.

Backend:

- Node.js for server-side development.
- Express.js for creating RESTful APIs.
- MongoDB for storing user data and transaction history.

  ***

## For Developers:

# To install all dependencies from package.json use: npm install

## To run front-end App: npm run dev

## To run back-end server.js: npm run start:dev

### Node version: v18.17.1

### npm version: 9.8.0

## Install all packages included in package.json: npm install

Installed packages: Vite: npm create vite@latest // Use React + Vite / JavaScript + SWC (Speedy Web
Compiler) modern-normalize: npm install modern-normalize Prettier: npm install --save-dev
--save-exact prettier Redux Toolkit: npm install @reduxjs/toolkit React-Redux: npm install
@reduxjs/toolkit react-redux redux-persist: npm install redux-persist react-router-dom: npm install
react-router-dom Firebase: npm install -g firebase-tools dotenv: npm install dotenv --save Axios:
npm install axios Mui/material: npm install @mui/material @emotion/react @emotion/styled Notiflix:
npm i notiflix

gh-pages: npm install gh-pages --save-dev

---

Deploying Vite App to GitHub Pages using gh-pages and script deploy:

Install gh-pages: npm install gh-pages --save-dev

Add script in package.json: "scripts": { "deploy": "npm run build && gh-pages -d dist" },

Run script to build and publish in gh-pages branch on github: npm run deploy

## Features

- User Registration and Login: Secure account creation and access.
- Transaction Management: Add and edit transactions with details like amount, date, and category.
- Financial Tracking: Real-time tracking of income and expenses with automatic balance calculation.
- Monthly Statistics: Visualize spending patterns with monthly statistics.
- Category Management: Organize and label transactions with custom categories.
- Currency Exchange Rates: Check real-time currency exchange rates for convenience.

## Scope of Functionality

The Wallet App provides the following key functionalities:

- User account creation and authentication.
- Addition and editing of financial transactions.
- Calculation of total income and expenses.
- Visualization of statistics for each month.
- Customization of spending categories.

## Usage Examples

### User Registration

1. Launch the app.
2. Click on the "Register" button to create a new account.
3. Provide the necessary information, including your username and password.
4. Click "Register" to create your account.

### Login

1. After registration, click on the "Login" button.
2. Enter your username and password.
3. Click "Login" to access your account.

### Adding Transactions

1. Once logged in, click on the plus button.
2. Fill in the details of the transaction, including amount, date, and category.
3. Click "Save" to add the transaction.

### Editing Transactions

1. In the "Transactions" section, find the transaction you want to edit.
2. Click the "Pen" button to make changes.
3. Save your edits.
