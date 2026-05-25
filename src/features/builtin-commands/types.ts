import type { CommandDefinition } from "../claude-code-command-loader";

export type BuiltinCommandName =
  | "wiki"
  | "ralph-loop"
  | "cancel-ralph"
  | "switch"
  | "super-analyst"
  | "super-writer"
  | "super-fact-checker"
  | "super-editor"
  | "super-interviewer"
  | "super-obsidian"
  | "super-workbench"
  | "super-workflow"
  | "creator-os"
  | "knowledge-os"
  | "weekly-review"
  | "learning-os"
  | "decision-os"
  | "memory-consolidate"
  | "configure-models"
  | "init-soul";

export interface BuiltinCommandConfig {
  disabled_commands?: BuiltinCommandName[];
}

export type BuiltinCommands = Record<string, CommandDefinition>;
