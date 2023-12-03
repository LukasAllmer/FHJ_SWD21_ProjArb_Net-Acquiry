import React from "react";

interface Text {
	text: string;
}

const HighlightText: React.FC<Text> = ({ text }) => {
	return <span className="highlightText">{text}</span>;
};

export default HighlightText;
