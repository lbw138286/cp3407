# Mock Object Framework Research

## Purpose

Mock objects are used to simulate dependencies that are difficult, slow, or unnecessary to use during unit testing. In this project, the login process would normally depend on an authentication repository or database. For Practical 8, a mock authentication repository was used instead.

## Why mock objects are useful

Mock objects help test one unit of logic without requiring the real external dependency. For the Smart Expense Tracker Web Application, this means the login function can be tested without a real database, API server, or user account system.

## Mock login example in this project

The file `tests/iteration3.test.js` includes mock login tests for US10. The test creates a mock repository with a mocked `findUserByEmail()` function. The login service then calls this mock repository as if it were a real authentication data source.

## Benefits for this project

- Login logic can be tested without setting up a real database.
- The test can control whether the user exists or whether the password is correct.
- The test can verify whether the repository function was called.
- Invalid input can be tested to confirm that the repository is not called unnecessarily.

## Practical result

Mock object testing was implemented for US10 Secure Account Login. Three automated tests verify successful login, failed login, and invalid input handling.
