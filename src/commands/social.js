import chalk from 'chalk';
import boxen from 'boxen';
import open from 'open';
import inquirer from 'inquirer';
import gradient from 'gradient-string';

const socialLinks = {
    GitHub: {
        url: 'https://github.com/xensen008',
        description: 'Check out my open source projects and contributions',
        icon: '🔮'
    },
    Twitter: {
        url: 'https://twitter.com/arnabjk008',
        description: 'Follow me for tech insights and updates',
        icon: '🐦'
    },
    LinkedIn: {
        url: 'https://linkedin.com/in/arnabjk008',
        description: 'Connect with me professionally',
        icon: '💼'
    },
    Portfolio: {
        url: 'https://arnabjk008.dev',
        description: 'Explore my detailed portfolio and blog',
        icon: '🌟'
    },
};

const displaySocialHeader = () => {
    console.log(gradient(['#00ff88', '#0095ff']).multiline('\n╭──────────── Connect With Me ────────────╮\n'));
    console.log(chalk.cyan('Discover more about my work and connect with me across platforms!\n'));
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

export const showSocialLinks = async () => {
    while (true) {
        console.clear();
        displaySocialHeader();

const choices = Object.entries(socialLinks).map(([platform, info]) => ({
            name: chalk.bold(platform) + chalk.white(' - ') + chalk.blue(info.url),
            value: info.url
        }));
        
        choices.push(new inquirer.Separator(chalk.white('─'.repeat(30))));
        choices.push({ 
            name: chalk.yellow('Back'),
            value: 'back'
        });
        
        const { link } = await inquirer.prompt([
            {
                type: 'list',
                name: 'link',
                message: chalk.yellow('Select:'),
                pageSize: 10,
                choices
            }
        ]);
        
        if (link === 'back') {
            break;
        }
        
        await open(link);
        console.log(chalk.green('\nOpening...\n'));
        
        console.log(chalk.white('\nPress Enter to continue...'));
        await handleContinue();
    }
};