import chalk from 'chalk';
// import boxen from 'boxen';
import open from 'open';
import inquirer from 'inquirer';

const socialLinks = {
    GitHub: 'https://github.com/xensen008',
    Twitter: 'https://twitter.com/arnabjk008',
    LinkedIn: 'https://linkedin.com/in/arnabjk008',
    Portfolio: 'https://arnabjk008.tech'
};

export const showSocialLinks = async () => {
    console.clear();
    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
        title: '🔗 Social Links'
    };

    const choices = Object.entries(socialLinks).map(([platform, url]) => ({
        name: `${platform} - ${chalk.gray(url)}`,
        value: url
    }));
    choices.push({ name: '↩️ Back to main menu', value: 'back' });

    const { link } = await inquirer.prompt([
        {
            type: 'list',
            name: 'link',
            message: 'Select a link to open in your browser:',
            choices
        }
    ]);

    if (link !== 'back') {
        await open(link);
        console.log(chalk.green(`\n✨ Opening ${link} in your browser...\n`));
    }
};