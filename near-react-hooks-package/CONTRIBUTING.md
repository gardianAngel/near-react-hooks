# Contributing to NEAR React Hooks

We welcome contributions from the community! This document provides guidelines for contributing to the NEAR React Hooks project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a code of conduct to ensure a welcoming environment for all contributors. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm 7+
- Git
- A NEAR wallet for testing

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/your-username/near-react-hooks.git
cd near-react-hooks
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Available Scripts

- `npm run build` - Build the package for production
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
src/
├── hooks/              # React hooks implementation
│   ├── useNearWallet.ts
│   ├── useNearAccount.ts
│   ├── useNearContract.ts
│   └── useNearTransaction.ts
├── providers/          # React context providers
│   └── NearProvider.tsx
├── types.ts           # TypeScript type definitions
└── index.ts           # Main export file

tests/                 # Test files
examples/             # Example applications
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-hook` - New features
- `fix/wallet-connection-bug` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/optimize-performance` - Code refactoring

### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(hooks): add useNearWallet hook`
- `fix(provider): handle connection errors gracefully`
- `docs(readme): update installation instructions`
- `test(wallet): add comprehensive wallet tests`

### Code Style

- Use TypeScript for all source code
- Follow existing code style and conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Ensure code is properly formatted with Prettier

### Adding New Hooks

When adding a new hook:

1. Create the hook file in `src/hooks/`
2. Add comprehensive TypeScript types
3. Include proper error handling
4. Add unit tests
5. Update the main index file
6. Add documentation and examples

Example hook structure:

```typescript
import { useState, useEffect } from 'react';
import { YourHookState } from '../types';

export function useYourHook(): YourHookState {
  const [state, setState] = useState<YourHookState>({
    // initial state
  });

  useEffect(() => {
    // hook logic
  }, []);

  return state;
}
```

## Testing

### Writing Tests

- Write tests for all new functionality
- Ensure good test coverage (aim for >90%)
- Use descriptive test names
- Mock external dependencies appropriately
- Test both success and error scenarios

### Test Structure

```typescript
describe('useYourHook', () => {
  beforeEach(() => {
    // setup
  });

  test('should handle success case', () => {
    // test implementation
  });

  test('should handle error case', () => {
    // test implementation
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Pull Request Process

### Before Submitting

1. Ensure all tests pass: `npm test`
2. Check TypeScript types: `npm run typecheck`
3. Run linting: `npm run lint`
4. Update documentation if needed
5. Add changeset if applicable: `npx changeset`

### PR Guidelines

1. **Title**: Use a clear, descriptive title
2. **Description**: Include:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Any breaking changes

3. **Size**: Keep PRs focused and reasonably sized
4. **Tests**: Include tests for new functionality
5. **Documentation**: Update docs for public API changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Updated documentation

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

### Review Process

1. PRs require at least one approval from a maintainer
2. All CI checks must pass
3. Address review feedback promptly
4. Squash commits before merging (if requested)

## Release Process

### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Changesets

We use [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Add a changeset
npx changeset

# Version packages
npx changeset version

# Publish to npm
npx changeset publish
```

### Release Workflow

1. Changes are merged to `main`
2. Changesets CI creates a release PR
3. Maintainer reviews and merges release PR
4. Package is automatically published to npm

## Development Guidelines

### Hook Design Principles

1. **Simple API**: Hooks should be easy to use
2. **TypeScript First**: Full type safety
3. **Error Handling**: Graceful error handling
4. **Performance**: Efficient and optimized
5. **Testable**: Easy to test and mock

### Best Practices

1. **State Management**: Use appropriate React patterns
2. **Side Effects**: Properly cleanup side effects
3. **Dependencies**: Minimize external dependencies
4. **Documentation**: Document public APIs thoroughly
5. **Examples**: Provide practical examples

### Performance Considerations

- Use `useCallback` and `useMemo` appropriately
- Avoid unnecessary re-renders
- Optimize network requests
- Handle loading states properly

## Getting Help

### Community Resources

- 📖 [Documentation](https://near-react-hooks.dev)
- 💬 [Discord](https://discord.gg/near)
- 🐛 [Issues](https://github.com/near-react-hooks/near-react-hooks/issues)
- 💡 [Discussions](https://github.com/near-react-hooks/near-react-hooks/discussions)

### Asking Questions

When asking for help:

1. Check existing issues and discussions
2. Provide a clear description of the problem
3. Include relevant code snippets
4. Specify your environment (OS, Node version, etc.)
5. Include error messages if applicable

## Recognition

Contributors will be recognized in:

- GitHub contributors page
- Package.json contributors field
- Release notes for significant contributions
- Special recognition for major contributions

Thank you for contributing to NEAR React Hooks! 🚀