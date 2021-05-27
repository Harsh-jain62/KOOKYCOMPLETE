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

export default class Login extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    if (window.location.href) {
      const token = window.location.href.slice(28);
      var body = {
        token: token,
      };
    var result = await postData("user/activate", body);
    // alert(result.message);
    }
  };
  state = { getemailid: "", getpassword: "", getMsg: "" };

  handleLogin = async (props) => {
    const { getemailid, getpassword } = this.state;
    var body = { email: getemailid, password: getpassword };
    var result = await postData("user/login", body);
    console.log("result", result);
    var data = result.token;
    if (result) {
      if (result.data[0].role == "Escort") {
        localStorage.removeItem("TOKEN");
        localStorage.setItem("TOKEN", JSON.stringify(data));
        this.props.history.push("/user/escort/dashboard");
      } else if (result.data[0].role == "User") {
        localStorage.removeItem("TOKEN");
        localStorage.setItem("TOKEN", JSON.stringify(data));
        this.props.history.push("/user/dashboard");
      } else if (result.data[0].role == "Agency") {
        // this.props.history.push({
        //   pathname: "/user/agency/dashboard",
        //   state: data,
        // });
        localStorage.removeItem("TOKEN");
        localStorage.setItem("TOKEN", JSON.stringify(data));
        this.props.history.push("/user/agency/dashboard");
      }
    } else {
      this.setState({ getMsg: "Invalid emailId/Password" });
    }
  };
  render() {
    const { getemailid, getpassword, getMsg } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-3 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Welcome!</h1>
              <Form.Group className="mb-4 login-icon">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    this.setState({ getemailid: e.target.value })
                  }
                />
                <span className="flaticon-envelope"></span>
              </Form.Group>
              <Form.Group className="mb-4 login-icon">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    this.setState({ getpassword: e.target.value })
                  }
                />
                <span className="flaticon-password"></span>
              </Form.Group>
              <Form.Group className="text-right mb-4">
                <Link to="/forgot-password">Forgot password?</Link>
              </Form.Group>
              <Button
                variant="false"
                className="btn-submit mb-4"
                type="submit"
                onClick={() => this.handleLogin()}
              >
                Submit
              </Button>
              <h3>
                <center>
                  <font color="#e100ff" size="3">
                    {getMsg}
                  </font>
                </center>
              </h3>
              <Form.Group className="text-center account">
                Don't have an account <Link to="/Sign-up">Create Now</Link>
              </Form.Group>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
