import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

const SPEED_COMMAND = {
    name: "speedtest",
    description: "run a speed test at the house",
    type: 1
};

const ALL_COMMANDS = [TEST_COMMAND, SPEED_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);