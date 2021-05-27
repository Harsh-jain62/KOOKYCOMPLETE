import { Dashboard } from "@material-ui/icons";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../../FetchNodeServices";
import Header from "../../Header";
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getemail: "",
      getname: "",
      getcontactnumber: "",
      gethotelname: "",
      getspecialrequest: "",
      gethotelname: "",
      getcontactnumber: "",
      getemail: "",
      getspecialrequest: "",
      getid: "",
      getdate: "",

    };
  }
  handleSubmit = async () => {
    console.log("inside", this.props.data.getid);
   
  const {
      getemail,
      getname,
      getcontactnumber,
      gethotelname,
      getspecialrequest,
    } = this.state;
    var body = {
      email: getemail || this.props.data.getemail,
      username: getname || this.props.data.getname,
      contactnumber: getcontactnumber || this.props.data.getcontactnumber,
      hotelname: gethotelname || this.props.data.gethotelname,
      specialrequest: getspecialrequest || this.props.data.getspecialrequest,
      _id: this.props.data.getid,
    };
    console.log(body);
    var result = await postData("user/edituserprofile", body);
    console.log(result);
    
    if (result) {
      console.log("succesfully submit:", result);
      alert("success");
     
    } else {
      console.log("not succesfully submit");
      alert("success");
    }
  };

  // componentDidMount = async () => {
  //   // console.log("rahul", this.props.data);
  //   // var data = this.props.data;
  //   // this.setState({ data });
  // };

  // componentWillReceiveProps = () => {
  //   console.log("rahul2", this.props.data);
  // };

  render() {
    console.log("rahul", this.props.data);
    console.log("final", this.state);
    return (
      <>
        {/* {abc !== "" ? "" : ""} */}
        {/* <Dashboard data="jsdchsbhb" /> */}
        <div className="edit-profilebox">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={this.props.data.getname}
              // value={this.props.data.getname}
              onChange={(e) => this.setState({ getname: e.target.value })}
               
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={this.props.data.getemail}
              // value={this.props.data.getemail}
              onChange={(e) => this.setState({ getemail: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder={this.props.data.getcontactnumber}
              // value={this.state.getcontactnumber}
              onChange={(e) =>
                this.setState({ getcontactnumber: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control
              // type="text"
              placeholder={this.props.data.gethotelname}
              // value={this.state.gethotelname}
              onChange={(e) => this.setState({ gethotelname: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Special Request</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={this.props.data.getspecialrequest}
              // value={this.state.getspecialrequest}
              onChange={(e) =>
                this.setState({ getspecialrequest: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="text-right">
            <Button
              type="submit"
              className="uppercase  "
              onClick={() => this.handleSubmit(this.props.data)}
            >
              Update
            </Button>
          </Form.Group>
        </div>
      </>
    );
  }
}
