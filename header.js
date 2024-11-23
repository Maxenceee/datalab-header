const { languageDemiliters } = require("./delimiters");

const header = `
{{PROJECT_NAME}}
(c) {{YEAR}} L'équipe du DataLab
Tous droits réservés.
==================================
\n`;

const getTemplate = (languageId, projectName) => {
	const [left, right] = languageDemiliters[languageId];

	const newHeader = header
		.replace("{{YEAR}}", new Date().getFullYear())
		.replace("{{PROJECT_NAME}}", projectName);

	return `${left}${newHeader}${right}`;
}

const supportsLanguage = function (languageId) {
    return languageId in languageDemiliters;
};

module.exports = {
	getTemplate,
	supportsLanguage
}