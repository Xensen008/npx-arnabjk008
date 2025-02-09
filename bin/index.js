#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { main } from '../src/index.js';

// Execute the main function
main().catch(console.error); 