# NYPL Research Catalog Developer Guide

This guide provides detailed technical information for developers working on the NYPL Research Catalog application.

## Table of contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Changelog](#changelog)
- [Coding Standards](#coding-standards)
  - [TypeScript](#typescript)
  - [React](#react)
  - [CSS/SCSS](#cssscss)
  - [API Calls](#api-calls)
  - [Error Handling](#error-handling)
  - [Conditionals](#conditionals)
  - [Variable Names](#variable-names)
  - [Types](#types)
  - [Directory Structure](#directory-structure)
  - [Components](#components)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Documentation](#documentation)
- [Accessibility](#accessibility)

## Getting started

Before contributing, please read and familiarize yourself with [README.md](README.md) to set up your development environment.

## Development workflow

### Deployed environments

The Research Catalog uses GitHub Actions for continuous integration and deployment. The GitHub Actions workflow tests the code, builds a Docker container, and deploys it to Vercel or AWS ECS (`nypl-digital-dev` account) depending on the branch.
When code is pushed to the `main` branch, it is automatically deployed to the main [Vercel environment](https://research-catalog.vercel.app/).
When code is pushed to the `qa` branch, it is automatically deployed to the [QA environment](https://qa-www.nypl.org/research/research-catalog), hosted in the AWS ECS cluster `research-catalog-qa` within the `nypl-digital-dev` account.
When code is pushed to the `production` branch, it is automatically deployed to the [production environment](https://nypl.org/research/research-catalog), hosted in the AWS ECS cluster `research-catalog-production` within the `nypl-digital-dev` account.

There is a third ECS Cluster reserved for the Research Catalog, `research-catalog-train`, that is used flexibly and is often reserved for testing feature branches, which can be configured via the [Github Actions config file](../.github/workflows/test-and-deploy.yml)

### Deployment process

1.  Feature branches are cut from `main` using

    `git checkout -b SCC-123/feature-name`.

2.  Document your changes in the CHANGELOG.md file under `## Prerelease`. See [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) for formatting docs.
3.  Create a pull request of the `feature` branch _into_ `main`.
4.  Once a feature branch has approval, merge into `main`.
5.  Once work is ready for testing, merge `main` into `qa` (usually feature work will go straight through `main` into `qa`, but `main` is sometimes a handy waiting area). Pushing the changes to the remote branch will automatically trigger a deployment to the [`qa` environment](https://qa-www.nypl.org/research/research-catalog).
6.  After QA has tested and approved, cut a `release` branch off of `qa`. Name the release branch using our [versioning guidelines](#versioning-guidelines).

    `git checkout -b release/x.y.z`.

7.  Update CHANGELOG.md in the release branch by moving updates from prerelease into the new release section.

    `## [2.4.13] - 04-21-2023`

    Also, update version in the `package.json`.

8.  Commit and push changes to release branch.
9.  The `production` branch is protected. When the release is ready, create a pull request to merge the `release` branch to `production`. Pushing to `production` will automatically deploy to the production environment.
10. After merging release to production, confirm changes appear on [production](https://www.nypl.org/research/research-catalog) and check the cluster's task status.
11. If all clear, finish the release. This is done by backmerging the release to `qa` and `main` followed by creating the tags using these commands:

    `$ git tag -a vx.y.z` (ex. `$ git tag -a v1.2.3`)
    `$ git push origin --tags`

    Then, go to the repository tags to generate a new release from the tag you just made, titled `vx.y.z`. The release description should be the changelog's release section.

\*\* If a hotfix is required, it is merged directly into the `production` branch and backmerged into the `main` and `qa` branches.

### Feature branches

A feature branch is a separate branch that is created from the main branch, specifically for the purpose of developing a new feature. This branch is used to isolate the changes related to the feature, allowing us to work on it independently of other changes.

Feature branches are useful when:

1. We are working on a large feature that is not ready for immediate deployment.
2. We want to isolate the changes related to the feature from other changes.
3. We want to prevent the feature from blocking smaller deployments.

### Branching strategy

The project follows a feature branch workflow:

1. `main` branch: Production-ready code
2. Branches for non-blocking changes associated with a JIRA ticket (`NYPL-1234/add-this-new-feature`), merged into `main` by the PR owner on approval.
3. Feature branches: Created from `main` for major features that could potentially block smaller releases, typically associated with a JIRA epic (e.g. `feature-name`).

## Changelog

### Changelog process

This project maintains a `CHANGELOG.md` file to document all notable changes. The changelog follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Changelog format

Each version entry in the changelog includes:

- A version number formatted as [MAJOR.MINOR.PATCH] (e.g. 1.4.5)
- A list of changes grouped under standard categories such as
  - **Added**: New features and functionality
  - **Removed**: Features that have been removed
  - **Changed**: Modifications to existing functionality
  - **Fixed**: Bug fixes

### Versioning guidelines

- **Major (X.0.0)**: Significant updates or feature release (e.g. the creation of a new page)
- **Minor (X.Y.0)**: New features added to existing pages
- **Patch (X.Y.Z)**: Bug fixes and small changes
- **Hotfix Releases**: Emergency patches outside the regular release cycle including deployment date (e.g. `[1.4.3] Hotfix YYYY-MM-DD`)

### Contribution guidelines

- All changes must be documented in `CHANGELOG.md` before merging into `main`.
- Each entry should include a brief description of the change and, when applicable, reference to relevant tickets.
- Formatting should remain consistent with previous entries

## Coding standards

### State management

- Try to favor the use of query parameters (via `router.push`) over app-wide state to allow the preservation of page state when a URL is shared or the page is refreshed
- A pattern commonly used in this app is the implicit refreshing of data via `getServerSideProps` every time the router is updated with new query parameters (see Search page implementation)
- Use React Context when it's not possible or advisable to preserve the app state in a query param (e.g. PatronDataContext)

### TypeScript

- Utilize type names to clearly delineate data transformations
- For example, use `DiscoveryBibResult` vs. `SearchResultsBib`, or `SierraCheckout` vs. `Checkout`
- This helps track the flow of data through the application and makes it clear when transformations occur
- Avoid using `any` type when possible

### Models/Classes

- Use a Model/Class instead of a Type whenever a data structure contains functionality that operates on a specific instance of that data, or when the data structure returned from the API needs to be significantly reformatted for use in the Research Catalog app.
- For example, a Bib model is instantiated for each Bib object returned from the Discovery API in order to extract deeply nested or ambiguously named properties, build urls and copy for that Bib, or to instantiate that Bib's associated Item objects.

### React

- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use the NYPL Design System components when available
- Follow the container/presentational component pattern when appropriate

### CSS/SCSS

#### Inline vs. module

- Try to favor styling props over SCSS modules.
- Use a SCSS module if styles are being reused by more than one component
- Use a SCSS module if styles wrap to more than one line in a component file
- Use component-provided styles if they exist (e.g., tableStyles in the Table component)

### Server error logging

All API calls should include error logs with relevant metadata.

Use the `logServerError` function in `logUtils` instead of calling the logger directly to enforce error logging standards.

Example:

```typescript
// Correct
catch (error) {
  logServerError("nameOfFunction", error.message)
}

// Incorrect
logger.error("Something has gone wrong")
```

#### Importing Winston logger in client-side components

NB: Since we are currently using the Next.js pages router which doesn't support server components, it is necessary to disable a dependency of Winston (`fs`) on the client-side only in order to prevent an uninformative error that breaks the app when the logger is imported in a client component for use in `getServerSideProps`. It is currently disabled on the webpack build in `next.config.js`

### Conditionals

- Avoid nested ternaries and if/else statements whenever possible
- Prefer verbose and even redundant variables that reflect the exact state when returning
- Avoid ternaries that are more than a few lines long
- Prefer `binaryState && <Component/>` over `binaryState ? <Component/> : null`, especially when the first return value is multi-line
  - Known exceptions include list items for the `<List/>` components due to Design System constraints
- If you cannot follow these recommendations, leave a comment above the return value indicating what the state is at that point

Example:

```typescript
// Avoid
return isLoading ? (
  <LoadingComponent />
) : error ? (
  <ErrorComponent error={error} />
) : data ? (
  <DataComponent data={data} />
) : (
  <EmptyStateComponent />
)

// Prefer
const isLoading = status === "loading"
const hasError = status === "error"
const hasData = status === "success" && data && data.length > 0
const isEmpty = status === "success" && (!data || data.length === 0)

// Comment indicating the state
// Rendering loading state
if (isLoading) return <LoadingComponent />
// Rendering error state
if (hasError) return <ErrorComponent error={error} />
// Rendering data
if (hasData) return <DataComponent data={data} />
// Rendering empty state
return <EmptyStateComponent />
```

### Variable names

- Variables should reflect what they are being used for, not how they were derived
- Choose names that clearly communicate the purpose of the variable

Example:

```typescript
// Avoid
const sortValuesHaveUpdated = prevSortBy !== currentSortBy
if (sortValuesHaveUpdated) {
  fetchResults()
}

// Prefer
const freshSortByQuery = prevSortBy !== currentSortBy
if (freshSortByQuery) {
  fetchResults()
}
```

### Directory structure

- Tests go in a test directory in the nearest ancestor, unless a file is an only child
- The root-level `__test__` directory is used for testing Next.js page components ONLY. This is necessary at the moment due to the inability to run jest tests from the `/pages` directory.
- Components should have their tests in a `__tests__` directory within the component directory

NB: Test file structure is currently inconsistent, some files are located adjacent to the component, some are in a `/*tests` directory. This does not affect functionality since the Jest config automatically registers any test files found within the app automatically. This should be cleaned up in the future.

Example:

```
src/
  components/
    SearchForm/
      SearchForm.tsx
      __tests__/
        SearchForm.test.tsx
  utils/
    searchUtils.ts
    utilsTests/
      searchUtils.test.ts
```

### Components

- You should be able to tell whether or not a child component will render from the parent
- Child components should not make a determination based on a prop and return null
- This improves readability and makes the component hierarchy more predictable

Example:

```typescript
// Avoid
const ChildComponent = ({ shouldRender, data }) => {
  if (!shouldRender) return null
  return <div>{data}</div>
}

const ParentComponent = ({ data }) => {
  return (
    <div>
      <ChildComponent shouldRender={!!data} data={data} />
    </div>
  )
}

// Prefer
const ChildComponent = ({ data }) => {
  return <div>{data}</div>
}

const ParentComponent = ({ data }) => {
  return <div>{data && <ChildComponent data={data} />}</div>
}
```

### Code formatting

The project uses ESLint and Prettier for code formatting:

```bash
# Check code style
npm run lint

# Format code
npm run prettier
```

These checks are automatically run as pre-commit hooks using Husky.

## Testing guidelines

### Test coverage

All new code should include appropriate tests:

- Unit tests for utility functions and small components (Jest)
- Integration tests for complex components and pages (Playwright)

NB: While we currently do not have a coverage threshold in place (though we may in the future), the current rule of thumb is to add coverage for any practical scenario a user may experience, including edge cases when appropriate.

### Running Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage
npm run coverage

# Run tests in watch mode
npm run test-watch

# Run Playwright tests
```

### Test Structure

Follow these guidelines for test structure:

- Group related tests in `describe` blocks
- Use clear and descriptive test names
- Mock external dependencies
- Test edge cases and error conditions, especially when they cause unexpected behaviors and bugs.

Example:

```typescript
describe("SearchForm", () => {
  it("submits the search query when the form is submitted", async () => {
    // Arrange
    const handleSearch = jest.fn()
    render(<SearchForm onSearch={handleSearch} />)

    // Act
    await userEvent.type(screen.getByLabelText("Search"), "test query")
    await userEvent.click(screen.getByRole("button", { name: "Search" }))

    // Assert
    expect(handleSearch).toHaveBeenCalledWith({
      query: "test query",
      field: "all",
    })
  })
})
```

## Pull Request Process

1. **Create a Pull Request (PR)** from your feature branch to the `main` branch
2. **Fill out the PR template** with:
   - A clear description of the changes
   - Any related issues
   - Testing instructions
   - Screenshots (if applicable)
3. **Ensure all checks pass**:
   - Linting
   - Type checking
   - Tests
4. **Request reviews** from appropriate team members
5. **Address review feedback** and make necessary changes
6. **Once approved**, a maintainer will merge your PR

### PR Review Checklist

Reviewers will check for:

- Code quality and adherence to coding standards
- Test coverage
- Documentation
- Accessibility compliance
- Performance considerations
- Security implications

## Release Process

The release process is managed by the project maintainers:

1. Changes are merged into the `main` branch
2. When ready for release, a release branch is created
3. Final testing is performed on the release branch
4. The release branch is merged into `main`
5. A tag is created with the version number
6. The release is deployed to production

### Github Tags for Production Releases

- Each production release is tagged in GitHub to maintain a clear history of deployed versions.

### Tagging Process

1. Create a new Release in GitHub: Every production release should be tagged with the corresponding version number following [Semantic Versioning](https://semver.org/spec/v2.0.0.html). The format should be

   ```
   vX.Y.Z
   ```

2. Add changelog entry as the tag description
3. Set target to `production` branch
4. Publish the release

## Documentation

### Code Documentation

- Document complex logic with inline comments
- Keep comments up-to-date with code changes
- Address TODO comments periodically and prune any outdated TODO's

### Project Documentation

When making significant changes, update the relevant documentation:

- `README.md`: Overview and basic usage
- `DEVELOPER_GUIDE.md`: Technical details for developers
- `ENVIRONMENT_VARIABLES.md`: Details pertaining environment variables
- `MY_ACCOUNT.md`: Details pertaining My Account

## Accessibility

The NYPL Research Catalog must be accessible to all users. Follow these guidelines:

### WCAG Compliance

- Aim for WCAG 2.1 AA compliance
- Use semantic HTML elements
- Ensure proper keyboard navigation
- Provide appropriate ARIA attributes
- Maintain sufficient color contrast

### Accessibility Testing

- Perform manual testing with keyboard navigation
- Test with screen readers
- Major releases or changes to UI/functionality should be reviewed by an NYPL accessibility consultant
