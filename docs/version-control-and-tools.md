# Version Control and Development Tools

## Version control
The project was managed through GitHub. The completed tracking workflow was:

1. Issues recorded user stories, tasks and defects.
2. Team members worked on feature and bug-fix branches.
3. Project status was tracked through Todo, In Progress and Done states.
4. Commits recorded implementation and documentation changes.
5. Pull Requests and teammate reviews were completed before merge.
6. GitHub Actions ran `npm test` for push and Pull Request events.
7. Releases v1.0.0 and v1.0.1 retained identifiable final versions.

## Development tools
- HTML, CSS and JavaScript for the browser interface.
- Node.js 22 for the HTTP server, security functions and built-in test runner.
- SQLite for the executable relational database and persistent application data.
- GitHub Issues and GitHub Projects for task and defect tracking.
- GitHub Actions for continuous integration.
- Docker for reproducible application packaging.
- Mermaid Live Editor for editable class, sequence and entity-relationship diagrams.
- GitHub Pages source files for project documentation. Publication remains a repository-owner action until the Pages URL is verified.

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

The final project used GitHub Issues, feature branches, Pull Requests,
teammate review and GitHub Actions for change control.

- PR #27 fixed the US9 spending trend decimal precision issue.
- PR #29 updated the final automated test count from 40 to 41.
- GitHub Actions ran the Node.js test suite for push and pull request events.
- The final automated test result was 41 passed and 0 failed.
- A separate teammate review was requested before merging the final
  documentation review update.
- Pull Request #34 implemented the lecturer-requested report-interface correction and was published in release v1.0.1.
