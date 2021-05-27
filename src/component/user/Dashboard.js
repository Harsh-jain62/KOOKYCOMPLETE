import React, { Component } from "react";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import Booking from "./editprofile/Booking";
import { NavLink } from "react-router-dom";
import EditProfile from "./editprofile/EditProfile";
import UpdateProfile from "./editprofile/UpdateProfile";
import Chat from "./editprofile/Chat";
import UploadProfile from "./editprofile/UploadProfile";
import MyReview from "./editprofile/MyReview";
import Header from "../Header";
import Footer from "../Footer";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
export default class Dashboard extends Component {
  // state = {
  //   username: "",
  // };
  constructor() {
    super();
    this.state = {
      type: "editprofile",
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
  ChangeTab = (type) => (e) => {
    console.log("hii", type);
    this.setState({
      type: type,
    });
  };
  componentDidMount = async () => {
    let token = localStorage.getItem("TOKEN");
    var body = {
      token: token,
    };
    console.log(body);
    var result = await postData("user/decoded", body);
    if (result) {
      console.log("fetchdata", result);
      this.setState({
        getid: result.fetchdata._id,
        gethotelname: result.fetchdata.hotelname || "",
        getname: result.fetchdata.username,
        getemail: result.fetchdata.email,
        getcontactnumber: result.fetchdata.contactnumber,
        getspecialrequest: result.fetchdata.specialrequest || "",
        getdate: result.fetchdata.createdAt,
        // type: "editprofile",
      });
      localStorage.removeItem("getid");
      localStorage.setItem("getid", this.state.getid);
    } else {
      console.log("result not found");
    }
  };

  renderSideMenu = (type) => {
    switch (type) {
      case "editprofile":
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={() => this.ChangeTab("editprofile")}
                  activeClassName={
                    this.state.type === "editprofile" ? "active" : ""
                  }
                >
                  Edit Personal Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("updateprofile")}
                  activeClassName={
                    this.state.type === "updateprofile" ? "active" : ""
                  }
                >
                  Update Password
                </NavLink>
              </li>
            </ul>
          </div>
        );
      case "updateprofile":
        return (
          <>
            <div className="edit-personal">
              <ul>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("editprofile")}
                    activeClassName={
                      this.state.type === "editprofile" ? "active" : ""
                    }
                  >
                    Edit Personal Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onClick={this.ChangeTab("updateprofile")}
                    activeClassName={
                      this.state.type === "updateprofile" ? "active" : ""
                    }
                  >
                    Update Password
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );
      case "booking":
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <a href="#">Inrocess Bookings</a>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("booking")}
                  activeClassName={
                    this.state.type === "booking" ? "active" : ""
                  }
                >
                  Completed Booking
                </NavLink>
              </li>
            </ul>
          </div>
        );
      case "review":
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("review")}
                  activeClassName={this.state.type === "review" ? "active" : ""}
                >
                  My Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="edit-personal">
            <ul>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat")}
                  activeClassName={this.state.type === "chat" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 1</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat1")}
                  activeClassName={this.state.type === "chat1" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 2</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat1")}
                  activeClassName={this.state.type === "chat1" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 3</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={this.ChangeTab("chat1")}
                  activeClassName={this.state.type === "chat1" ? "active" : ""}
                >
                  <div className="user-chat-side">
                    <div className="user-icon">T</div>
                    <div className="chat-text">
                      <h5>User 4</h5>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        );
    }
  };

  render() {
    const {
      getemail,

      getcontactnumber,
      getdate,
      getname,
    } = this.state;
    // console.log("dsdsdds", this.state);
    // var fully = this.state.full;
    // console.log("fully", fully);
    return (
      <>
        <Header />
        <div className="login-bg user-dashboard">
          <Container>
            <Breadcrumb className="user-breadcrumb">
              <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">User</Breadcrumb.Item>
              <Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
            </Breadcrumb>

            <Row>
              <Col md="3">
                <UploadProfile />
                {this.renderSideMenu(this.state.type)}
              </Col>
              <Col md="9">
                <div className="profile-box">
                  <h2> {getname}</h2>
                  <div className="main-user">
                    <Row xs={1} md={3} lg={3}>
                      <Col>
                        <span>
                          <i className="flaticon-calendar"></i> Joined{" "}
                          {getdate.slice(0, 10)}
                        </span>
                      </Col>
                      <Col>
                        <span>
                          <i className="flaticon-phone"></i> {getcontactnumber}
                        </span>
                      </Col>
                      <Col>
                        <span>
                          <i className="flaticon-m"></i> {getemail}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="user-tabs-main">
                  <div className="user-tabs">
                    <ul>
                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("editprofile")}
                          activeClassName={
                            this.state.type === "editprofile" ||
                            this.state.type === "updateprofile"
                              ? "active-user"
                              : ""
                          }
                        >
                          Edit Profile
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("booking")}
                          activeClassName={
                            this.state.type === "booking" ? "active-user" : ""
                          }
                        >
                          My Booking <span>5</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("review")}
                          activeClassName={
                            this.state.type === "review" ? "active-user" : ""
                          }
                        >
                          My Reviews <span>5</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="#"
                          onClick={this.ChangeTab("chat")}
                          activeClassName={
                            this.state.type === "chat" ? "active-user" : ""
                          }
                        >
                          Charts <span>5</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="userdiv">
                  {this.state.type === "editprofile" ? (
                    <EditProfile data={this.state} />
                  ) : (
                    ""
                  )}
                  {this.state.type === "updateprofile" ? (
                    <UpdateProfile data={this.state.getid} />
                  ) : (
                    ""
                  )}
                  {this.state.type === "booking" ? <Booking /> : ""}
                  {this.state.type === "review" ? <MyReview /> : ""}
                  {this.state.type === "chat" ? <Chat /> : ""}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
