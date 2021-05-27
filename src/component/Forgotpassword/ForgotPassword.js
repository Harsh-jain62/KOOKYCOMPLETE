import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
export default class ForgotPassword extends Component {
  state = { getemailid: "" };

  handleOtp = async () => {
    const { getemailid } = this.state;
    var body = { emailid: getemailid };
    console.log(body);
    var result = await postData("user/sendotp", body);
    console.log(result);
    if (result) {
      console.log("otp:", result.data);
 } else {
      this.setState({ getMsg: "Invalid AdminId/Password" });
    }
  };
  render() {
     const {
       getemailid,
      
     } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-3 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Welcome</h1>
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
                <p>Enter the email address associated with your account.</p>
              </Form.Group>

              <Link
                to={{
                  pathname: "/submit-otp",
                  email: getemailid,
                }}
                className="btn btn-submit mb-4"
                onClick={() => this.handleOtp()}
              >
                SEND OTP
              </Link>
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
