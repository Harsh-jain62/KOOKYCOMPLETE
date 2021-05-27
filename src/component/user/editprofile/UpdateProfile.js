import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../../FetchNodeServices";

export default class UpdateProfile extends Component {
  //
  state = { getconfirmpassword: "", getpassword: "" };
  handlePassword = async () => {
    const { getconfirmpassword, getpassword } = this.state;
    var body = {
      confirmpassword: getconfirmpassword,
      password: getpassword,
      userId: this.props.data,
    };
    var result = await postData("user/forgetpassword", body);
    console.log("result", result);
    if (result) {
      console.log("result", result);
      alert("change password")
    } else {
      console.log(result);
      alert("error")
    }
  };
  //
  componentDidMount = () => {
   
  };
  render() {
    // console.log("ra", this.props.data);
    const { getconfirmpassword, getpassword } = this.state;
    return (
      <>
        <div className="edit-profilebox">
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="**********"
            ></Form.Control>
          </Form.Group>
          <Row xs={1} md={2} lg={2}>
            <Col>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  onChange={(e) =>
                    this.setState({ getpassword: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  onChange={(e) =>
                    this.setState({ getconfirmpassword: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="text-right text-uppercase">
            <Button
              type="submit"
              className="uppercase"
              onClick={() => this.handlePassword(this.props.data)}
            >
              Update
            </Button>
          </Form.Group>
        </div>
      </>
    );
  }
}
