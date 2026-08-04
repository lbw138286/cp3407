# US10 - Secure Account Login with Mock Object Testing

## User Story

As a user, I want to securely log into the system, so that my financial records can only be accessed by the account owner.

## Completion Status

Status: Completed for mock object testing and ready for Week 10 demo.

## System Tests

- ST-012 Mock login success
- ST-013 Mock login failure
- ST-014 Missing login input

## Related Bugs

- BUG-004: Login should reject missing email or password

## Bug Status

BUG-004 has been marked as Done because login validation was checked with mock login testing.

## Demo Explanation

The login process is tested with mock objects instead of a real authentication server. This allows the login logic to be tested safely and independently.
