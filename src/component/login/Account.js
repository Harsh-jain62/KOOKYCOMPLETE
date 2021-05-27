import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import {
  checkEmail,
  checkName,
  checkMobile,
  checkPassword,
  checkConfirmPassword,
} from "../Checks";

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      getemail: "",
      getPassword: "",
      getname: "",
      getphonenumber: "",
      getMsg: "",
      text: "",
      messageemail: "",
      messagephonenumber: "",
      messagename: "",
      messagepassword: "",
      messageconfirmpassword: "",
      getconfirmpassword: "",
    };
  }

  handleSignup = async (props) => {
    const { getemail, getPassword, getphonenumber, getname, text } = this.state;
    var err = false;
    if (!checkEmail(this.state.getemail)) {
      err = true;
      this.setState({ messageemail: "plese enter the valid email" });
    } else {
      this.setState({ messageemail: "" });
    }
    if (!checkName(this.state.getname)) {
      err = true;
      this.setState({ messagename: "plese enter the valid name" });
    } else {
      this.setState({ messagename: "" });
    }
    if (!checkMobile(this.state.getphonenumber)) {
      err = true;
      this.setState({
        messagephonenumber: "plese enter the valid contactnumber",
      });
    } else {
      this.setState({
        messagephonenumber: "",
      });
    }
    if (!checkPassword(this.state.getPassword)) {
      err = true;
      this.setState({ messagepassword: "plese enter the valid password" });
    } else {
      this.setState({ messagepassword: "" });
    }
    if (
      !checkConfirmPassword(
        this.state.getPassword,
        this.state.getconfirmpassword
      )
    ) {
      err = true;
      this.setState({ messageconfirmpassword: "password did not match" });
    } else {
      this.setState({
        messageconfirmpassword: "",
      });
    }

    if (!err) {
      var body = {
        email: getemail,
        password: getPassword,
        username: getname,
        contactnumber: getphonenumber,
        role: text,
      };
      var result = await postData("user/signup", body);
      console.log("harshit", result);
      if (result) {
        // console.log("Signup:", result);
        alert("pls cheak your email")
        //  this.props.history.push("/login");
      } else {
        this.setState({
          getMsg: "Mail is exist plese try with another email id",
        });
      }
    }
  };

  onClickUser = () => {
    this.setState({
      text: "User",
    });
  };
  onClickEscort = () => {
    this.setState({
      text: "Escort",
    });
  };

  onClickAgency = () => {
    this.setState({
      text: "Agency",
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    // const {
    //   getemail,
    //   getPassword,
    //   getphonenumber,
    //   getname,
    //   text,
    //   getMsg,
    // } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg account">
          <div className="col-md-5 mx-auto">
            <div className="signup-tabs mb-3">
              <p>How do you want to REGISTER?</p>
              <ul>
                <li>
                  <input type="radio" id="user" name="selector" />
                  <label htmlFor="user" onClick={this.onClickUser}>
                    User
                  </label>
                  <div className="check"></div>
                </li>
                <li>
                  <input type="radio" id="escort" name="selector" />
                  <label htmlFor="escort" onClick={this.onClickEscort}>
                    Escort
                  </label>
                  <div className="check"></div>
                </li>

                <li>
                  <input type="radio" id="agency" name="selector" />
                  <label htmlFor="agency" onClick={this.onClickAgency}>
                    Agency
                  </label>
                  <div className="check"></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 mx-auto">
            <div className="login-color">
              <h1>
                Welcome!
                <span>{this.state.text}</span>
              </h1>
              <Form.Group className=" login-icon">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) => this.setState({ getname: e.target.value })}
                />
                <span className="flaticon-user"></span>
                <div>{this.state.messagename}</div>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => this.setState({ getemail: e.target.value })}
                />
                <span className="flaticon-envelope"></span>
                <div>{this.state.messageemail}</div>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) =>
                    this.setState({ getphonenumber: e.target.value })
                  }
                />
                <span className="flaticon-phone"></span>
                <div>{this.state.messagephonenumber}</div>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    this.setState({ getPassword: e.target.value })
                  }
                />
                <span className="flaticon-password"></span>
                <div>{this.state.messagepassword}</div>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    this.setState({ getconfirmpassword: e.target.value })
                  }
                />
                <span className="flaticon-password"></span>
                <div>{this.state.messageconfirmpassword}</div>
              </Form.Group>
              <Form.Group className="text-center account">
                Already have an account?
                <Link to="/login">Login Now</Link>
              </Form.Group>
              <Button
                variant="false"
                className="btn-submit "
                type="submit"
                onClick={() => this.handleSignup()}
              >
                CONTINUE
              </Button>
              <h3>
                <center>
                  <font color="#e100ff" size="3">
                    {this.state.getMsg}
                  </font>
                </center>
              </h3>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
