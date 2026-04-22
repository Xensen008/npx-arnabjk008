import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";
import { showSocialLinks } from "./commands/social.js";
import { showProjects } from "./commands/projects.js";
import { showcaseSpecial } from "./commands/showcase.js";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const displayBanner = async () => {
    console.clear();
    const text = figlet.textSync("Arnab", {
        font: "ANSI Shadow",
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
    });

console.log(chalk.white(text));
    
    console.log(chalk.bold("Quick Links:"));
    console.log(chalk.cyan("GitHub: ") + chalk.blue("https://github.com/xensen008"));
    console.log(chalk.cyan("Twitter: ") + chalk.blue("https://twitter.com/arnabjk008"));
    console.log(chalk.cyan("Portfolio: ") + chalk.blue("https://arnabjk008.dev"));

    console.log(
        chalk.white(
            "\nFull-stack developer who builds fast, purposeful web and app experiences, from clean interfaces to resilient backend systems. I've architected and shipped multiple production applications, working at the intersection of engineering and design to turn well-defined problems into polished, shipping products.",
        ),
    );

    console.log(chalk.dim("─".repeat(process.stdout.columns)));
};

const questions = [
    {
        type: "list",
        name: "action",
        message: chalk.yellow("Select an option:"),
        prefix: ">",
        choices: [
            {
                name:
                    chalk.green("Projects") +
                    "\n" +
                    chalk.dim("| ") +
                    chalk.gray("View my projects"),
                value: "projects",
            },
            {
                name:
                    chalk.blue("Connect") +
                    "\n" +
                    chalk.dim("| ") +
                    chalk.gray("Social links"),
                value: "social",
            },
            {
                name:
                    chalk.magenta("Tools") +
                    "\n" +
                    chalk.dim("| ") +
                    chalk.gray("CLI utilities"),
                value: "showcase",
            },
            new inquirer.Separator(chalk.dim("─".repeat(60))),
            {
                name: chalk.red("Exit"),
                value: "exit",
            },
        ],
        pageSize: 8,
    },
];

const displayFooter = async () => {
    console.log("\n" + chalk.dim("─".repeat(process.stdout.columns)));
    console.log(
        chalk.dim("Pro Tip: ") +
        chalk.gray("Use arrow keys to navigate and Enter to select"),
    );
};

const main = async () => {
    await displayBanner();

    while (true) {
        await displayFooter();
        const { action } = await inquirer.prompt(questions);

        console.clear();
        switch (action) {
            case "projects":
                await showProjects();
                break;
            case "social":
                await showSocialLinks();
                break;
            case "showcase":
                await showcaseSpecial();
                break;
            case "exit":
                console.log(chalk.white(figlet.textSync("Bye!", { font: "ANSI Shadow", horizontalLayout: "fitted" })));
                console.log(chalk.cyan("\nThanks!\n"));
                process.exit(0);
        }
    }
};

export { main };
