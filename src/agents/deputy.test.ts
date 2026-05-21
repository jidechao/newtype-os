import { describe, test, expect } from "bun:test"
import { createDeputyAgent } from "./deputy"

describe("deputy agent", () => {
  test("description allows specialist delegation", () => {
    // #when
    const agent = createDeputyAgent({ temperature: 0.1 })

    // #then
    expect(agent.description).toContain("调度专业 Agents")
    expect(agent.description).not.toContain("不能再委派")
  })

  test("prompt treats route plan as execution contract", () => {
    // #when
    const agent = createDeputyAgent({ temperature: 0.1 })

    // #then
    expect(agent.prompt).toContain("ROUTE PLAN 优先级")
    expect(agent.prompt).toContain("required_specialists")
    expect(agent.prompt).toContain("必须调用")
    expect(agent.prompt).toContain("direct_ok: false")
  })

  test("prompt lowers writer threshold for publishable content", () => {
    // #when
    const agent = createDeputyAgent({ temperature: 0.1 })

    // #then
    expect(agent.prompt).toContain("面向用户的内容创作")
    expect(agent.prompt).toContain("写一篇/介绍 X/报告/newsletter/长帖/脚本")
    expect(agent.prompt).not.toContain("大量内容创作")
  })

  test("prompt makes archivist a default content pipeline stage", () => {
    // #when
    const agent = createDeputyAgent({ temperature: 0.1 })

    // #then
    expect(agent.prompt).toContain("非临时、非一次性的内容项目默认先做轻量检索")
    expect(agent.prompt).toContain("产生可复用结论、素材、决策、选题、框架、事实清单时默认归档")
  })
})
