function formatText(text, style) {
    // Apply styling to the text based on the provided style
    switch (style) {
        case 'bold':
            return `\x1b[1m${text}\x1b[22m`;
        case 'italic':
            return `\x1b[3m${text}\x1b[23m`;
        case 'underline':
            return `\x1b[4m${text}\x1b[24m`;
        default:
            return text;
    }
}

function displaySocialLinks(links) {
    console.log(formatText('Social Links:', 'bold'));
    links.forEach(link => {
        console.log(`${link.name}: ${link.url}`);
    });
}

function displayProjects(projects) {
    console.log(formatText('Projects:', 'bold'));
    projects.forEach(project => {
        console.log(`${project.title}: ${project.description} (${project.link})`);
    });
}

function showcaseSpecial(features) {
    console.log(formatText('Special Features:', 'bold'));
    features.forEach(feature => {
        console.log(`- ${feature}`);
    });
}

module.exports = {
    formatText,
    displaySocialLinks,
    displayProjects,
    showcaseSpecial
};