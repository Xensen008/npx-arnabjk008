import chalk from 'chalk';
import boxen from 'boxen';
import open from 'open';
import inquirer from 'inquirer';
import gradient from 'gradient-string';

const socialLinks = {
    GitHub: {
        url: 'https://github.com/yourusername',
        description: 'Check out my open source projects and contributions',
        icon: '🔮'
    },
    Twitter: {
        url: 'https://twitter.com/yourusername',
        description: 'Follow me for tech insights and updates',
        icon: '🐦'
    },
    LinkedIn: {
        url: 'https://linkedin.com/in/yourusername',
        description: 'Connect with me professionally',
        icon: '💼'
    },
    Portfolio: {
        url: 'https://yourportfolio.dev',
        description: 'Explore my detailed portfolio and blog',
        icon: '🌟'
    },
    Blog: {
        url: 'https://yourblog.dev',
        description: 'Read my latest tech articles and tutorials',
        icon: '📝'
    }
};

const displaySocialHeader = () => {
    console.log(gradient(['#00ff88', '#0095ff']).multiline('\n╭──────────── Connect With Me ────────────╮\n'));
    console.log(chalk.cyan('Discover more about my work and connect with me across platforms!\n'));
};

export const showSocialLinks = async () => {
    console.clear();
    displaySocialHeader();

    const choices = Object.entries(socialLinks).map(([platform, info]) => ({
        name: chalk.bold(`${info.icon}  ${platform}`) + '\n' +
              chalk.dim('│ ') + chalk.gray(info.description) + '\n' +
              chalk.dim('│ ') + chalk.blue(info.url),
        value: info.url
    }));

    choices.push(new inquirer.Separator(chalk.dim('─'.repeat(50))));
    choices.push({ 
        name: chalk.yellow('↩  Back to Main Menu'),
        value: 'back'
    });

    const { link } = await inquirer.prompt([
        {
            type: 'list',
            name: 'link',
            message: chalk.yellow('🎯  Where would you like to connect?'),
            pageSize: 10,
            choices
        }
    ]);

    if (link !== 'back') {
        await open(link);
        const box = boxen(
            chalk.green('✨ Opening browser to connect with you!\n\n') +
            chalk.dim('URL: ') + chalk.blue(link),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan',
                float: 'center'
            }
        );
        console.log('\n' + box);
        
        console.log(chalk.dim('\nPress any key to continue...'));
        await new Promise(resolve => process.stdin.once('data', resolve));
    }
};