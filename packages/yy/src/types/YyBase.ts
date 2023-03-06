// Generated by ts-to-zod
import { z } from 'zod';
import { unstable } from './utility.js';

export type YyBase = z.infer<typeof yyBaseSchema>;
export const yyBaseSchema = unstable({
  ConfigValues: z.record(z.record(z.string())).optional(),
  name: z.string(),
  resourceType: z.string(),
  tags: z.array(z.string()).optional(),
  /**
   * Parent folder
   */
  parent: z
    .object({
      /** Folder's 'name' field */
      name: z.string(),
      /** Folder's 'folderPath' field */
      path: z.string(),
    })
    .default({ name: 'NEW', path: 'folders/NEW.yy' }),
  resourceVersion: z.string().default('1.0'),
});

export type YyResourceType = typeof yyResourceTypes[number];
export const yyResourceTypes = [
  'animcurves',
  'extensions',
  'fonts',
  'notes',
  'objects',
  'paths',
  'rooms',
  'scripts',
  'sequences',
  'shaders',
  'sounds',
  'sprites',
  'tilesets',
  'timelines',
] as const;
