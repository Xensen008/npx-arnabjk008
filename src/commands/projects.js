import chalk from 'chalk';
import boxen from 'boxen';
import open from 'open';
import inquirer from 'inquirer';
import gradient from 'gradient-string';

const projects = [
    {
        name: 'DevSpace CLI',
        description: 'An interactive command-line portfolio and developer tools showcase',
        technologies: ['Node.js', 'ES Modules', 'Interactive CLI'],
        features: [
            'Beautiful gradient interfaces',
            'Interactive menus',
            'Project showcase',
            'Developer resources'
        ],
        github: 'https://github.com/yourusername/devspace-cli',
        demo: 'https://www.npmjs.com/package/your-package-name'
    },
    {
        name: 'Tech Hub',
        description: 'A modern platform for developers to share and discover projects',
        technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
        features: [
            'Real-time collaboration',
            'Project discovery',
            'Code sharing',
            'Developer networking'
        ],
        github: 'https://github.com/yourusername/tech-hub',
        demo: 'https://tech-hub-demo.com'
    }
];

const displayProjectHeader = () => {
    console.log(gradient(['#ff5b77', '#00ff88']).multiline('\n╭──────────── Projects Gallery ────────────╮\n'));
};

export const showProjects = async () => {
    console.clear();
    displayProjectHeader();
    
    while (true) {
        const choices = projects.map(project => ({
            name: chalk.bold(project.name) + '\n' + 
                  chalk.dim('│ ') + chalk.gray(project.description) + '\n' +
                  chalk.dim('│ ') + chalk.cyan('🛠  ') + chalk.gray(project.technologies.join(' • ')),
            value: project
        }));
        
        choices.push(new inquirer.Separator(chalk.dim('─'.repeat(50))));
        choices.push({ 
            name: chalk.yellow('↩  Back to Main Menu'),
            value: 'back'
        });

        const { selected } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: chalk.blue('🎯  Select a project to explore:'),
                pageSize: 10,
                choices
            }
        ]);

        if (selected === 'back') break;

        console.clear();
        displayProjectHeader();
        
        const projectInfo = boxen(
            `${gradient(['#ff5b77', '#00ff88']).multiline(selected.name)}\n\n` +
            `${selected.description}\n\n` +
            `${chalk.cyan('🛠  Technologies:')}\n` +
            `${selected.technologies.map(tech => chalk.gray('▸ ') + tech).join('\n')}\n\n` +
            `${chalk.cyan('✨  Key Features:')}\n` +
            `${selected.features.map(feature => chalk.gray('▸ ') + feature).join('\n')}\n\n` +
            `${chalk.cyan('🔗  Links:')}\n` +
            `${chalk.gray('▸')} GitHub: ${selected.github}\n` +
            `${chalk.gray('▸')} Demo: ${selected.demo}`,
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan',
                float: 'center'
            }
        );

        console.log(projectInfo);

        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: chalk.yellow('🎯  What would you like to do?'),
                choices: [
                    { 
                        name: chalk.blue('🔗  View Source Code') + chalk.dim(' - Open GitHub repository'),
                        value: 'github'
                    },
                    { 
                        name: chalk.green('🌐  Live Demo') + chalk.dim(' - See it in action'),
                        value: 'demo'
                    },
                    new inquirer.Separator(chalk.dim('─'.repeat(50))),
                    { 
                        name: chalk.yellow('↩  Back to Projects'),
                        value: 'back'
                    }
                ]
            }
        ]);

        if (action === 'github') {
            await open(selected.github);
            console.log(chalk.green('\n✨ Opening GitHub repository in your browser...\n'));
        } else if (action === 'demo') {
            await open(selected.demo);
            console.log(chalk.green('\n✨ Opening demo in your browser...\n'));
        }
        
        if (action !== 'back') {
            console.log(chalk.dim('\nPress any key to continue...'));
            await new Promise(resolve => process.stdin.once('data', resolve));
            console.clear();
            displayProjectHeader();
        }
    }
};