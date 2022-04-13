import SubmitButton from "./SubmitBtn";
import UserStore from "./store/userStore";

const Header = (props) => {
  return (
    <header className="header">
      Welcome {UserStore.username}
      <SubmitButton
        text={"Log out"}
        disabled={false}
        onClick={() => props.onClick()}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "RW Health @vrDev",
};

export default Header;
