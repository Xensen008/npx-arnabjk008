// src/commands/showcase.js

import chalk from 'chalk';
import gradient from 'gradient-string';
import boxen from 'boxen';

export const showcaseSpecial = async () => {
    console.clear();
    
    // Display a cool gradient message
    console.log(gradient.pastel.multiline(`
    ╔═══════════════════════════════════════╗
    ║           Special Showcase            ║
    ╚═══════════════════════════════════════╝
    `));

    // Display some cool stats or achievements
    const stats = boxen(
        `${chalk.bold('🏆 Achievements')}\n\n` +
        `${chalk.cyan('▸')} ${chalk.white('Open Source Contributions:')} ${chalk.green('50+')}\n` +
        `${chalk.cyan('▸')} ${chalk.white('GitHub Stars:')} ${chalk.yellow('⭐ 100+')}\n` +
        `${chalk.cyan('▸')} ${chalk.white('Projects Completed:')} ${chalk.magenta('20+')}\n` +
        `${chalk.cyan('▸')} ${chalk.white('Technologies Mastered:')} ${chalk.red('15+')}`,
        {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'magenta'
        }
    );

    console.log(stats);

    // Display a fun message
    console.log('\n' + chalk.cyan('Press any key to continue...'));
    await new Promise(resolve => process.stdin.once('data', resolve));
};