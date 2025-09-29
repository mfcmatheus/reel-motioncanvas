import { makeProject } from "@motion-canvas/core";


import intro from "./scenes/intro?scene";
import second from "./scenes/second?scene";
import audio from "../audio/audio.mp3";
import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { parser } from "@lezer/javascript";
import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";


const myTheme = HighlightStyle.define([
  { tag: [t.keyword, t.bracket], color: "#dd85f7" },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "#619fef" },
  { tag: [t.variableName], color: "#e6e6e6" },
  { tag: t.string, color: "#cfffac" },
  { tag: t.operator, color: "#73efff" },
  { tag: [t.punctuation, t.comment, t.separator], color: "#424347", fontStyle: "italic" },
  { tag: t.typeName, color: "#ffc780" },
]);

Code.defaultHighlighter = new LezerHighlighter(
  parser.configure({
    dialect: "tsx ts jsx",
  }),
  myTheme
);

export default makeProject({
  scenes: [intro, second],
  audio
});
