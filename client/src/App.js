import React from "react";
import { observer } from "mobx-react";
import UserStore from "./store/userStore";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Dashboard from "./Dashboard";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("isLoggedIn", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        let err =
          result && result.message
            ? result.message
            : "Something went wrong, please try again";
        console.log(err);
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      console.log("Something went wrong, please try again");
    }
  }

  async logout() {
    try {
      let res = await fetch("logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
      alert("Something went wrong, please try again");
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading...</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <>
            <Header onClick={() => this.logout()} />
            <Dashboard />
          </>
        );
      } else {
        return (
          <div className="app">
            <div className="container">
              <LoginForm />
              <Link className="link" to="/reset-password">
                Forgot your password?
              </Link>
              <Link className="link" to="/register-user">
                Don't you have an account yet?
              </Link>
            </div>
          </div>
        );
      }
    }
  }
}

export default observer(App);
