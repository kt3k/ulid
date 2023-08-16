import { parse } from "https://deno.land/std@0.198.0/flags/mod.ts";
import { ulid } from "./mod.ts";

const { args } = Deno;
const parsed = parse(args);
let timestamp: number | undefined = undefined;
let help = false;
let batch = 1;
const helpmsg = `
  Usage: ulid

  Options:
    -h, --help:                       displays a help message
    -t, --time:       <t:number>      seed a given timestamp      
    -n, --number:     <n:number>      generate n amount of ULIDs
`;

for (const flag of Object.keys(parsed)) {
  switch (flag) {
    case "_":
      break;
    case "h":
    case "help":
      help = true;
      break;
    case "t":
      if (typeof parsed["t"] === "number") timestamp = parsed["t"];
      else help = true;
      break;
    case "time":
      if (typeof parsed["time"] === "number") timestamp = parsed["time"];
      else help = true;
      break;
    case "n":
      if (typeof parsed["n"] === "number") batch = parsed["n"];
      else help = true;
      break;
    case "number":
      if (typeof parsed["number"] === "number") batch = parsed["number"];
      else help = true;
      break;
    default:
      console.log("Unknown flag provided.");
      help = true;
  }
}

if (!help) {
  while (batch) {
    console.log(ulid(timestamp));
    batch--;
  }
} else {
  console.log(helpmsg);
}
