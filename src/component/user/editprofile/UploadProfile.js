import React, { Component } from "react";
import { Button } from "react-bootstrap";
import User from "../../../images/avatar1.png";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../../FetchNodeServices";
export default class UploadProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
    };
  }

  next = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    try {
      let files = event.target.files; // image will come at this place
      let reader = new FileReader(); // Reader will read the image
      reader.readAsDataURL(files[0]); // now it is converting the image into base-64
      reader.onload = (e) => {
        // when it gets any event on loading, it shows the result, and set it in a state.
        console.log(e.target.result);
        this.setState({ userImage: e.target.result });
      };
    } catch (e) {}
  };
  componentDidMount = () => {
    console.log("this.props new", this.props);
  };

  handleDelete = async () => {
    var id = localStorage.getItem("getid");
    var body = { id: id };
    console.log(body);
    var result = delete("http://192.168.0.140:3001/user/deleteuser/" + body);
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    // }

    // var result = await postData("user/deleteuser", body);
    console.log("hi",result);
    if (result) {
      alert("Deleted");
    } else {
      alert("plese try again");
    }
  };
  render() {
    return (
      <>
        <div className="avatar-wrapper">
          <div className="upload-button">
            <img
              src={this.state.userImage ? this.state.userImage : User}
              alt=""
            />
          </div>
          <div className="edit-user">
            <span className="flaticon-pen"></span>
            <input
              className="file-upload"
              type="file"
              value={this.state.photo}
              name="photo"
              onChange={this.next}
              imgextension={[".jpg", ".gif", ".png", ".gif", ".pdf"]}
            />
          </div>
          <div className="delect-account">
            <Button
              className="btn-delet"
              variant="false"
              onClick={() => this.handleDelete()}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </>
    );
  }
}
