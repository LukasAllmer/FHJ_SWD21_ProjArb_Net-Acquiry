interface PostData {
	requestId: number;
	requestContent: OutputField[] | null;
}

interface OutputField {
	fieldId: number | string;
	fieldData: string | null;
	fieldSubItems: OutputField[] | null;
}

function parseOutputData(id: number, data: Record<string, any>): PostData {
	const postData: PostData = {
		requestId: id,
		requestContent: parseFormDataToNestedJson(data),
	};

	return postData;
}

function parseFormDataToNestedJson(
	inputRecord: Record<string, any>
): OutputField[] | null {
	const output: OutputField[] = [];
	Object.keys(inputRecord).forEach((key) => {
		if (key.split(";").length == 1) {
			const remainingData = buildRecordWithRemainingEntries(key, inputRecord);
			output.push({
				fieldId: key,
				fieldData: inputRecord[key] ? inputRecord[key] : null,
				fieldSubItems: Object.keys(remainingData).length
					? parseFormDataToNestedJson(remainingData)
					: null,
			});
		}
	});
	if (output.length) return output;
	else return null;
}

function buildRecordWithRemainingEntries(
	id: string,
	inputRecord: Record<string, any>
): Record<string, any> {
	const remainingMatches: Record<string, any> = {};
	Object.keys(inputRecord)
		.filter((key) => key.split(";")[0] == id.split(";")[0])
		.forEach((key) => {
			if (key.split(";").length > 1)
				remainingMatches[key.split(";").slice(1).join(";")] = inputRecord[key];
		});
	return remainingMatches;
}

export default parseOutputData;
