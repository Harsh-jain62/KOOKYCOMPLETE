import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";

import OtpInput from "react-otp-input";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
export default class SubmitOtp extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      numInputs: 4,

      isDisabled: false,
    };
  }
  componentDidMount = () => {
    console.log("this.props new", this.props);
  };

  handleChange = (otp) => this.setState({ otp });
  handleSubmit = (e) => {
    e.preventDefault();
    var body = { otp: this.state.otp, email: this.props.location.email };
    console.log({ body });
    var result = postData("user/otpverification", body);
    console.log(result);
  };

  render() {
    const { otp, numInputs, isDisabled } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-3 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Welcome</h1>
              <form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <div className="opt-box">
                    <OtpInput
                      className="optbox"
                      value={this.state.otp}
                      onChange={this.handleChange}
                      numInputs={4}
                      separator={<span>-</span>}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 text-center">
                  <Button
                    type="submit"
                    className="btn btn-submit mt-4"
                    variant="false"
                    disabled={otp.length < numInputs}
                  >
                    Get OTP
                  </Button>
                </Form.Group>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
