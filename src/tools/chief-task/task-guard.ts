import type { TaskCircuitBreakerConfig } from "../../config/schema"

const DEFAULT_MAX_PER_SESSION = 50
const DEFAULT_MAX_PER_MINUTE = 10
const DEFAULT_MAX_DEPTH = 2
const DEFAULT_MAX_DUPLICATE_TASKS = 2
const WINDOW_MS = 60 * 1000

type RootState = {
  count: number
  times: number[]
  tasks: Map<string, number>
}

export type TaskGuardDecision =
  | {
      allowed: true
      commit: (sessionID: string) => void
      release: () => void
    }
  | {
      allowed: false
      message: string
    }

export function createTaskGuard(config?: TaskCircuitBreakerConfig) {
  const roots = new Map<string, string>()
  const depths = new Map<string, number>()
  const states = new Map<string, RootState>()

  const maxPerSession = config?.max_per_session ?? DEFAULT_MAX_PER_SESSION
  const maxPerMinute = config?.max_per_minute ?? DEFAULT_MAX_PER_MINUTE
  const maxDepth = config?.max_depth ?? DEFAULT_MAX_DEPTH
  const maxDuplicateTasks = config?.max_duplicate_tasks ?? DEFAULT_MAX_DUPLICATE_TASKS

  function root(sessionID: string) {
    return roots.get(sessionID) ?? sessionID
  }

  function reserve(parentSessionID: string, description: string, prompt?: string): TaskGuardDecision {
    const key = root(parentSessionID)
    const depth = depths.get(parentSessionID) ?? 0
    const state = states.get(key) ?? { count: 0, times: [], tasks: new Map() }
    const now = Date.now()
    const times = state.times.filter((time) => now - time < WINDOW_MS)
    const fingerprint = hashTask(description, prompt)
    const duplicates = state.tasks.get(fingerprint) ?? 0

    if (depth >= maxDepth) {
      return {
        allowed: false,
        message: formatBlocked("maximum task depth reached", description, {
          root: key,
          current: depth,
          limit: maxDepth,
        }),
      }
    }

    if (state.count >= maxPerSession) {
      return {
        allowed: false,
        message: formatBlocked("session task limit reached", description, {
          root: key,
          current: state.count,
          limit: maxPerSession,
        }),
      }
    }

    if (times.length >= maxPerMinute) {
      return {
        allowed: false,
        message: formatBlocked("task creation rate limit reached", description, {
          root: key,
          current: times.length,
          limit: maxPerMinute,
        }),
      }
    }

    if (duplicates >= maxDuplicateTasks) {
      return {
        allowed: false,
        message: formatBlocked("duplicate task loop detected", description, {
          root: key,
          current: duplicates,
          limit: maxDuplicateTasks,
        }),
      }
    }

    state.count++
    state.times = [...times, now]
    state.tasks.set(fingerprint, duplicates + 1)
    states.set(key, state)

    let done = false

    return {
      allowed: true,
      commit: (sessionID: string) => {
        if (done) return
        done = true
        roots.set(sessionID, key)
        depths.set(sessionID, depth + 1)
      },
      release: () => {
        if (done) return
        done = true
        state.count = Math.max(0, state.count - 1)
        state.times = state.times.filter((time) => time !== now)
        decrement(state.tasks, fingerprint)
      },
    }
  }

  return {
    reserve,
    root,
  }
}

function hashTask(description: string, prompt = "") {
  return normalizeTask(`${description}\n${prompt}`)
}

function normalizeTask(value: string) {
  return value
    .toLowerCase()
    .replace(/ses_[a-z0-9]+/g, "ses_*")
    .replace(/\b\d{4}-\d{2}-\d{2}[t\s]\d{2}:\d{2}(?::\d{2})?\b/g, "datetime")
    .replace(/\s+/g, " ")
    .slice(0, 1000)
}

function decrement(map: Map<string, number>, key: string) {
  const count = map.get(key) ?? 0
  if (count <= 1) {
    map.delete(key)
    return
  }
  map.set(key, count - 1)
}

function formatBlocked(reason: string, description: string, details: { root: string; current: number; limit: number }) {
  return [
    `❌ Task circuit breaker tripped: ${reason}.`,
    "",
    `Blocked task: ${description}`,
    `Root session: ${details.root}`,
    `Current: ${details.current}`,
    `Limit: ${details.limit}`,
    "",
    "Stop creating new sub-tasks. Summarize the current state, finish with existing results, or ask the user how to proceed.",
  ].join("\n")
}
