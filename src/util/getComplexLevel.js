function getComplexLevel(str, startTag, endTag) {
	const regex = new RegExp(`${startTag}(.*?)${endTag}`, 'g');
	const extractedContent = [];
	let newStr = str;

	let match;
	while ((match = regex.exec(str)) !== null) {
		const content = match[1];
		if (!extractedContent.includes(content)) {
			extractedContent.push(content);
			newStr = newStr.replace(match[0], '');
		}
	}

	return {
		content: extractedContent,
		edited: newStr
	};

}

module.exports = getComplexLevel;