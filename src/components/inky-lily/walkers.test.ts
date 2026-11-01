import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import { closeDoor, initInkyWalkers } from "./walkers";

class ClassList {
  private names = new Set<string>();

  add(name: string) {
    this.names.add(name);
  }

  remove(name: string) {
    this.names.delete(name);
  }

  contains(name: string) {
    return this.names.has(name);
  }
}

class StyleBag {
  setProperty(name: string, value: string) {
    (this as unknown as Record<string, string>)[name] = value;
  }
}

class FakeEl {
  children: FakeEl[] = [];
  style = new StyleBag();
  classList = new ClassList();
  className = "";
  onclick: (() => void) | null = null;
  private html = "";

  get innerHTML() {
    return this.html;
  }

  set innerHTML(value: string) {
    this.html = value;
    this.children = [];
  }

  appendChild(child: FakeEl) {
    this.children.push(child);
    return child;
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  addEventListener() {}

  removeEventListener() {}

  remove() {}
}

function installDom() {
  const nodes = new Map<string, FakeEl>();
  const group = new FakeEl();
  const veil = new FakeEl();
  const root = new FakeEl();
  nodes.set("group", group);
  nodes.set("veil", veil);

  const documentMock = {
    body: new FakeEl(),
    head: new FakeEl(),
    getElementById(id: string) {
      return nodes.get(id) ?? null;
    },
    createElement() {
      return new FakeEl();
    },
    createComment() {
      return new FakeEl();
    },
    addEventListener() {},
    removeEventListener() {},
  };

  const windowMock = {
    innerWidth: 1280,
    addEventListener() {},
    removeEventListener() {},
    matchMedia() {
      return { matches: false };
    },
  };

  Object.assign(globalThis, {
    document: documentMock,
    window: windowMock,
    requestAnimationFrame() {
      return 1;
    },
    cancelAnimationFrame() {},
  });

  return { group, veil, root };
}

describe("inky lily walker sessions", () => {
  afterEach(() => {
    mock.timers.reset();
  });

  it("spawns again after leaving while the characters are on screen", () => {
    mock.timers.enable({ apis: ["setTimeout"] });
    const { group, root } = installDom();

    const leave = initInkyWalkers(root as unknown as HTMLElement);
    mock.timers.tick(7_000);
    assert.ok(group.children.length > 0);

    leave();
    assert.equal(group.children.length, 0);

    const leaveAgain = initInkyWalkers(root as unknown as HTMLElement);
    mock.timers.tick(7_000);
    assert.ok(
      group.children.length > 0,
      "a second visit should spawn characters again",
    );
    leaveAgain();
  });

  it("does not open the door after the page has unmounted", () => {
    mock.timers.enable({ apis: ["setTimeout"] });
    const { group, veil, root } = installDom();

    const leave = initInkyWalkers(root as unknown as HTMLElement);
    mock.timers.tick(7_000);
    assert.equal(typeof group.onclick, "function");
    group.onclick?.();

    leave();
    mock.timers.tick(5_000);
    assert.equal(veil.classList.contains("open"), false);

    const leaveAgain = initInkyWalkers(root as unknown as HTMLElement);
    mock.timers.tick(7_000);
    assert.ok(group.children.length > 0);
    leaveAgain();
  });

  it("ignores a close-door timer that fires after navigation", () => {
    mock.timers.enable({ apis: ["setTimeout"] });
    const { group, veil, root } = installDom();

    const leave = initInkyWalkers(root as unknown as HTMLElement);
    mock.timers.tick(7_000);
    veil.classList.add("open");
    closeDoor();
    leave();

    mock.timers.tick(1_000);
    const leaveAgain = initInkyWalkers(root as unknown as HTMLElement);
    mock.timers.tick(7_000);
    assert.ok(group.children.length > 0);
    leaveAgain();
  });
});
