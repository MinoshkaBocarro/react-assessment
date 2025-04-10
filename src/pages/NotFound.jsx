import { useNavigate } from "react-router-dom";
import AppButton from "../components/common/AppButton";
import { Container } from "react-bootstrap";

function NotFound() {
	const navigate = useNavigate();

	function handleClick() {
		navigate("/home");
	}
	return (
		<Container>
			<h2>Sorry!</h2>
			<p>The page you were looking for is not available</p>
			<AppButton onClick={handleClick}>Home</AppButton>
		</Container>
	);
}

export default NotFound;
