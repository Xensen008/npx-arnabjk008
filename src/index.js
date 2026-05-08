import inquirer from "inquirer";
import chalk from "chalk";
import { showSocialLinks } from "./commands/social.js";
import { showProjects } from "./commands/projects.js";
import { showcaseSpecial } from "./commands/showcase.js";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));


const archLogoLines = [
    "                  -`",
    "                 .o+`",
    "                `ooo/",
    "               `+oooo:",
    "              `+oooooo:",
    "              -+oooooo+:",
    "            `/:-:++oooo+:",
    "           `/++++/+++++++:",
    "          `/++++++++++++++:",
    "         `/+++ooooooooooooo/`",
    "        ./ooosssso++osssssso+`",
    "       .oossssso-````/ossssss+`",
    "      -osssssso.      :ssssssso.",
    "     :osssssss/        osssso+++.",
    "    /ossssssss/        +ssssooo/-",
    "  `/ossssso+/:-        -:/+osssso+-",
    " `+sso+:-`                 `.-/+oso:",
    "`++:.                           `-/+/",
    ".`                                 `/"
];

const archColor = chalk.hex("#00f8f8");
const bright = chalk.white;
const dim = chalk.hex("#aaaaaa");

const dataLines = [
    `${chalk.bold.hex("#00f8f8")("Arnab Jyoti Kakati")} ${dim("• xensen008")}`,
    `${chalk.hex("#cc88ff")("Full-stack Dev")} ${dim("•")} ${chalk.hex("#6699ff")("I use Arch btw")}`,
    `${dim("Assam, India")}`,
    ``,
    `${bright("Applied AI Engineer")} ${dim("/ building things that ship")}`,
    `${dim("Web:")}   ${chalk.hex("#00f8f8")("https://arnabjk008.dev")}`,
    `${dim("GitHub:")} ${chalk.hex("#00f8f8")("https://github.com/xenser008")}`,
    `${dim("X:")}     ${chalk.hex("#00f8f8")("https://x.com/arnabjk008")}`,
    ``,
    `${chalk.hex("#ffcc44")("Skills:")}   ${bright("Next.js  React-Native  Python  Rust  Docker  Linux")}`,
    `${chalk.hex("#ffcc44")("Projects:")} ${bright("Metly  Pixify  Quietly")}`,
    ``,
    `${dim("Another JS dev thinking he gonna build the next big things")}`,
];

const displayBanner = async () => {
    console.clear();
    console.log("");
    const logoWidth = Math.max(...archLogoLines.map(l => l.length));
    const maxLines = Math.max(archLogoLines.length, dataLines.length);
    for (let i = 0; i < maxLines; i++) {
        const raw = archLogoLines[i] ?? "";
        const logo = archColor(raw.padEnd(logoWidth));
        const data = dataLines[i] ?? "";
        console.log(`${logo}   ${data}`);
    }
    console.log("");
};

const questions = [
    {
        type: "list",
        name: "action",
        message: chalk.yellow("Select:"),
        prefix: ">",
        choices: [
            { name: chalk.green("Projects") + chalk.white(" - View my projects"), value: "projects" },
            { name: chalk.blue("Connect") + chalk.white(" - Social links"), value: "social" },
            { name: chalk.magenta("Tools") + chalk.white(" - CLI utilities"), value: "showcase" },
            new inquirer.Separator(chalk.white("─".repeat(30))),
            { name: chalk.red("Exit"), value: "exit" }
        ],
        pageSize: 8,
    },
];

const displayFooter = async () => {
    console.log("");
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
                console.log(chalk.cyan("\nGoodbye!\n"));
                process.exit(0);
        }
    }
};

export { main };
