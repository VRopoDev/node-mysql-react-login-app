import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitBtn";
import UserStore from "./store/userStore";
import "./App.css";

class PasswordResset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repeatpass: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      repeatpass: "",
      buttonDisabled: false,
    });
  }
  hasUpper(str) {
    return /[a-z]/.test(str) && /[A-Z]/.test(str);
  }

  passwordValidation() {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (this.state.password.length < 10) {
      alert("Password must have at least 10 characters long!");
      return false;
    } else if (!this.hasUpper(this.state.password)) {
      alert("Password must contain at 1 uppercase letter!");
      return false;
    } else if (!format.test(this.state.password)) {
      alert("Password must contain at 1 special character!");
      return false;
    } else if (this.state.password !== this.state.repeatpass) {
      alert("Passwords must match!");
      return false;
    }
    return true;
  }

  async validateForm() {
    // Check first if username exist
    try {
      let res = await fetch("findUsername", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
        }),
      });

      let result = await res.json();
      if (result && result.success === false) {
        alert("Useraname does not exist, please try another again!");
        return false;
      }
    } catch (err) {
      this.resetForm();
      alert("Something went wrong, please try again");
      return false;
    }
    // Validate the password
    if (!this.passwordValidation()) return false;

    return true;
  }

  async changePass() {
    if (!this.state.username) return;
    if (!this.state.password) return;
    if (!this.state.repeatpass) return;
    if (!this.validateForm()) return;
    this.setState({
      buttonDisabled: true,
    });

    try {
      let res = await fetch("passwordReset", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        alert(
          "You have successfully reset your password, use your ne password to login!"
        );
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.message);
      }
    } catch (e) {
      this.resetForm();
      alert("Something went wrong, please try again");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="loginForm">
          Reset your password
          <InputField
            type="text"
            placeholder="Username"
            value={this.state.username ? this.state.username : ""}
            onChange={(val) => this.setInputValue("username", val)}
          />
          <InputField
            type="password"
            placeholder="New Password"
            value={this.state.password ? this.state.password : ""}
            onChange={(val) => this.setInputValue("password", val)}
          />
          <InputField
            type="password"
            placeholder="Repeat Password"
            value={this.state.repeatpass ? this.state.repeatpass : ""}
            onChange={(val) => this.setInputValue("repeatpass", val)}
          />
          <SubmitButton
            text={"Reset"}
            disabled={false}
            onClick={() => this.changePass()}
          />
        </div>
      </div>
    );
  }
}

export default PasswordResset;
