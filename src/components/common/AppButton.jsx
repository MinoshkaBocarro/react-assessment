import { Button } from "react-bootstrap";

function AppButton({ onClick, children }) {
	return <Button onClick={onClick}>{children}</Button>;
}

export default AppButton;
