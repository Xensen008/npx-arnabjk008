import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import { showSocialLinks } from './commands/social.js';
import { showProjects } from './commands/projects.js';
import { showcaseSpecial } from './commands/showcase.js';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const displayBanner = async () => {
    console.clear();
    const text = figlet.textSync('Arnab', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
    
    console.log(chalk.white(text));
    
    // Display quick links
    console.log(boxen(
        chalk.bold('🌟 Quick Links:\n\n') +
        `${chalk.dim('│')} ${chalk.cyan('GitHub:')}    ${chalk.blue('https://github.com/xensen008')}\n` +
        `${chalk.dim('│')} ${chalk.cyan('Twitter:')}   ${chalk.blue('https://twitter.com/arnabjk008')}\n` +
        `${chalk.dim('│')} ${chalk.cyan('Portfolio:')} ${chalk.blue('https://arnabjk008.dev')}`,
        {
            padding: 1,
            margin: { top: 1, bottom: 1 },
            borderStyle: 'round',
            borderColor: 'cyan',
            float: 'center'
        }
    ));
    
    // Animated tagline
    const taglines = [
        "Full Stack Developer & Open Source Enthusiast 🚀",
        "Building Beautiful & Scalable Solutions ✨",
        "Let's Explore My Digital Space! 🌟"
    ];
    
    for (const line of taglines) {
        console.log('\n' + chalk.cyan(line));
        await sleep(500);
    }
    
    console.log('\n' + chalk.dim('─'.repeat(process.stdout.columns)));
};

const questions = [
    {
        type: 'list',
        name: 'action',
        message: chalk.yellow('🎯  What would you like to explore?'),
        prefix: '◉',
        choices: [
            {
                name: chalk.green('📂  Projects') + '\n' +
                      chalk.dim('│ ') + chalk.gray('Discover my latest builds and innovations'),
                value: 'projects'
            },
            {
                name: chalk.blue('🌐  Connect') + '\n' +
                      chalk.dim('│ ') + chalk.gray('Find me across social platforms'),
                value: 'social'
            },
            {
                name: chalk.magenta('✨  Special Tools') + '\n' +
                      chalk.dim('│ ') + chalk.gray('Explore useful CLI utilities'),
                value: 'showcase'
            },
            new inquirer.Separator(chalk.dim('─'.repeat(60))),
            {
                name: chalk.red('👋  Exit'),
                value: 'exit'
            }
        ],
        pageSize: 8
    }
];

const displayFooter = async () => {
    console.log('\n' + chalk.dim('─'.repeat(process.stdout.columns)));
    console.log(chalk.dim('Pro Tip: ') + chalk.gray('Use arrow keys to navigate and Enter to select'));
};

const main = async () => {
    await displayBanner();
    
    while (true) {
        await displayFooter();
        const { action } = await inquirer.prompt(questions);
        
        console.clear();
        switch (action) {
            case 'projects':
                await showProjects();
                break;
            case 'social':
                await showSocialLinks();
                break;
            case 'showcase':
                await showcaseSpecial();
                break;
            case 'exit':
                console.log(chalk.white(
                    figlet.textSync('Bye!', { font: 'ANSI Shadow' })
                ));
                console.log(chalk.cyan('\n👋 Thanks!\n'));
                process.exit(0);
        }
    }
};

export { main };