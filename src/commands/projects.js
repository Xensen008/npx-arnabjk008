const fs = require('fs');
const path = require('path');

// Function to show projects
const showProjects = () => {
    const projectsPath = path.join(__dirname, '../data/projects.json');
    fs.readFile(projectsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading projects file:', err);
            return;
        }
        const projects = JSON.parse(data);
        console.log('Projects:');
        projects.forEach(project => {
            console.log(`- ${project.title}: ${project.description} (Link: ${project.link})`);
        });
    });
};

module.exports = { showProjects };