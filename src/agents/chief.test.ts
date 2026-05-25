import { describe, test, expect } from "bun:test"
import { buildChiefPrompt, DEFAULT_OUTER_PERSONA, createChiefAgent } from "./chief"

function allows(agent: unknown, tool: string): boolean {
  const config = agent as {
    permission?: Record<string, string>
    tools?: Record<string, boolean>
  }
  return config.permission?.[tool] === "allow" || config.tools?.[tool] === true
}

describe("chief prompt layers", () => {
  describe("buildChiefPrompt", () => {
    test("uses DEFAULT_OUTER_PERSONA when no outerPersona provided", () => {
      // #when
      const prompt = buildChiefPrompt()
      
      // #then
      expect(prompt).toContain(DEFAULT_OUTER_PERSONA)
    })

    test("uses custom outerPersona when provided", () => {
      // #given
      const customPersona = "<Communication_Style>Custom style</Communication_Style>"
      
      // #when
      const prompt = buildChiefPrompt(customPersona)
      
      // #then
      expect(prompt).toContain(customPersona)
      expect(prompt).not.toContain(DEFAULT_OUTER_PERSONA)
    })

    test("always includes CAPABILITIES (bottom layer)", () => {
      // #when
      const prompt = buildChiefPrompt()
      
      // #then
      expect(prompt).toContain("<Role>")
      expect(prompt).toContain("<Core_Capabilities>")
      expect(prompt).toContain("<Your_Team>")
      expect(prompt).toContain("<Delegation_Logic>")
      expect(prompt).toContain("<Execution_Behavior>")
      expect(prompt).toContain("<Memory_System>")
    })

    test("includes front-loaded content routing", () => {
      // #when
      const prompt = buildChiefPrompt()

      // #then
      expect(prompt).toContain("MANDATORY FRONT-LOADED ROUTING CHECK")
      expect(prompt).toContain("Do not treat writing requests as automatically writer-only")
      expect(prompt).toContain("Do not route by keyword matching alone")
      expect(prompt).toContain("Content Routing Precedence")
      expect(prompt).toContain("Use writer only after the brief and source basis are sufficient")
      expect(prompt).toContain("Default route for \"帮我写一篇介绍 X\"")
      expect(prompt).toContain("Load `super-workflow` first for any publishable content request")
      expect(prompt).toContain("treat a thin brief as mandatory interviewer")
      expect(prompt).toContain("super-workflow -> super-interviewer -> Deputy: archivist -> researcher -> writer -> editor -> fact-checker -> archivist")
    })

    test("includes Life OS skill pack routing", () => {
      // #when
      const prompt = buildChiefPrompt()

      // #then
      expect(prompt).toContain("Life OS Skill Packs")
      expect(prompt).toContain("skill({ name: \"weekly-review\" })")
      expect(prompt).toContain("skill({ name: \"learning-os\" })")
      expect(prompt).toContain("skill({ name: \"decision-os\" })")
      expect(prompt).toContain("skill({ name: \"knowledge-os\" })")
      expect(prompt).toContain("不要新增 `planner`")
    })

    test("routes creator strategy semantically before super skills", () => {
      // #when
      const prompt = buildChiefPrompt()

      // #then
      expect(prompt).toContain("Semantic Routing Protocol")
      expect(prompt).toContain("OS Packs before Super Skills")
      expect(prompt).toContain("asset_dependency")
      expect(prompt).toContain("requested_outcome")
      expect(prompt).toContain("根据我过往的视频脚本和 Newsletter，接下来应该出哪些内容？")
      expect(prompt).toContain("must load `creator-os` first")
      expect(prompt).toContain("then add `super-analyst`")
      expect(prompt).toContain("命中 Life OS 场景时，不要因为用户用了\"分析/建议/怎么看\"就跳过 OS Pack")
      expect(prompt).toContain("`super-analyst` 是叠加能力，不替代场景 Pack")
    })

    test("includes deputy route plan contract", () => {
      // #when
      const prompt = buildChiefPrompt()

      // #then
      expect(prompt).toContain("Route Plan Template")
      expect(prompt).toContain("required_specialists")
      expect(prompt).toContain("required_specialists: [archivist, researcher, writer, editor, fact-checker]")
      expect(prompt).toContain("direct_ok: false")
      expect(prompt).toContain("Deputy must call that specialist")
      expect(prompt).toContain("do not mark archivist, writer, editor, or fact-checker optional")
    })

    test("always includes INNER_PERSONA (middle layer)", () => {
      // #when
      const prompt = buildChiefPrompt()
      
      // #then
      expect(prompt).toContain("<Philosophy>")
      expect(prompt).toContain("<Thinking_Framework>")
      expect(prompt).toContain("<Information_Standards>")
    })

    test("custom outerPersona does not affect other layers", () => {
      // #given
      const customPersona = "<Communication_Style>Minimal</Communication_Style>"
      
      // #when
      const prompt = buildChiefPrompt(customPersona)
      
      // #then - capabilities still present
      expect(prompt).toContain("<Role>")
      expect(prompt).toContain("<Your_Team>")
      // #then - inner persona still present
      expect(prompt).toContain("<Philosophy>")
      expect(prompt).toContain("<Thinking_Framework>")
    })
  })

  describe("createChiefAgent", () => {
    test("creates agent with default persona when no outerPersona", () => {
      // #when
      const agent = createChiefAgent()
      
      // #then
      expect(agent.prompt).toContain(DEFAULT_OUTER_PERSONA)
    })

    test("creates agent with custom persona when provided", () => {
      // #given
      const customPersona = "<Discussion_Style>Be brief</Discussion_Style>"
      
      // #when
      const agent = createChiefAgent(undefined, customPersona)
      
      // #then
      expect(agent.prompt).toContain(customPersona)
      expect(agent.prompt).not.toContain(DEFAULT_OUTER_PERSONA)
    })

    test("accepts model parameter", () => {
      // #given
      const model = "google/antigravity-claude-opus-4-5"
      
      // #when
      const agent = createChiefAgent(model)
      
      // #then
      expect(agent.model).toBe(model)
    })

    test("has correct temperature", () => {
      // #when
      const agent = createChiefAgent()
      
      // #then
      expect(agent.temperature).toBe(0.3)
    })

    test("allows workbench and skill routing tools", () => {
      // #when
      const agent = createChiefAgent()

      // #then
      expect(allows(agent, "skill")).toBe(true)
      expect(allows(agent, "skill_catalog")).toBe(true)
      expect(allows(agent, "skill_mcp")).toBe(true)
      expect(allows(agent, "workbench")).toBe(true)
    })
  })
})
