import React from "react";
import logo from "../../assets/logo/na_logo.svg";

interface Transfer {
	className?: string;
}

const LogoWithoutText: React.FC<Transfer> = ({ className }) => {
	return (
		<img
			src={logo}
			alt="net acquiry logo"
			className={className ? className : "logo"}
		/>
	);
};

export default LogoWithoutText;
