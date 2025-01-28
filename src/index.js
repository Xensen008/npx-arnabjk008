import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { showSocialLinks } from './commands/social.js';
import { showProjects } from './commands/projects.js';
import { showcaseSpecial } from './commands/showcase.js';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const displayBanner = async () => {
    console.clear();
    const text = figlet.textSync('DevSpace', {
        font: 'ANSI Shadow',
        horizontalLayout: 'fitted',
        verticalLayout: 'default'
    });
    
    // Create a beautiful gradient effect
    const rainbowTitle = gradient(['#ff5b77', '#00ff88', '#0095ff']).multiline(text);
    console.log(rainbowTitle);
    
    // Animated tagline
    const taglines = [
        "Where Code Meets Creativity 🎨",
        "Explore • Learn • Build 🚀",
        "Welcome to the Future of Development ✨"
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
        message: chalk.yellow('🎯  What would you like to explore today?'),
        prefix: '◉',
        choices: [
            {
                name: chalk.green('📂  Innovative Projects') + chalk.dim(' - Discover amazing builds'),
                value: 'projects'
            },
            {
                name: chalk.blue('🌐  Connect & Network') + chalk.dim(' - Find me on social platforms'),
                value: 'social'
            },
            {
                name: chalk.magenta('✨  Special Features') + chalk.dim(' - Explore unique tools & resources'),
                value: 'showcase'
            },
            new inquirer.Separator(chalk.dim('─'.repeat(50))),
            {
                name: chalk.red('👋  Exit DevSpace'),
                value: 'exit'
            }
        ]
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
                console.log('\n' + gradient(['#ff5b77', '#00ff88']).multiline(
                    figlet.textSync('See You Soon!', {
                        font: 'Small',
                        horizontalLayout: 'fitted'
                    })
                ));
                console.log(chalk.cyan('\n🌟 Thank you for exploring DevSpace! Have a great day!\n'));
                process.exit(0);
        }
    }
};

export { main };