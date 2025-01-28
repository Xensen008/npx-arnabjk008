import chalk from 'chalk';
import boxen from 'boxen';
import open from 'open';
import inquirer from 'inquirer';

const projects = [ //demo projects for now
    {
        name: 'Project 1',
        description: 'A cool project that does amazing things',
        technologies: ['Node.js', 'React', 'MongoDB'],
        github: 'https://github.com/arnabjk008/project1',
        demo: 'https://project1.demo.com'
    },
    {
        name: 'Project 2',
        description: 'Another awesome project with great features',
        technologies: ['Python', 'Django', 'PostgreSQL'],
        github: 'https://github.com/arnabjk008/project2',
        demo: 'https://project2.demo.com'
    }
    // Add more projects here
];

export const showProjects = async () => {
    console.clear();
    
    while (true) {
        const choices = projects.map(project => ({
            name: `${project.name} - ${chalk.gray(project.description)}`,
            value: project
        }));
        choices.push({ name: '↩️ Back to main menu', value: 'back' });

        const { selected } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message: '📂 Select a project to learn more:',
                choices
            }
        ]);

        if (selected === 'back') break;

        console.clear();
        const projectInfo = boxen(
            `${chalk.bold(selected.name)}\n\n` +
            `${selected.description}\n\n` +
            `${chalk.cyan('Technologies:')} ${selected.technologies.join(', ')}\n\n` +
            `${chalk.cyan('Links:')}\n` +
            `GitHub: ${selected.github}\n` +
            `Demo: ${selected.demo}`,
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green'
            }
        );

        console.log(projectInfo);

        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    { name: '🔗 Open GitHub', value: 'github' },
                    { name: '🌐 Open Demo', value: 'demo' },
                    { name: '↩️ Back to projects', value: 'back' }
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
    }
};