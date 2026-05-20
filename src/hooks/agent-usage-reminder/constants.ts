import { join } from "node:path";
import { getOpenCodeStorageDir } from "../../shared/data-path";

export const OPENCODE_STORAGE = getOpenCodeStorageDir();
export const AGENT_USAGE_REMINDER_STORAGE = join(
  OPENCODE_STORAGE,
  "agent-usage-reminder",
);

// All tool names normalized to lowercase for case-insensitive matching
export const TARGET_TOOLS = new Set([
  "grep",
  "safe_grep",
  "glob",
  "safe_glob",
  "webfetch",
  "context7_resolve-library-id",
  "context7_query-docs",
  "websearch_web_search_exa",
  "context7_get-library-docs",
  "grep_app_searchgithub",
]);

export const AGENT_TOOLS = new Set([
  "task",
  "call_omo_agent",
  "chief_task",
]);

export const REMINDER_MESSAGE = `
[Agent Usage Reminder]

You called a search/fetch tool directly.

Use chief_task only when the work can be split into independent, non-duplicative subtasks. Keep direct tool calls when you are already debugging one failing file, command, image, or permission issue.

Good chief_task use:
\`\`\`
chief_task(subagent_type="researcher", prompt="Find independent sources about topic X", run_in_background=true, skills=[])
chief_task(subagent_type="archivist", prompt="Search the knowledge base for prior notes about Y", run_in_background=true, skills=[])
\`\`\`

Do not create more agents to retry the same failed target. After one failed attempt, inspect the concrete error, change the approach, or ask the user.
`;
