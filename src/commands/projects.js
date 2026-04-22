import chalk from 'chalk';
import boxen from 'boxen';
import open from 'open';
import inquirer from 'inquirer';
import gradient from 'gradient-string';

const projects = [
    {
        name: 'Metly',
        type: 'Web · Meeting',
        description: 'A Meeting platform for college students and professionals who need seamless meeting experience',
        technologies: ['Nextjs', 'GenAI', 'Typescript'],
        features: [
            'Meetings schedules',
            'personal rooms and recoding',
            'Join or create meetings',
            'github, google and email base oauth'
        ],
        github: 'https://github.com/xensen008/metly',
        demo: 'https://metly.arnabjk008.dev'
    },
    {
        name: 'Quietly',
        type: 'Web App · Feedback',
        description: 'A modern anonymous feedback platform',
        technologies: ['Nextjs', 'React', 'MongoDB', 'shadcn'],
        features: [
            'Real-time feedback',
            'Project review',
            'Secret sharing',
            'Anonymous posts'
        ],
        github: 'https://github.com/xensen008/quietly',
        demo: 'https://quietly.vercel.app'
    },
    {
        name: 'Pixifyit',
        type: 'Web App · Social',
        description: 'A modern social media platform',
        technologies: ['MERN', 'React', 'Mutation and queries', 'shadcn', 'appwrite'],
        features: [
            'Follow and followers',
            'Infinite loading',
            'Best looking UI',
            'Responsive in all devices'
        ],
        github: 'https://github.com/xensen008/Pixify',
        demo: 'https://pixify.vercel.app'
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
            name: project.name + (project.type ? ' [' + project.type + ']' : ''),
            value: project
        }));
        
        choices.push({ name: 'View All on GitHub', value: 'more' });
        choices.push({ name: 'Back', value: 'back' });
        
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
        
        const projectDesc = selected.type 
            ? `${selected.name} [${selected.type}]\n\n${selected.description}\n\nTech: ${selected.technologies.join(', ')}`
            : `${selected.name}\n\n${selected.description}\n\nTech: ${selected.technologies.join(', ')}`;
        
        const projectInfo = boxen(projectDesc, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan',
            float: 'center'
        });
        
        console.log(projectInfo);
        
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: chalk.yellow('Select:'),
                choices: [
                    { name: 'View Source', value: 'github' },
                    { name: 'View Demo', value: 'demo' },
                    { name: 'Back', value: 'back' }
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