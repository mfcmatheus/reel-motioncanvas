import { makeProject } from "@motion-canvas/core";

import intro from "./scenes/intro?scene";
import audio from "../audio/audio.wav";
import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { parser } from "@lezer/javascript";
import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const myTheme = HighlightStyle.define([
  { tag: t.keyword, color: "#ff79c6" },
  { tag: [t.name, t.deleted, t.propertyName, t.macroName], color: "#79c0ff" },
  { tag: [t.variableName], color: "#58a6ff" },
  { tag: [t.function(t.variableName)], color: "#79c0ff" },
  { tag: [t.labelName], color: "#56d364" },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: "#8b949e" },
  { tag: [t.definition(t.name), t.separator], color: "#56d364" },
  { tag: [t.brace], color: "#79c0ff" },
  { tag: [t.annotation], color: "#ff7b72" },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: "#ffa657",
  },
  { tag: [t.typeName, t.className], color: "#ffdf5d" },
  { tag: [t.operator, t.operatorKeyword], color: "#8b949e" },
  { tag: [t.tagName], color: "#bc8cff" },
  { tag: [t.squareBracket, t.angleBracket, t.attributeName], color: "#79c0ff" },
  { tag: [t.regexp], color: "#56d364" },
  { tag: [t.quote], color: "#bc8cff" },
  { tag: [t.string], color: "#56d364" },
  {
    tag: t.link,
    color: "#58a6ff",
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
  { tag: [t.url, t.escape, t.special(t.string)], color: "#58a6ff" },
  { tag: [t.meta], color: "#ff7b72" },
  { tag: [t.monospace], color: "#8b949e", fontStyle: "italic" },
  { tag: [t.comment], color: "#8b949e", fontStyle: "italic" },
  // strong, emphasis, etc. seguem tons secundários
]);

Code.defaultHighlighter = new LezerHighlighter(
  parser.configure({
    dialect: "tsx ts jsx",
  })
);

export default makeProject({
  scenes: [intro],
  audio,
});
