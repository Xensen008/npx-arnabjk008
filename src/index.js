import { showSocialLinks } from './commands/social.js';
import { showProjects } from './commands/projects.js';
import { showcaseSpecial } from './commands/showcase.js';

const main = () => {
    console.log("Welcome to npx arnabjk008!");
    showSocialLinks();
    showProjects();
    showcaseSpecial();
};

main();