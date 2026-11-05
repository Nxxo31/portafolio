import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const MESSAGES_DIR = join(ROOT, "messages");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function flatten(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? flatten(value, `${prefix}${key}.`)
      : [[`${prefix}${key}`, value]],
  );
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

// ---------------------------------------------------------------- i18n parity

const es = readJson(join(MESSAGES_DIR, "es.json"));
const en = readJson(join(MESSAGES_DIR, "en.json"));

test("es.json y en.json tienen exactamente las mismas claves", () => {
  const esKeys = flatten(es).map(([key]) => key).sort();
  const enKeys = flatten(en).map(([key]) => key).sort();
  const soloEs = esKeys.filter((key) => !enKeys.includes(key));
  const soloEn = enKeys.filter((key) => !esKeys.includes(key));
  assert.deepEqual(soloEs, [], `claves solo en es.json: ${soloEs.join(", ")}`);
  assert.deepEqual(soloEn, [], `claves solo en en.json: ${soloEn.join(", ")}`);
});

test("ningún valor de i18n está vacío", () => {
  const vacios = flatten(es)
    .filter(([, value]) => value === "" || value === null)
    .map(([key]) => key);
  assert.deepEqual(vacios, [], `valores vacíos: ${vacios.join(", ")}`);
});

test("las claves t() usadas en el código existen en ambos locales", () => {
  const files = [
    ...walk(join(ROOT, "src", "sections")),
    ...walk(join(ROOT, "src", "components")),
  ];
  const enKeys = new Set(flatten(en).map(([key]) => key));
  const faltantes = [];

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const namespaceMatch = src.match(
      /useTranslations\(\s*["']([^"']+)["']\s*\)/,
    );
    const namespace = namespaceMatch ? namespaceMatch[1] : null;
    if (!namespace) continue;

    const callRe = /\bt\(\s*["']([^"']+)["']\s*\)/g;
    let match;
    while ((match = callRe.exec(src)) !== null) {
      const key = match[1];
      if (key.includes("${")) continue; // clave dinamica, se valida en runtime
      if (!enKeys.has(`${namespace}.${key}`)) {
        faltantes.push(`${relative(ROOT, file)} -> ${namespace}.${key}`);
      }
    }
  }

  assert.deepEqual(faltantes, [], `claves i18n faltantes:\n${faltantes.join("\n")}`);
});

// ------------------------------------------------------------ contenido datos

test("los mensajes declaran los namespaces que el sitio usa", () => {
  for (const namespace of [
    "Hero",
    "About",
    "Experience",
    "Projects",
    "Skills",
    "Contact",
    "Footer",
    "Navbar",
    "Blog",
    "Resume",
    "NotFound",
    "ProjectDetail",
    "Metadata",
  ]) {
    assert.ok(namespace in es, `falta el namespace ${namespace} en es.json`);
    assert.ok(namespace in en, `falta el namespace ${namespace} en en.json`);
  }
});

test("el bootstrap anti-FOUC declara los 6 themes del sistema", () => {
  const layout = readFileSync(join(ROOT, "src", "app", "layout.tsx"), "utf8");
  const block = layout.match(/themeBootstrap = `([\s\S]*?)`;/);
  assert.ok(block, "no se encontro themeBootstrap en src/app/layout.tsx");
  for (const theme of [
    "default",
    "default-light",
    "default-dark",
    "lava-neon",
    "obsidian-teal",
    "navy-gold",
  ]) {
    assert.ok(
      block[1].includes(`'${theme}'`),
      `el bootstrap anti-FOUC no lista el theme ${theme}`,
    );
  }
});

test("cada theme de globals.css declara los tokens que usa el sitio", () => {
  const css = readFileSync(join(ROOT, "src", "app", "globals.css"), "utf8");
  const required = [
    "--ink",
    "--paper",
    "--accent-1",
    "--accent-2",
    "--surface",
    "--surface-dark",
    "--border",
    "--theme-color",
    "--theme-label",
    "--accent-2-rgb",
    "--vignette-color",
    "--vignette-strength",
  ];
  const themes = [
    "default",
    "default-light",
    "default-dark",
    "lava-neon",
    "obsidian-teal",
    "navy-gold",
  ];

  for (const theme of themes) {
    const marker = `:root[data-theme="${theme}"]`;
    const start = css.indexOf(marker);
    assert.ok(start > -1, `no existe el bloque ${marker} en globals.css`);
    const block = css.slice(start, css.indexOf("}", start));
    for (const token of required) {
      assert.ok(
        block.includes(token),
        `el theme ${theme} no declara el token ${token}`,
      );
    }
  }
});

test("el selector de tema expone los mismos themes que el bootstrap", () => {
  const switcher = readFileSync(
    join(ROOT, "src", "components", "ThemeSwitcher.tsx"),
    "utf8",
  );
  const bootstrap = readFileSync(
    join(ROOT, "src", "app", "layout.tsx"),
    "utf8",
  );
  for (const theme of [
    "default",
    "default-light",
    "default-dark",
    "lava-neon",
    "obsidian-teal",
    "navy-gold",
  ]) {
    assert.ok(
      switcher.includes(`"${theme}"`),
      `ThemeSwitcher no ofrece el theme ${theme}`,
    );
    assert.ok(
      bootstrap.includes(`'${theme}'`),
      `el bootstrap no conoce el theme ${theme}`,
    );
  }
});
