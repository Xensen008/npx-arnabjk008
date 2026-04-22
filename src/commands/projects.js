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
        github: 'https://github.com/xensen008/npx-arnabjk008',
        demo: 'https://www.npmjs.com/package/arnabjk008'
    },
    {
        name: 'Quietly',
        description: 'A modern anon feedback plateform',
        technologies: ['Nextjs', 'React', 'MongoDB', 'shadcn'],
        features: [
            'Real-time feedback',
            'Project review',
            'Secreat sharing',
            'Not gonna lie'
        ],
        github: 'https://github.com/xensen008/quietly',
        demo: 'https://quietly.vercel.app'
    },
    {
        name: 'Pixifyit',
        description: 'A modern Social media plateform',
        technologies: ['MERN', 'React', 'Muatation and queries', 'shadcn','appwrite'],
        features: [
            'follow and followers',
            'infinite loading',
            'Best looking UI',
            'responsive in all device'
        ],
        github: 'https://github.com/xensen008/Pixify',
        demo: 'https://quietly.vercel.app'
    }
];

const displayProjectHeader = () => {
    console.log(gradient(['#ff5b77', '#00ff88']).multiline('\n╭──────────── Projects Gallery ────────────╮\n'));
};

const handleContinue = () => {
    return new Promise(resolve => {
        const cleanup = () => {
            process.stdin.removeAllListeners('data');
            process.stdin.pause();
        };

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.once('data', () => {
            cleanup();
            resolve();
        });
    });
};

export const showProjects = async () => {
    while (true) {
        console.clear();
        displayProjectHeader();
        
        const choices = projects.map(project => ({
            name: chalk.bold(project.name) + chalk.white(' - ') + chalk.white(project.description),
            value: project
        }));
        
        choices.push({
            name: chalk.bold('View More') + chalk.white(' - More on GitHub'),
            value: 'more'
        });
        
        choices.push(new inquirer.Separator(chalk.dim('─'.repeat(30))));
        choices.push({ 
            name: chalk.yellow('Back'),
            value: 'back'
        });

        const { selected } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: chalk.blue('Select:'),
                pageSize: 10,
                choices
            }
        ]);

        if (selected === 'back') {
            break;
        }
        
        if (selected === 'more') {
            await open('https://github.com/xensen008?tab=repositories');
            console.log(chalk.green('\nOpening GitHub...\n'));
            console.log(chalk.dim('\nPress Enter to continue...'));
            await handleContinue();
            continue;
        }
        
        console.clear();
        displayProjectHeader();
        
        const projectInfo = boxen(
            `${chalk.bold(selected.name)}\n\n` +
            `${selected.description}\n\n` +
            `Tech: ${selected.technologies.join(', ')}\n\n` +
            `Link: ${selected.github}`,
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
                message: chalk.yellow('Select:'),
                choices: [
                    { name: chalk.blue('View Source'), value: 'github' },
                    { name: chalk.green('View Demo'), value: 'demo' },
                    new inquirer.Separator(chalk.dim('─'.repeat(30))),
                    { name: chalk.yellow('Back'), value: 'back' }
                ]
            }
        ]);

        if (action === 'github') {
            await open(selected.github);
            console.log(chalk.green('\nOpening...\n'));
            console.log(chalk.dim('\nPress Enter to continue...'));
            await handleContinue();
        } else if (action === 'demo') {
            await open(selected.demo);
            console.log(chalk.green('\nOpening...\n'));
            console.log(chalk.dim('\nPress any key to continue...'));
            await handleContinue();
        }
    }
};