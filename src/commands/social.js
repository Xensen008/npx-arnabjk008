const fs = require('fs');
const path = require('path');

const showSocialLinks = () => {
    const socialLinksPath = path.join(__dirname, '../data/social-links.json');
    fs.readFile(socialLinksPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading social links:', err);
            return;
        }
        const socialLinks = JSON.parse(data);
        console.log('Social Media Links:');
        socialLinks.forEach(link => {
            console.log(`${link.name}: ${link.url}`);
        });
    });
};

module.exports = showSocialLinks;