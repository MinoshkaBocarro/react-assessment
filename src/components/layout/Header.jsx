import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import LightSwitch from "../features/LightSwitch";

import { GiStoneTower } from "react-icons/gi";

function Header() {
	return (
		<>
			<Navbar id="navbar" className="mb-2 navbar-class" variant="light">
				<Container>
					<Navbar.Brand as={Link} to="/">
						<GiStoneTower />
						The Watchtower
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto navbar-custom">
							<Nav.Link as={Link} to="/" className="px-3 fs-5">
								Home
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/contact"
								className="px-3 fs-5"
							>
								Contact
							</Nav.Link>
							<Navbar.Text>
								<LightSwitch />
							</Navbar.Text>
							{/* <Nav.Link
								as={Link}
								to="/schedule"
								className="px-3 fs-5"
							>
								Scheduled Shows
							</Nav.Link> */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
