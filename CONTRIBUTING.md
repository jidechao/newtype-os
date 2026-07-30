# Contributing to the newtype OS OpenCode plugin

Thank you for contributing to the open-source `@newtype-os/plugin` edition of newtype OS.

This repository is in **maintenance mode**. New product development is focused on newtype Workstation and newtype CLI. Before starting work, read [MAINTENANCE.md](./MAINTENANCE.md) to confirm that the proposed change fits the repository's current scope.

## Accepted contributions

We welcome focused changes in these areas:

- Compatibility with supported OpenCode releases
- Security fixes
- Critical bug fixes with a reproducible case
- Documentation corrections
- Small reliability and accessibility improvements
- Dependency maintenance required to keep the plugin operational

Large new features, broad architecture rewrites, or requests to mirror Workstation and CLI features into the plugin are normally out of scope.

## Communication

English is the primary language for pull requests, code review, documentation, and repository discussions. Clear, simple English is welcome; perfect grammar is not required.

## Prerequisites

- Bun
- TypeScript
- A supported OpenCode installation for local testing

## Development setup

```bash
git clone https://github.com/newtype-01/newtype-os.git
cd newtype-os
bun install
bun run build
```

To test a local build, add its absolute file URL to `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["file:///absolute/path/to/newtype-os/dist/index.js"]
}
```

Restart OpenCode after rebuilding the plugin.

## Validation

Run the checks relevant to the change:

```bash
bun run typecheck
bun run build
bun test
```

Documentation-only changes do not require the full runtime test suite, but all links, commands, headings, and English/Chinese claims must be checked.

## Pull request process

1. Create a branch from `main`.
2. Keep the change focused on one maintenance concern.
3. Explain the problem, user impact, and validation performed.
4. Update documentation when user-visible behavior changes.
5. Do not change the package version in `package.json`.
6. Submit the pull request against `main`.

## Project conventions

- Use Bun for package management and scripts.
- Preserve TypeScript type safety; do not suppress errors with `any`, `@ts-ignore`, or `@ts-expect-error`.
- Follow existing module and naming patterns.
- Prefer small, reviewable changes over broad rewrites.
- Preserve upstream license and attribution.

## Publishing

Publishing is handled by project maintainers through the repository's release workflow. Contributors should not change versions or publish the package directly.

## Product support

- newtype Workstation and CLI information: [README.md](./README.md)
- OpenCode plugin usage: [docs/plugin-guide.md](./docs/plugin-guide.md)
- Product website: [os.newtype.pro](https://os.newtype.pro/)
