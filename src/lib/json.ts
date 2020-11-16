
import JsonBig from "json-bigint";
import fs from "fs-extra";
import path from "path";
import { StitchError } from "./errors";
import {jsonify} from "./jsonify";
export {jsonify as stringify} from "./jsonify";

const Json = JsonBig({ useNativeBigInt: true });

/**
 * Parse JSON GMS2-style: allowing Int64s
 */
export function parse(string: string) {
  return Json.parse(string);
}

/**
 * Read GMS2-style JSON into an object
 */
export function loadFromFileSync(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Strip trailing commas before parsing as JSON
  content = content.replace(/,(\s*[}\]])/g, "$1");
  try{
    return Json.parse(content);
  }
  catch{
    throw new StitchError(`Content of ${filePath} is not valid JSON.`);
  }
}

/**
 * Write content as JSON, defaulting to GMS2-style JSON.
 * @param {boolean} [plain] If `true`, use plain JSON instead of GMS2-style.
 */
export function writeFileSync(filePath: string, stuff: any, plain=false) {
  // Only write if necessary
  fs.ensureDirSync(path.dirname(filePath));
  if(fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()){
    throw new StitchError(`Cannot write file to ${filePath}; path is a directory`);
  }
  const stringifiedStuff = plain ? JSON.stringify(stuff,null,2) : jsonify(stuff);
  try{
    const existing = fs.readFileSync(filePath,'utf8');
    if(existing == stringifiedStuff){
      return;
    }
  }
  catch(err){
    if(!['ENOENT'].includes(err?.code)){
      throw err;
    }
  }
  // The GameMaker IDE may better handle live file changes
  // when files are deleted and replaced instead of written over.
  fs.writeFileSync(filePath,stringifiedStuff); // Swap back to this if untrue
}
