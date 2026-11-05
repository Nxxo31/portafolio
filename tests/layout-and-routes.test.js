import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

// ------------------------------------------------- root layout único (hydration)

test("solo el root layout emite <html> y <body>", () => {
  const rootLayout = readFileSync(
    join(ROOT, "src", "app", "layout.tsx"),
    "utf8",
  );
  assert.match(rootLayout, /<html lang=\{locale\}/);
  assert.match(rootLayout, /<body className=/);

  // El layout de locale es un layout anidado: si emite html/body, el parser
  // HTML fusiona los atributos del body anidado con el externo y React
  // hidrata contra un arbol distinto -> "A tree hydrated but some attributes
  // ... didn't match".
  const localeLayout = readFileSync(
    join(ROOT, "src", "app", "[locale]", "layout.tsx"),
    "utf8",
  );
  // Los comentarios mencionan <html>/<body> al explicar el fix: se excluyen.
  const code = localeLayout
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  assert.ok(
    !/<html[\s>]/.test(code),
    "src/app/[locale]/layout.tsx no debe emitir <html>",
  );
  assert.ok(
    !/<body[\s>]/.test(code),
    "src/app/[locale]/layout.tsx no debe emitir <body>",
  );
});

test("las variables de fuente viven en el body del root layout", () => {
  const rootLayout = readFileSync(
    join(ROOT, "src", "app", "layout.tsx"),
    "utf8",
  );
  assert.match(rootLayout, /spaceGrotesk\.variable/);
  assert.match(rootLayout, /jetbrainsMono\.variable/);
});

// --------------------------------------------------------- enlaces con locale

test("los enlaces internos preservan el prefijo de locale", () => {
  const targets = [
    join(ROOT, "src", "app", "[locale]", "blog", "page.tsx"),
    join(ROOT, "src", "app", "[locale]", "blog", "[slug]", "page.tsx"),
    join(ROOT, "src", "app", "[locale]", "resume", "page.tsx"),
    join(ROOT, "src", "app", "[locale]", "projects", "[slug]", "page.tsx"),
    join(ROOT, "src", "app", "[locale]", "projects", "page.tsx"),
  ];

  const offenders = [];
  for (const file of targets) {
    const src = readFileSync(file, "utf8");
    for (const line of src.split(/\r?\n/)) {
      const match = line.match(/href=["'](\/[^"'{]*)["']/);
      if (!match) continue;
      const href = match[1];
      // Las rutas de API son absolutas por diseño y no llevan locale.
      if (href.startsWith("/api/")) continue;
      offenders.push(`${relative(ROOT, file)} -> ${href}`);
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `enlaces sin prefijo de locale:\n${offenders.join("\n")}`,
  );
});

// ------------------------------------------------------------ rutas del sitio

test("existe la pagina indice de proyectos que enlaza la home", () => {
  assert.ok(
    existsSync(join(ROOT, "src", "app", "[locale]", "projects", "page.tsx")),
    "falta src/app/[locale]/projects/page.tsx (la CTA 'ver todos' daba 404)",
  );
});

test("la CTA de la home apunta a la pagina de proyectos", () => {
  const projects = readFileSync(
    join(ROOT, "src", "sections", "Projects.tsx"),
    "utf8",
  );
  assert.match(
    projects,
    /href=\{`\/\$\{locale\}\/projects`\}/,
    "Projects.tsx no enlaza a /{locale}/projects",
  );
});

// ------------------------------------------------------------ assets referidos

test("las imagenes referenciadas por los proyectos existen en /public", () => {
  const data = readFileSync(join(ROOT, "src", "content", "data.ts"), "utf8");
  const images = [...data.matchAll(/image:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.ok(images.length > 0, "no se encontro ninguna imagen en data.ts");
  for (const image of images) {
    assert.ok(
      existsSync(join(ROOT, "public", image.replace(/^\//, ""))),
      `la imagen ${image} no existe en public/`,
    );
  }
});

test("la galeria del proyecto multra-eu apunta a archivos existentes", () => {
  const page = readFileSync(
    join(ROOT, "src", "app", "[locale]", "projects", "[slug]", "page.tsx"),
    "utf8",
  );
  const paths = [...page.matchAll(/src:\s*"(\/img\/[^"]+)"/g)].map((m) => m[1]);
  for (const p of paths) {
    assert.ok(
      existsSync(join(ROOT, "public", p.replace(/^\//, ""))),
      `la imagen de galeria ${p} no existe en public/`,
    );
  }
});
