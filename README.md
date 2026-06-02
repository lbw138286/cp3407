# Smart Expense Tracker Web Application

## Project Overview
The Smart Expense Tracker Web Application helps users manage personal finances by tracking income, expenses, budgets, and spending habits.

---

# Team Members

| Student Name | Role |
|---|---|
| Zhu Zhiwei| Project Manager & Frontend Developer |
| Jiang Jinsong| Backend Developer |
| Fu Yuzhe| Database Designer & Tester |

---

# Technology Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- GitHub

---

# Features

- User registration and login
- Add/edit/delete expenses
- Expense categorization
- Budget tracking
- Financial reports
- Responsive design

---

# Initial Backlog Ideas

## User Stories

1. As a user, I want to create an account so that I can securely store my expense data.

2. As a user, I want to log into the system so that I can access my financial records.

3. As a user, I want to add expenses so that I can track my daily spending.

4. As a user, I want to edit or delete expenses so that I can correct mistakes.

5. As a user, I want to categorize my expenses so that I can better understand my spending habits.

6. As a user, I want to set a monthly budget so that I can control my spending.

7. As a user, I want to receive budget alerts so that I know when I overspend.

8. As a user, I want to view monthly reports so that I can analyze my finances.

9. As a user, I want the application to work on mobile devices so that I can use it anywhere.

10. As an admin, I want to manage user accounts so that the system remains organized.

---

# GitHub Repository

GitHub Link:
[https://github.com/your-team-name/smart-expense-tracker](https://github.com/lbw138286/cp3407/edit/main/README.md)

# CP3407 WEEK3
Task 3 Full English Version (US3 Add Expenses)
User Story
As a user, I want to add daily expenses so that I can track my spending habits.
Acceptance Criteria
The system provides an expense input form with amount, category, date, and description.
The system validates that the amount is a positive number.
The system validates that the category is not empty.
The system saves the expense record to the storage when input is valid.
The system shows a success message for valid submission and an error message for invalid input.
Implemented Code (Python)
python


# US3 - Add Expenses Implementation
class Expense:
    def __init__(self, amount, category, date, description):
        self.amount = amount
        self.category = category
        self.date = date
        self.description = description

class ExpenseTracker:
    def __init__(self):
        self.expenses = []

    def add_expense(self, amount, category, date, description):
        if amount <= 0:
            return "Error: Amount must be positive"
        if not category:
            return "Error: Category cannot be empty"
        
        new_expense = Expense(amount, category, date, description)
        self.expenses.append(new_expense)
        return "Expense added successfully"

# Test run
if __name__ == "__main__":
    tracker = ExpenseTracker()
    print(tracker.add_expense(25, "Food", "2026-06-02", "Lunch"))
    print(tracker.add_expense(-10, "Transport", "2026-06-02", "Bus"))
GitHub Task Completion
Created src/add_expense.py in the repository
Implemented all acceptance criteria
Moved US3 from Todo to Done in the project board
