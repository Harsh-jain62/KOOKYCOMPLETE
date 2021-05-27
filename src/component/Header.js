import React, { Component } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

import Logo from "../images/logo.png";
export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  // state = {
  //   username: "",
  // };
  // handlemenu = async () => {
  //  localStorage.removeItem("username");
  //  var name ="Menu"
  //  this.setState({ username: name });
  //  console.log("hote", this.state.username);
  // };
  componentDidMount = () => {
    // var name = localStorage.getItem("username");

    //   console.log("header", name);
    //   this.setState({ username: name });
    // console.log("hote", this.state.username);
    console.log("headers", this.props);
  };
  render() {
    return (
      <>
        <Navbar bg="black" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand href="/">
              <img src={Logo} alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto header-menu aligin-items-center">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/booking">Find an Escort</Nav.Link>
                {/* <Nav.Link href="/login" className="login">
                  {localStorage.getItem("getname")}
                </Nav.Link> */}
                <Dropdown>
                  <Dropdown.Toggle
                    as="a"
                    variant="false"
                    className="login"
                    id="dropdown-basic"
                  >
                    {/* {this.state.username} */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                    <Dropdown.Item href="/" onClick={() => this.handlemenu()}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
