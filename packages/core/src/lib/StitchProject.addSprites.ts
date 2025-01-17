import { pathy } from '@bscotch/pathy';
import { Spritely } from '@bscotch/spritely';
import { pascalCase } from 'change-case';
import { camelCase, snakeCase } from 'lodash-es';
import { assert } from '../utility/errors.js';
import paths from '../utility/paths.js';
import type { SpriteImportOptions, StitchProject } from './StitchProject.js';

/**
 * Given a source folder that is either a sprite or a
 * a folder containing sprites (where a 'sprite' is a folder
 * containing one or more immediate child PNGs that are
 * all the same size -- nesting is allowed), add or update
 * the game project sprites using those images. project.completely
 * replaces the existing images for that sprite. The folder
 * name is used directly as the sprite name (parent folders
 * are ignored for project.)
 */
export async function addSprites(
  project: StitchProject,
  sourceFolder: string,
  options?: SpriteImportOptions,
) {
  const [sprites, spineJsonFiles] = await Promise.all([
    Spritely.from(sourceFolder, { excludeSpine: true }).then((ss) =>
      ss.filter((s) => {
        if (options?.exclude) {
          const excludeRegex = new RegExp(options?.exclude);
          if (s.name.match(excludeRegex)) {
            return false;
          }
        }
        return true;
      }),
    ),
    pathy(sourceFolder).listChildrenRecursively({
      async filter(path, siblings) {
        if (await path.isDirectory()) {
          return;
        }
        return (
          path.hasExtension('json') &&
          siblings.find((s) => s.hasExtension('atlas')) &&
          siblings.find((s) => s.hasExtension('png'))
        );
      },
      transform(path) {
        return {
          path: path.absolute,
        };
      },
    }),
  ]);
  assert(
    sprites.length || spineJsonFiles.length,
    `No sprites found in ${sourceFolder}`,
  );
  const casing = options?.case || 'keep';
  const pathSep = casing == 'keep' ? options?.pathSeparator || '_' : ' ';
  const addSpriteWaits: Promise<any>[] = [];
  for (const sprite of [...sprites, ...spineJsonFiles]) {
    const isSpine = !(sprite instanceof Spritely);
    let name = isSpine ? paths.dirname(sprite.path) : sprite.path;
    name = options?.flatten
      ? paths.relative(sourceFolder, name)
      : paths.subfolderName(name);
    name = name
      .replace(/[.\\/]/g, pathSep)
      .replace(/\s+/, pathSep)
      .trim();
    const casedName =
      (casing == 'snake' && snakeCase(name)) ||
      (casing == 'camel' && camelCase(name)) ||
      (casing == 'pascal' && pascalCase(name)) ||
      name;
    const fullName = `${options?.prefix || ''}${casedName}${
      options?.postfix || ''
    }`;
    if (!isSpine) {
      addSpriteWaits.push(
        project.resources.addSprite(sprite.path, project.io, fullName),
      );
    } else {
      addSpriteWaits.push(
        project.resources.addSpineSprite(sprite.path, project.io, fullName),
      );
    }
  }
  await Promise.all(addSpriteWaits);
  return project.save();
}
