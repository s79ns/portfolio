import React from "react";
import PropTypes from "prop-types";
class HelloWorld extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="react">Greeting: {this.props.greeting}</div>
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string,
};
export default HelloWorld;
