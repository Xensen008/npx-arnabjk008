import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { showSocialLinks } from './commands/social.js';
import { showProjects } from './commands/projects.js';
import { showcaseSpecial } from './commands/showcase.js';

const displayBanner = () => {
    console.clear();
    const msg = figlet.textSync('Arnab JK', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
    console.log(gradient.pastel.multiline(msg));
    console.log('\n' + chalk.cyan('A passionate developer who loves to build cool stuff!\n'));
};

const questions = [
    {
        type: 'list',
        name: 'action',
        message: '🚀 What would you like to explore?',
        choices: [
            {
                name: '📂 View my Projects',
                value: 'projects'
            },
            {
                name: '🌐 Check my Social Links',
                value: 'social'
            },
            {
                name: '✨ Special Showcase',
                value: 'showcase'
            },
            {
                name: '👋 Exit',
                value: 'exit'
            }
        ]
    }
];

const main = async () => {
    displayBanner();
    
    while (true) {
        const { action } = await inquirer.prompt(questions);
        
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
                console.log(chalk.yellow('\nThanks for visiting! Have a great day! 👋\n'));
                process.exit(0);
        }
    }
};

export { main };