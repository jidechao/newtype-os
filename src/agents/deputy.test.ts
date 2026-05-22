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
    expect(agent.prompt).toContain("不允许事后解释")
    expect(agent.prompt).toContain("archivist → researcher → writer → editor → fact-checker → archivist")
  })

  test("prompt lowers writer threshold for publishable content", () => {
    // #when
    const agent = createDeputyAgent({ temperature: 0.1 })

    // #then
    expect(agent.prompt).toContain("面向用户的内容创作")
    expect(agent.prompt).toContain("调度完整内容 pipeline")
    expect(agent.prompt).not.toContain("大量内容创作")
  })

  test("prompt makes archivist a default content pipeline stage", () => {
    // #when
    const agent = createDeputyAgent({ temperature: 0.1 })

    // #then
    expect(agent.prompt).toContain("非临时、非一次性的内容项目默认先做轻量检索")
    expect(agent.prompt).toContain("产生可复用结论、素材、决策、选题、框架、事实清单时默认归档")
    expect(agent.prompt).toContain("写入 PROCESSING/工作区不等于归档到知识库")
  })

  test("prompt makes fact-checker mandatory for factual publishable content", () => {
    // #when
    const agent = createDeputyAgent({ temperature: 0.1 })

    // #then
    expect(agent.prompt).toContain("内容涉及公司/产品/工具/模型/价格/竞品/API/当前状态")
    expect(agent.prompt).toContain("fact-checker 必须最终审核")
    expect(agent.prompt).toContain("不得用 Deputy 自审替代")
  })
})
