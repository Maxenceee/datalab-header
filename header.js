const { languageDemiliters } = require("./delimiters");

const headerTemplate_1 = `
* ******************************************** *
*                                              *
*  $PROJECT_NAME____________________________   *
*  (c) $Y__ L'équipe du DataLab                *
*  Tous droits réservés.                       *
*  ==========================================  *
*                                              *
*                                              *
* ******************************************** *

`.substring(1);

const headerTemplate_2 = `
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

const getTemplate = (style, languageId) => {
	const [left, right] = languageDemiliters[languageId];
	const width = left.length;

	// switch (style) {
	// 	case 'Style ancien':
	// 		return `${left}\n${headerTemplate_2}\n${right}`;
	// 	case 'Style nouveau':
	// 	default:
			return headerTemplate_1
				.replace(new RegExp(`^(.{${width}})(.*)(.{${width}})$`, 'gm'), left + '$2' + right);
	// }
}

const renderHeader = (style, languageId, projectName) => [
	{ name: 'PROJECT_NAME', value: projectName },
	{ name: 'Y', value: new Date().getFullYear().toString() },
].reduce((header, field) =>
	setFieldValue(header, field.name, field.value),
	getTemplate(style, languageId));

const extractHeader = (text) => {
	const headerRegex = `^(.{48}(\r\n|\n)){9}`
	const match = text.match(headerRegex)
	
	return match ? match[0].split('\r\n').join('\n') : null
}

module.exports = {
	renderHeader,
	supportsLanguage,
	extractHeader,
}