// src/commands/showcase.js

import chalk from 'chalk';
import gradient from 'gradient-string';
import boxen from 'boxen';
import inquirer from 'inquirer';

const tools = [
    {
        name: 'Code Generator',
        description: 'Generate boilerplate code for various frameworks',
        command: 'generate',
        options: ['React Component', 'API Endpoint', 'Database Model']
    },
    {
        name: 'Dev Utils',
        description: 'Helpful utilities for developers',
        command: 'utils',
        options: ['JSON Formatter', 'URL Encoder/Decoder', 'Base64 Tools']
    },
    {
        name: 'Project Stats',
        description: 'View interesting statistics about your projects',
        command: 'stats',
        options: ['Contribution Graph', 'Language Usage', 'Activity Timeline']
    }
];

const achievements = [
    {
        title: 'Open Source Champion',
        description: 'Active contributor to the developer community',
        stats: {
            'Projects': '15+',
            'Contributions': '500+',
            'Stars Earned': '1000+'
        },
        icon: '🏆'
    },
    {
        title: 'Tech Explorer',
        description: 'Always learning and exploring new technologies',
        stats: {
            'Technologies': '20+',
            'Certifications': '8+',
            'Blog Posts': '50+'
        },
        icon: '🚀'
    },
    {
        title: 'Community Builder',
        description: 'Building and nurturing developer communities',
        stats: {
            'Events Organized': '10+',
            'Mentees': '25+',
            'Workshops': '15+'
        },
        icon: '🌟'
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

const displayTool = (tool) => {
    return boxen(
        `${chalk.bold('🛠  ' + tool.name)}\n` +
        `${chalk.gray(tool.description)}\n\n` +
        `${chalk.cyan('Available Options:')}\n` +
        tool.options.map(opt => `${chalk.gray('▸')} ${opt}`).join('\n'),
        {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green',
            float: 'center'
        }
    );
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
                        name: chalk.green('🛠  Developer Tools') + chalk.dim(' - Explore useful utilities'),
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
        } else if (section === 'tools') {
            console.clear();
            displayShowcaseHeader();
            tools.forEach(tool => {
                console.log(displayTool(tool));
            });
        }

        console.log(chalk.dim('\nPress any key to continue...'));
        await new Promise(resolve => process.stdin.once('data', resolve));
    }
};