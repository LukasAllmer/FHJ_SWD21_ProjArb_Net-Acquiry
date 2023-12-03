import HighlightText from "./comp/boldText";
import LogoWithoutText from "./comp/logoWithoutText";
import { useLocation } from "react-router-dom";
import "./submitted.sass";

function Submitted() {
	const { state } = useLocation();

	try {
		return (
			<>
				<header>
					<a href="/">
						<LogoWithoutText className="logo" />
					</a>
				</header>
				<main>
					<h1>Thank you for using net acquiry!</h1>
					<p>
						Submission of Form ID #{state.requestId} was succesful!
						<br />
						If you need anything regarding this request, please get in touch
						with:
					</p>
					<div className="requester">
						{state.requesterData.websiteLink ? (
							<a href={state.requesterData.websiteLink}>
								<img
									src={
										state.requesterData.pictureLink
											? "/img/requesters/" + state.requesterData.pictureLink
											: "/img/requesters/default.svg"
									}
									width={200}
									height={200}
									alt={
										"Image of " +
										state.requesterData.firstName +
										" " +
										state.requesterData.lastName
									}
								/>
							</a>
						) : (
							<img
								src={
									state.requesterData.pictureLink
										? "/img/requesters/" + state.requesterData.pictureLink
										: "/img/requesters/default.svg"
								}
								width={200}
								height={200}
								alt={
									"Image of " +
									state.requesterData.firstName +
									" " +
									state.requesterData.lastName
								}
							/>
						)}
						<p>
							<HighlightText
								text={
									state.requesterData.firstName +
									" " +
									state.requesterData.lastName
								}
							/>
							<br />

							{state.requesterData.websiteLink ? (
								<a href={state.requesterData.websiteLink}>
									{" "}
									{state.requesterData.company}{" "}
								</a>
							) : (
								state.requesterData.company
							)}
						</p>
					</div>
				</main>
			</>
		);
	} catch (err) {
		return (
			<>
				<h1>Oops!</h1>
				<p>
					Please only use the UI to navigate. Click the logo to return to home.
				</p>
			</>
		);
	}
}

export default Submitted;
