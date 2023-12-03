import React from "react";
import logo from "../../assets/logo/na_logo_text.svg";

interface Transfer {
	className?: string;
}

const LogoWithText: React.FC<Transfer> = ({ className }) => {
	return (
		<img
			src={logo}
			alt="net acquiry logo with text"
			className={className ? className : "logo"}
		/>
	);
};

export default LogoWithText;
