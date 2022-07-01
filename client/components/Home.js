import React from "react";
import { connect } from "react-redux";
import { getHistory } from "../store/userProfile";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

/**
 * COMPONENT
 */

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getOrderHistory();
    this.setState({
      first_name: this.props.user.first_name || "",
      last_name: this.props.user.last_name || "",
      email: this.props.user.email || "",
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //   this.props.updateUser({ ...this.props.user, ...this.state });
  }

  render() {
    const { orderHistory, user } = this.props;
    const { first_name, last_name, email } = this.state;
    const { handleSubmit, handleChange } = this;

    const orderHistoryToMap = orderHistory[0] ? orderHistory : [];

    return (
      <Container>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#808080",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          {user.first_name} {user.last_name}'s Profile
        </h1>
        <Container>
          <CardGroup>
            <Col className="d-flex">
              <Card
                className="flex-fill"
                style={{
                  width: "40rem",
                  height: "30rem",
                  color: "#4e4c4b",
                  border: "none",
                }}
              >
                <Card.Title className="text-center">Edit Profile</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Col style={{ width: "16rem" }}>
                      <Form.Label htmlFor="first_name">First Name</Form.Label>
                      <Form.Control
                        name="first_name"
                        type="text"
                        defaultValue={first_name}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                    <Col style={{ width: "16rem" }}>
                      <Form.Label htmlFor="lastName">Last Name</Form.Label>
                      <Form.Control
                        name="last_name"
                        type="text"
                        defaultValue={last_name}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                    <Row>
                      <Form.Label htmlFor="email">Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="text"
                        defaultValue={email}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Row>
                  </Form.Group>
                </Form>
                <Button
                  variant="secondary"
                  className="mt-auto"
                  type="submit"
                  style={{
                    width: "40rem",
                    position: "absolute",
                    bottom: "5rem",
                  }}
                >
                  Submit Changes
                </Button>
              </Card>
              <Card
                className="flex-fill"
                style={{
                  width: "40rem",
                  marginLeft: "5rem",
                  color: "#4e4c4b",
                  border: "none",
                }}
              >
                <Card.Title className="text-center">Order History</Card.Title>
                {orderHistoryToMap.map((individualOrder) => {
                  return individualOrder.cart_details.map((order) => {
                    return (
                      <Container key={order.product.id}>
                        <Image
                          src={order.product.image_url}
                          style={{ height: "250px" }}
                          fluid="true"
                        ></Image>
                        <li>Product Name: {order.product.name}</li>
                        <li>Product Type: {order.product.type}</li>
                        <li>Product Price: {order.product.price}</li>
                        <li>Qty: {order.product_quantity}</li>
                        <hr></hr>
                      </Container>
                    );
                  });
                })}
              </Card>
            </Col>
          </CardGroup>
        </Container>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth,
    orderHistory: state.userProfile,
  };
};

const mapDispatch = (dispatch) => ({
  getOrderHistory: () => dispatch(getHistory()),
});

export default connect(mapState, mapDispatch)(Home);

// {
//   {orderHistoryToMap.map((order) => {
//                   console.log('THIS IS ORDER', order);
//                   return (
//                     <Container key={order.product.id}>
//                       <Image
//                         src={order.product.image_url}
//                         style={{ height: '250px' }}
//                         fluid='true'
//                       ></Image>
//                       <li>
//                         Product Name: {order.product.name}
//                       </li>
//                       <li>
//                         Product Type: {order.product.type}
//                       </li>
//                       <li>
//                         Product Price: {order.product.price}
//                       </li>
//                       <li>Qty: {order.product_quantity}</li>
//                       <hr></hr>
//                     </Container>
//                   );
//                 })}
// }
