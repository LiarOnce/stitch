import cli_assert from './cli-assert';
import { Gms2Project } from '../../lib/Gms2Project';

export type AssignCliOptions = {
  folder: string,
  groupName: string,
  targetProjectPath?: string,
  force?: boolean,
}

function normalizeAssignOptions(options: AssignCliOptions){
  let {targetProjectPath} = options;
  if (targetProjectPath){
    cli_assert.assertPathExists(targetProjectPath);
  }
  else{
    targetProjectPath = process.cwd();
  }

  return {
    folder: options.folder,
    groupName: options.groupName,
    targetProjectPath
  };
}

export function assignTextureGroups (options: AssignCliOptions){
  options = normalizeAssignOptions(options);
  const targetProject = new Gms2Project({
    projectPath: options.targetProjectPath,
    dangerouslyAllowDirtyWorkingDir: options.force
  });
  targetProject.addTextureGroupAssignment(options.folder, options.groupName);
}

export function assignAudioGroups (options: AssignCliOptions){
  options = normalizeAssignOptions(options);
  const targetProject = new Gms2Project({
    projectPath: options.targetProjectPath,
    dangerouslyAllowDirtyWorkingDir: options.force
  });
  targetProject.addAudioGroupAssignment(options.folder, options.groupName);
}