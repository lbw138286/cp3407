# Practical 9 - Bug/Error Tracking Tools Evaluation

## Tools considered

| Tool / method | Advantages | Disadvantages | Decision |
|---|---|---|---|
| User-story GitHub Pages | Simple, already used in the project, easy to explain to teacher | Not suitable for detailed bug status, discussion, assignee, priority, and review evidence | Keep as summary pages only |
| GitHub Issues | Good for bug reports, labels, assignees, comments, status, reproduction steps, and references | Requires consistent issue writing discipline | Use as main bug tracking tool |
| GitHub Projects | Good for board view, status tracking, Todo/In Progress/Done, and linking issues/PRs | Needs manual update if automation is not configured | Use as main visual tracking board |
| Pull Requests | Good for code review and linking bug fixes to issues | Requires branch workflow | Use for bug fixes and review evidence |
| External tools such as Jira/Trello | Powerful project management features | Extra setup, unnecessary for a small student project | Not selected |

## Selected approach

The selected approach is:

1. Use **GitHub Issues** for each bug/error.
2. Use **GitHub Project Board** to track the status of each bug.
3. Use **GitHub Pull Requests** to review and merge bug fixes.
4. Use **GitHub Pages / markdown pages** to summarise user-story status and completed fixes.

## Reason

This approach is practical for a small student team because all project work, bug reports, code changes, reviews, and status tracking can remain in the same GitHub repository.
