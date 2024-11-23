const { languageDemiliters } = require("./delimiters");

const headerTemplate = `
$PROJECT_NAME____________________
(c) $Y__ L'équipe du DataLab
Tous droits réservés.
==================================
`.substring(1);

const pad = (value, width) => value.concat(' '.repeat(width)).substr(0, width);

const fieldRegex = (name) => new RegExp(`^((?:.*\\\n)*.*)(\\\$${name}_*)`, '');

const supportsLanguage = function (languageId) {
    return languageId in languageDemiliters;
};

const setFieldValue = (header, name, value) => {
	const [, offset, field] = header.match(fieldRegex(name));
	
	return header.substr(0, offset.length)
	.concat(pad(value, field.length))
	.concat(header.substr(offset.length + field.length))
}

const getTemplate = (languageId) => {
	const [left, right] = languageDemiliters[languageId];

	return `${left}\n${headerTemplate}\n${right}\n\n`;
}

const renderHeader = (languageId, projectName) => [
	{ name: 'PROJECT_NAME', value: projectName },
	{ name: 'Y', value: new Date().getFullYear().toString() },
].reduce((header, field) =>
	setFieldValue(header, field.name, field.value),
	getTemplate(languageId));

module.exports = {
	renderHeader,
	supportsLanguage,
}