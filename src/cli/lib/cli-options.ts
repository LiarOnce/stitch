import { oneline } from "@bscotch/utility";

export default {
  force: [
    '-f --force',
    oneline`
      Bypass safety checks, including the normal requirement that the project be
      in a clean git state. Only use this option if you know what you're doing.
    `
  ],
  targetProjectPath: [
    "-t --target-project-path <path>",
    oneline`
      Path to the target Gamemaker Studio 2 project. If not set, will use the current directory.
    `
  ],
} as const;
