# Maintenance policy / 维护政策

## English

### Repository status

`@newtype-os/plugin`, the open-source OpenCode edition in this repository, is in **maintenance mode**.

newtype OS began as an OpenCode plugin and later expanded into the standalone newtype CLI and native newtype Workstation. Current product development is focused on Workstation and CLI. The plugin remains available for existing OpenCode users, but it is not expected to maintain permanent feature parity with those products.

### In scope

- Compatibility fixes required by supported OpenCode releases
- Security fixes
- Critical and reproducible bug fixes
- Documentation corrections
- Dependency updates required to keep installation and runtime behavior operational
- Small reliability improvements that do not substantially expand the plugin

### Normally out of scope

- Large new plugin features
- Broad architecture rewrites
- Requests to mirror every Workstation or CLI capability
- New integrations without a clear maintenance plan
- Cosmetic refactors without user-facing benefit

Maintainers may make exceptions when a change is unusually valuable and has a clear long-term owner.

### Support expectations

Maintenance mode does not mean the repository is abandoned. It means changes are evaluated against a narrower scope. Response and release timing is not guaranteed.

For the actively developed experience:

- Apple Silicon Mac users should choose newtype Workstation.
- Cross-platform and terminal-first users should choose newtype CLI.
- Existing OpenCode users may continue using `@newtype-os/plugin`.

## 中文

### 仓库状态

本仓库中的开源 OpenCode 版本 `@newtype-os/plugin` 已进入**维护模式**。

newtype OS 最初以 OpenCode 插件形式诞生，后来发展出独立的 newtype CLI 和原生 newtype Workstation。当前产品开发重点是 Workstation 和 CLI。插件版继续面向现有 OpenCode 用户开放，但不再承诺与另外两个产品永久保持功能完全一致。

### 维护范围

- 支持 OpenCode 版本所必需的兼容性修复
- 安全问题修复
- 可以复现的关键问题修复
- 文档错误修正
- 保持安装和运行所必需的依赖更新
- 不显著扩大插件范围的小型可靠性改进

### 通常不再接受

- 大型插件新功能
- 大范围架构重写
- 要求同步 Workstation 或 CLI 全部能力的需求
- 缺少长期维护计划的新集成
- 没有用户价值的纯外观重构

如果某项改动具有明显价值并且有清晰的长期负责人，维护者可以酌情例外处理。

### 支持预期

维护模式不代表仓库已经废弃，而是所有改动都按照更窄的范围评估。问题响应和版本发布时间不作保证。

建议选择：

- Apple Silicon Mac 用户使用 newtype Workstation。
- 跨平台和终端用户使用 newtype CLI。
- 已经在使用 OpenCode 的用户可以继续使用 `@newtype-os/plugin`。
