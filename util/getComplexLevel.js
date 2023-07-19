/**
 * @param {string} str The string to search for complex-level arguments.
 * @param {string} startTag The start tag of the complex-level argument.
 * @param {string} endTag The end tag of the complex-level argument.
 * @returns {{content: string[], edited: string}} The content of the complex-level argument and the string with the complex-level argument removed.
*/
function getComplexLevel(str, startTag, endTag) {
	const regex = new RegExp(`${startTag}(.*?)${endTag}`, 'g');
	const extractedContent = [];
	let newStr = str;

	let match;
	while ((match = regex.exec(str)) !== null) {
		const content = match[1];
		if (!extractedContent.includes(content)) {
			extractedContent.push(content);
		}
		newStr = newStr.replace(match[0], '');
	}

	return {
		content: extractedContent,
		edited: newStr
	};
}

module.exports = getComplexLevel;