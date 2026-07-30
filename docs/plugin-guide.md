# OpenCode plugin guide

This guide covers the open-source `@newtype-os/plugin` edition contained in this repository.

> The plugin is in maintenance mode. For product status and contribution scope, see [MAINTENANCE.md](../MAINTENANCE.md).

## Install

```bash
cd ~/.config/opencode
bun add @newtype-os/plugin
```

Add the plugin to `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["newtype-profile"]
}
```

Restart OpenCode after changing the configuration.

## Directories

The plugin uses OpenCode's namespaces:

- Global configuration: `~/.config/opencode/`
- Project configuration and data: `.opencode/`
- Agent configuration: `~/.config/opencode/newtype-profile.json`

These paths are separate from the newtype CLI and Workstation namespaces, which use `~/.config/newtype/` and `.newtype/`.

## Configure agent models

Edit `~/.config/opencode/newtype-profile.json`:

```json
{
  "agents": {
    "chief": { "model": "your-preferred-model" },
    "deputy": { "model": "your-preferred-model" },
    "researcher": { "model": "your-preferred-model" },
    "writer": {
      "model": "your-preferred-model",
      "temperature": 0.7
    }
  }
}
```

## Customize Chief

Create `.opencode/SOUL.md` in a project to customize Chief's communication style. You can generate a starting template with:

```text
/init-soul
```

## Disable components

Use `~/.config/opencode/newtype-profile.json`:

```json
{
  "disabled_agents": ["fact-checker"],
  "disabled_skills": ["super-analyst"],
  "disabled_hooks": ["memory-system"],
  "disabled_mcps": ["sequential-thinking"]
}
```

## Local development

```bash
git clone https://github.com/newtype-01/newtype-os.git
cd newtype-os
bun install
bun run typecheck
bun run build
```

Load the local build from `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["file:///absolute/path/to/newtype-os/dist/index.js"]
}
```

Restart OpenCode after rebuilding.

## Related documentation

- [CLI guide](./cli-guide.md)
- [Orchestration guide](./orchestration-guide.md)
- [Category and skill guide](./category-skill-guide.md)
- [Contributing](../CONTRIBUTING.md)
