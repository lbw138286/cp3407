# US3: Add Expenses Implementation
class Expense:
    def __init__(self, amount, category, date, description):
        self.amount = amount
        self.category = category
        self.date = date
        self.description = description

class ExpenseTracker:
    def __init__(self):
        self.expenses = []

    # Core function for US3
    def add_expense(self, amount, category, date, description):
        # Validation 1: amount must be positive
        if amount <= 0:
            return "Error: Amount must be greater than 0"
        
        # Validation 2: category cannot be empty
        if not category:
            return "Error: Category is required"
        
        # Create and save expense
        new_expense = Expense(amount, category, date, description)
        self.expenses.append(new_expense)
        return "Expense added successfully"

# ------------------------------
# Test the function (for marking)
# ------------------------------
if __name__ == "__main__":
    tracker = ExpenseTracker()
    
    # Example 1: valid expense
    print(tracker.add_expense(25, "Food", "2026-06-02", "Lunch"))
    
    # Example 2: invalid amount (negative)
    print(tracker.add_expense(-5, "Transport", "2026-06-02", "Bus"))
