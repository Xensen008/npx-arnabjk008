// src/commands/showcase.js

import chalk from 'chalk';
import gradient from 'gradient-string';
import boxen from 'boxen';
import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const tools = [
    {
        name: 'Git Helper',
        description: 'Quick git commands and utilities',
        command: 'git',
        options: [
            {
                name: 'Status Check',
                cmd: 'git status',
                description: 'Check git repository status'
            },
            {
                name: 'Recent Commits',
                cmd: 'git log --oneline -n 5',
                description: 'View last 5 commits'
            },
            {
                name: 'Branch List',
                cmd: 'git branch -a',
                description: 'List all branches'
            },
            {
                name: 'Remote Info',
                cmd: 'git remote -v',
                description: 'Show remote repository details'
            }
        ]
    },
    {
        name: 'System Info',
        description: 'View system information and resources',
        command: 'system',
        options: [
            {
                name: 'Memory Usage',
                cmd: process.platform === 'win32' ? 'wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Value' : 'free -h',
                description: 'Check system memory status'
            },
            {
                name: 'Disk Space',
                cmd: process.platform === 'win32' ? 'wmic logicaldisk get size,freespace,caption' : 'df -h',
                description: 'View disk space usage'
            },
            {
                name: 'CPU Info',
                cmd: process.platform === 'win32' ? 'wmic cpu get caption,name,numberofcores' : 'lscpu',
                description: 'Display CPU information'
            },
            {
                name: 'System Version',
                cmd: process.platform === 'win32' ? 'ver' : 'uname -a',
                description: 'Show OS version details'
            }
        ]
    },
    {
        name: 'Network Tools',
        description: 'Network utilities and diagnostics',
        command: 'network',
        options: [
            {
                name: 'IP Info',
                cmd: process.platform === 'win32' ? 'ipconfig' : 'ifconfig',
                description: 'View network interface details'
            },
            {
                name: 'DNS Check',
                cmd: 'nslookup google.com',
                description: 'Test DNS resolution'
            },
            {
                name: 'Internet Speed',
                cmd: 'ping -n 4 8.8.8.8',
                description: 'Quick internet speed test'
            },
            {
                name: 'Port Scanner',
                cmd: process.platform === 'win32' ? 'netstat -an' : 'netstat -tuln',
                description: 'View open ports'
            },
            {
                name: 'Network Routes',
                cmd: process.platform === 'win32' ? 'route print' : 'netstat -r',
                description: 'Display routing table'
            }
        ]
    },
    {
        name: 'Development Tools',
        description: 'Useful utilities for developers',
        command: 'dev',
        options: [
            {
                name: 'Node Version',
                cmd: 'node -v',
                description: 'Check Node.js version'
            },
            {
                name: 'NPM Dependencies',
                cmd: 'npm list --depth=0',
                description: 'View installed packages'
            },
            {
                name: 'Environment',
                cmd: 'printenv',
                description: 'List environment variables'
            },
            {
                name: 'Docker Check',
                cmd: 'docker version',
                description: 'Check Docker installation'
            }
        ]
    }
];

const displayShowcaseHeader = () => {
    console.log(gradient(['#ff5b77', '#0095ff', '#00ff88']).multiline(`
╭───────────────────────────────────────────╮
│           Developer Tools                 │
│        Your CLI Swiss Army Knife          │
╰───────────────────────────────────────────╯
`));
};

const formatCommandOutput = (output) => {
    // Split output into lines
    const lines = output.split('\n');
    
    // Format based on common patterns
    return lines.map(line => {
        // Git status coloring
        if (line.includes('modified:')) return chalk.red(line);
        if (line.includes('new file:')) return chalk.green(line);
        if (line.includes('deleted:')) return chalk.yellow(line);
        
        // Version numbers
        if (line.match(/v\d+\.\d+\.\d+/)) return chalk.cyan(line);
        
        // IP addresses
        if (line.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) return chalk.yellow(line);
        
        // Memory/Disk values
        if (line.match(/\d+[KMG]B/i)) return chalk.green(line);
        
        // Default formatting for other lines
        return chalk.white(line);
    }).join('\n');
};

const getErrorMessage = (command, error) => {
    const errorMap = {
        'docker': 'Docker is not installed. Please install Docker to use this feature.',
        'npm': 'NPM command failed. Please ensure you are in a Node.js project directory.',
        'git': 'Git command failed. Please ensure you are in a git repository.',
        'default': 'Command execution failed. Please check if the required tool is installed.'
    };

    // Check which command type failed
    for (const [cmd, msg] of Object.entries(errorMap)) {
        if (command.cmd.startsWith(cmd)) {
            return msg;
        }
    }
    return errorMap.default;
};

const runCommand = async (command) => {
    try {
        console.clear();
        console.log(chalk.cyan('\n🔄 Running command: ') + chalk.yellow(command.cmd) + '\n');
        const { stdout, stderr } = await execAsync(command.cmd);
        
        if (stderr) {
            console.log(chalk.red('\n⚠️  Warning:'));
            console.log(chalk.gray(stderr));
        }
        
        if (stdout) {
            console.log(formatCommandOutput(stdout));
        } else {
            console.log(chalk.yellow('No output received from command.'));
        }
    } catch (error) {
        console.log(chalk.red('\n❌ Error:'));
        console.log(chalk.yellow(getErrorMessage(command, error)));
        console.log(chalk.dim('\nDetails: ' + error.message));
    }
};

const displayTool = async (tool) => {
    console.clear();
    displayShowcaseHeader();
    
    console.log(boxen(
        `${chalk.bold('🛠  ' + tool.name)}\n` +
        chalk.gray(tool.description) + '\n\n' +
        chalk.cyan('Available Commands:'),
        {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'green',
            float: 'center'
        }
    ));

    const { option } = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: chalk.yellow('🎯  Select a command to run:'),
            choices: [
                ...tool.options.map(opt => ({
                    name: chalk.green(opt.name) + '\n' + 
                          chalk.dim('│ ') + chalk.gray(opt.description),
                    value: opt
                })),
                new inquirer.Separator(chalk.dim('─'.repeat(60))),
                {
                    name: chalk.yellow('↩  Back to Tools'),
                    value: 'back'
                }
            ],
            pageSize: 12
        }
    ]);

    if (option !== 'back') {
        await runCommand(option);
        console.log(chalk.dim('\nPress Enter to continue...'));
        await new Promise(resolve => {
            process.stdin.once('data', () => {
                process.stdin.setRawMode(false);
                resolve();
            });
            process.stdin.setRawMode(true);
            process.stdin.resume();
        });
    }
};

export const showcaseSpecial = async () => {
    while (true) {
        console.clear();
        displayShowcaseHeader();
        
        const { selectedTool } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedTool',
                message: chalk.yellow('🎯  Select a tool category:'),
                choices: [
                    ...tools.map(tool => ({
                        name: chalk.green(`🛠  ${tool.name}`) + '\n' +
                              chalk.dim('│ ') + chalk.gray(tool.description),
                        value: tool
                    })),
                    new inquirer.Separator(chalk.dim('─'.repeat(60))),
                    {
                        name: chalk.yellow('↩  Back to Main Menu'),
                        value: 'back'
                    }
                ],
                pageSize: 8
            }
        ]);

        if (selectedTool === 'back') break;
        await displayTool(selectedTool);
    }
};
