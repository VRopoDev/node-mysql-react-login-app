import React from "react";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordShown: false,
    };
  }

  render() {
    if (this.props.type === "password") {
      return (
        <div className="inputField">
          <input
            ref={this.inputRef}
            id={this.props.type}
            className="input"
            type={this.state.passwordShown ? "text" : "password"}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}
          />
          <button
            className="btn-link"
            onClick={() =>
              this.setState({ passwordShown: !this.state.passwordShown })
            }
          >
            {this.state.passwordShown ? "Hide password" : "Show password"}
          </button>
        </div>
      );
    } else {
      return (
        <div className="inputField">
          <input
            className="input"
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}
          />
        </div>
      );
    }
  }
}

export default InputField;
