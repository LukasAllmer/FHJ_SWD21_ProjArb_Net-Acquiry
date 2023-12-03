import { useRouteError } from "react-router-dom";
import LogoWithoutText from "./comp/logoWithoutText";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<header>
				<a href="/">
					<LogoWithoutText />
				</a>
			</header>
			<main>
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error instanceof Error ? error.message : null}</i>
				</p>
			</main>
		</div>
	);
}
