// Generated by ts-to-zod
import { z } from 'zod';
import { bigNumber } from './utility.js';

/**
 * @file Typings for components of a freshly-parsed YYP file,
 * when it is stored as a collection of plain objects.
 * See {@link ./Gms2ProjectComponents.ts} for typings related
 * to when the vanilla content has been replaced with class
 * instances.
 */
export type YypResourceId = z.infer<typeof yypResourceIdSchema>;
export const yypResourceIdSchema = z.object({
  name: z.string(),
  path: z.string(),
});

/** A 'Resource' is a an asset like a sprite, object, script, and so on. */
export type YypResource = z.infer<typeof yypResourceSchema>;
const yypResourceSchema = z.object({
  id: yypResourceIdSchema,
  order: z.number().default(0),
});

export type YypOption = z.infer<typeof yypOptionSchema>;
const yypOptionSchema = z.object({
  ConfigValues: z.record(z.record(z.string())).optional(),
  name: z.string(),
  path: z.string(),
});

export interface YypConfig {
  name: string;
  children: YypConfig[];
}
const yypConfigSchema: z.ZodSchema<YypConfig> = z.lazy(() =>
  z.object({
    name: z.string(),
    children: z.array(yypConfigSchema),
  }),
);

export type YypRoomOrderNode = z.infer<typeof yypRoomOrderNodeSchema>;
const yypRoomOrderNodeSchema = z.object({
  roomId: z.object({
    name: z.string(),
    /** rooms/{name}/{name}.yy */
    path: z.string(),
  }),
});

export type YypFolder = z.infer<typeof yypFolderSchema>;
const yypFolderSchema = z.object({
  name: z.string(),
  tags: z.array(z.string()).optional(),
  folderPath: z.string(),
  order: z.number().default(1),
  resourceType: z.literal('GMFolder').default('GMFolder'),
  resourceVersion: z.literal('1.0').default('1.0'),
});

export type YypAudioGroup = z.infer<typeof yypAudioGroupSchema>;
export type YypAudioGroupLoose = z.input<typeof yypAudioGroupSchema>;
export const yypAudioGroupSchema = z.object({
  ConfigValues: z.record(z.record(z.string())).optional(),
  name: z.string(),
  targets: bigNumber().default(461609314234257646n),
  resourceType: z.literal('GMAudioGroup').default('GMAudioGroup'),
  resourceVersion: z.literal('1.3').default('1.3'),
});

export type YypTextureGroup = z.infer<typeof yypTextureGroupSchema>;
export const yypTextureGroupSchema = z.object({
  ConfigValues: z.record(z.record(z.string())).optional(),
  name: z.string(),
  groupParent: z
    .object({
      name: z.string(),
      path: z.string(),
    })
    .nullable()
    .default(null),
  isScaled: z.boolean().default(true),
  compressFormat: z.string().optional(),
  autocrop: z.boolean().default(true),
  border: z.number().default(2),
  mipsToGenerate: z.number().default(0),
  targets: bigNumber().default(-1n),
  loadType: z.enum(['default', 'dynamicpages']).optional(),
  directory: z.string().optional(),
  resourceType: z.literal('GMTextureGroup').default('GMTextureGroup'),
  resourceVersion: z.literal('1.3').default('1.3'),
});

export type YypIncludedFile = z.infer<typeof yypIncludedFileSchema>;
const yypIncludedFileSchema = z.object({
  ConfigValues: z
    .record(
      z.object({
        CopyToMask: z.string(),
      }),
    )
    .optional(),
  /** The name of the file, including extension, without the path */
  name: z.string(),
  CopyToMask: bigNumber().default(-1),
  /** `datafiles/${subdir}` */
  filePath: z.string(),
  resourceType: z.literal('GMIncludedFile').default('GMIncludedFile'),
  resourceVersion: z.literal('1.0').default('1.0'),
});

/** The YYP content that has not changed across GMS2.3 subversions */
export type Yyp = z.infer<typeof yypSchema>;
export const yypSchema = z.object({
  name: z.string(),
  resourceType: z.literal('GMProject').default('GMProject'),
  resources: z.array(yypResourceSchema).default([]),
  RoomOrderNodes: z.array(yypRoomOrderNodeSchema).default([]),
  Options: z.array(yypOptionSchema).default([]),
  isDnDProject: z.boolean().optional(),
  defaultScriptType: z.number().default(1),
  isEcma: z.boolean().default(false),
  tutorialPath: z.string().optional(),
  configs: z.object({
    name: z.literal('Default').default('Default'),
    children: z.array(yypConfigSchema).default([]),
  }),
  Folders: z.array(yypFolderSchema).default([]),
  AudioGroups: z.array(yypAudioGroupSchema).default([]),
  TextureGroups: z.array(yypTextureGroupSchema).default([]),
  IncludedFiles: z.array(yypIncludedFileSchema).default([]),
  MetaData: z.object({
    IDEVersion: z.string(),
  }),
  resourceVersion: z.string(),
  tags: z.array(z.string()).optional(),
});