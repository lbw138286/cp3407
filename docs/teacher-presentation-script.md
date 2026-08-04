# Teacher Presentation Script

For the final Practical 10 demonstration, our team completed the Smart Expense Tracker as a full database-backed web application. The final version no longer relies on localStorage as the main data store. It uses a relational SQLite database through a Node.js API, and the database stores users, sessions, categories, expenses, monthly budgets, bugs and acceptance feedback.

The committed project scope includes US1 to US10, and all user stories are now implemented. Users can register and log in securely, add, edit, delete and categorise expenses, set monthly budgets, receive budget alerts, generate monthly reports and analyse spending trends. An administrator can view users, update roles and statuses, disable accounts and delete accounts.

For security, passwords are salted and hashed with scrypt, plain passwords are not stored, and session tokens are verified by the server. For US9, the previous month-sorting defect was fixed, and a regression test confirms that unordered month data is sorted before the trend is calculated.

The project contains forty automated tests, including unit tests, mock-object tests and database/API integration tests. The final system test result is fifteen passes, zero conditional passes and zero failures. All recorded bugs are closed.

The design evidence includes editable class, sequence and database ER diagrams that can be opened in an online Mermaid editor, plus the UI wireframe and implemented responsive interface. The package also includes Docker deployment support, a GitHub Actions CI workflow, issue forms and a pull-request template.

I will now run the tests, start the application and demonstrate the user stories. After the functional demonstration, I will show the database, security design, test evidence, bug log, Agile planning and rubric compliance review. The remaining evidence that depends on external accounts is the live GitHub project board, collaborator invitation, public deployment URL and genuine lecturer/client feedback; these must be verified in the team's actual accounts rather than fabricated in the submission files.
