import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();

function read(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("floating nav clearance after Figma header", () => {
  it("defines --nav-stack and --nav-clearance from offset + height", () => {
    const tokens = read("src/styles/layout-tokens.css");
    assert.match(
      tokens,
      /--nav-stack:\s*calc\(var\(--nav-offset-top\) \+ var\(--nav-height\)\)/,
    );
    assert.match(
      tokens,
      /--nav-clearance:\s*calc\(var\(--nav-stack\) \+ var\(--space-control\)\)/,
    );
  });

  it("keeps case study chrome below the offset floating nav", () => {
    const sheets = read("src/styles/sheet-system.css");
    const inner = sheets.match(/\.case-study-layout-inner\s*\{[^}]+\}/)?.[0];
    const sticky = sheets.match(/\.sheet-nav-wrap\s*\{[^}]+\}/)?.[0];

    assert.ok(inner, "missing .case-study-layout-inner rule");
    assert.ok(sticky, "missing .sheet-nav-wrap rule");
    assert.match(inner, /padding-top:\s*var\(--nav-clearance\)/);
    assert.match(sticky, /top:\s*var\(--nav-clearance\)/);
    assert.doesNotMatch(inner, /padding-top:\s*var\(--nav-height\)/);
  });

  it("scrolls homepage hash targets and case sections clear of the header", () => {
    const layout = read("src/styles/layout-system.css");
    const globals = read("src/app/globals.css");
    const siteSection = layout.match(/\.site-section\s*\{[^}]+\}/)?.[0];

    assert.ok(siteSection, "missing .site-section rule");
    assert.match(siteSection, /scroll-margin-top:\s*var\(--nav-clearance\)/);
    assert.match(globals, /scroll-padding-top:\s*var\(--nav-clearance\)/);
    assert.match(
      globals,
      /scroll-margin-top:\s*calc\(var\(--nav-clearance\) \+ var\(--nav-item-height\)\)/,
    );
  });
});
