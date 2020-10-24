import { StringBuildInFunctions } from './stringFunctions';
import { NumberBuildInFunctions } from './numberFunctions';
import { ConsoleBuildInFunctions } from "./consoleFunctions";

export const BuildInFunctions = {
  ...StringBuildInFunctions,
  ...NumberBuildInFunctions,
  ...ConsoleBuildInFunctions,
};
