# GitHub Repository 

This project is a Vue.js application designed to mimic the GitHub web interface by consuming the GitHub API using Octokit. The application uses Tailwind CSS for styling and includes the following main components:

- RepoPage: Lists all the repositories available for a given user.
- RepoDetailsPage: Displays details for a single repository.
- ErrorBoundary: Captures and renders any errors that occur within the application.
- NotFoundPage: Displays a 404 error page when a route is not found.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Components](#components)
  - [ReposPage](#repopage)
  - [RepoDetailsPage](#repodetailspage)
  - [ErrorBoundary](#errorboundary)
  - [NotFoundPage](#notfoundpage)
- [Screenshot](#screenshot)

## Demo

You can check out a live demo of the project [here](https://github-web-app2-64181h6sb-toluwanimis-projects.vercel.app/).

## Features

- List all repositories for a given user.
- Display detailed information for a selected repository.
- Error boundary component to handle errors.
- 404 page for non-existing routes.
- Styled with Tailwind CSS for a modern and responsive design.

## Components 

**ReposPage**
Lists all the repositories for a given GitHub user. It fetches data from the GitHub API using 
Octokit and displays it in a list format.

**RepoDetailsPage**
Displays detailed information about a single repository, such as the repository's name, description,
stars, forks, and other relevant information.

**ErrorBoundary**
Captures any errors in the application and renders a fallback UI. This helps in handling any 
unexpected issues in the app. The [Overview] nav shows the error in the application if there is any.

**NotFoundPage**
Renders a 404 error page when a user navigates to a non-existing route. The [Action] nav is use 
 as the non existing route

## Screnshots
![A screenshot of the Github Web UI](/public/github-web.jpg)
