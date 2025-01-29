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
            }
        ]
    }
];

const achievements = [
    {
        title: 'Full Stack Developer',
        description: 'Passionate about building end-to-end applications',
        stats: {
            'Frontend': 'React, Next.js, TailwindCSS',
            'Backend': 'Node.js, Express, MongoDB',
            'DevOps': 'Docker, Git, CI/CD'
        },
        icon: '🚀'
    },
    {
        title: 'Open Source Contributor',
        description: 'Active member of the open source community',
        stats: {
            'Repositories': '10+',
            'Pull Requests': '30+',
            'Stars': '100+'
        },
        icon: '⭐'
    },
    {
        title: 'Tech Enthusiast',
        description: 'Always exploring new technologies',
        stats: {
            'Languages': 'JavaScript, Python, Java',
            'Frameworks': '8+',
            'Projects': '15+'
        },
        icon: '💻'
    }
];

const displayShowcaseHeader = () => {
    console.log(gradient(['#ff5b77', '#0095ff', '#00ff88']).multiline(`
╭───────────────────────────────────╮
│        Developer Showcase         │
╰───────────────────────────────────╯
`));
};

const displayAchievement = (achievement) => {
    return boxen(
        `${chalk.bold(achievement.icon + '  ' + achievement.title)}\n` +
        `${chalk.gray(achievement.description)}\n\n` +
        Object.entries(achievement.stats)
            .map(([key, value]) => `${chalk.cyan(key)}: ${chalk.yellow(value)}`)
            .join('\n'),
        {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'magenta',
            float: 'center'
        }
    );
};

const runCommand = async (command) => {
    try {
        console.clear();
        console.log(chalk.cyan('\n🔄 Running command: ') + chalk.yellow(command.cmd) + '\n');
        const { stdout, stderr } = await execAsync(command.cmd);
        if (stderr) console.log(chalk.red(stderr));
        console.log(chalk.white(stdout));
    } catch (error) {
        console.log(chalk.red('\n❌ Error executing command:'), error.message);
    }
};

const displayTool = async (tool) => {
    console.clear();
    displayShowcaseHeader();
    
    console.log(boxen(
        `${chalk.bold('🛠  ' + tool.name)}\n` +
        chalk.gray(tool.description),
        {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
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
                    name: chalk.green(opt.name) + chalk.dim(` - ${opt.description}`),
                    value: opt
                })),
                new inquirer.Separator(chalk.dim('─'.repeat(50))),
                {
                    name: chalk.yellow('↩  Back to Tools'),
                    value: 'back'
                }
            ]
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

        const { section } = await inquirer.prompt([
            {
                type: 'list',
                name: 'section',
                message: chalk.yellow('🎯  What would you like to explore?'),
                choices: [
                    {
                        name: chalk.magenta('🏆  Achievements') + chalk.dim(' - View milestones and recognition'),
                        value: 'achievements'
                    },
                    {
                        name: chalk.green('🛠  CLI Tools') + chalk.dim(' - Useful developer utilities'),
                        value: 'tools'
                    },
                    new inquirer.Separator(chalk.dim('─'.repeat(50))),
                    {
                        name: chalk.yellow('↩  Back to Main Menu'),
                        value: 'back'
                    }
                ]
            }
        ]);

        if (section === 'back') break;

        if (section === 'achievements') {
            console.clear();
            displayShowcaseHeader();
            achievements.forEach(achievement => {
                console.log(displayAchievement(achievement));
            });
            
            console.log(chalk.dim('\nPress Enter to continue...'));
            await new Promise(resolve => {
                process.stdin.once('data', () => {
                    process.stdin.setRawMode(false);
                    resolve();
                });
                process.stdin.setRawMode(true);
                process.stdin.resume();
            });
        } else if (section === 'tools') {
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
                                name: chalk.green(`🛠  ${tool.name}`) + chalk.dim(` - ${tool.description}`),
                                value: tool
                            })),
                            new inquirer.Separator(chalk.dim('─'.repeat(50))),
                            {
                                name: chalk.yellow('↩  Back to Showcase'),
                                value: 'back'
                            }
                        ]
                    }
                ]);

                if (selectedTool === 'back') break;
                await displayTool(selectedTool);
            }
        }
    }
};
