# Version Control and Development Tools

## Version control
The project is designed to be submitted through GitHub. The expected tracking workflow is:

1. Create issues for user stories, tasks, and bugs.
2. Assign team members.
3. Track issue status using Todo, In Progress, and Done.
4. Use commits with meaningful messages.
5. Use pull requests for review before merging code changes.
6. Update GitHub Pages for completed user stories and project documentation.

## Development tools
- HTML, CSS, JavaScript for the web application.
- Node.js built-in test runner for automated testing.
- GitHub Issues and GitHub Projects for task and bug tracking.
- GitHub Pages for project documentation and delivered feature pages.
- UML/class/sequence diagrams for design documentation.
- MySQL-style schema design for database planning.

## Build and run
Run tests:

```bash
npm test
```

Run the final application from the project root:

```bash
npm test
npm start
```

Then open:

```text
http://127.0.0.1:3000
```

The application must be accessed through the Node.js server because it uses the backend API and SQLite relational database.

## Final Code Review Workflow

The final project used GitHub Issues, feature branches, Pull Requests and
GitHub Actions for change control.

- PR #27 fixed the US9 spending trend decimal precision issue.
- PR #29 updated the final automated test count from 40 to 41.
- GitHub Actions ran the Node.js test suite for push and pull request events.
- The final automated test result was 41 passed and 0 failed.
- A separate teammate review was requested before merging the final
  documentation review update.
