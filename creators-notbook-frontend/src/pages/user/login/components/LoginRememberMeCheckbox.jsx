import PropTypes from "prop-types";

LoginRemeberMeCheckbox.propTypes = {
  rememberMe: PropTypes.bool,
  setRememberMe: PropTypes.func,
};

export default function LoginRemeberMeCheckbox({ rememberMe, setRememberMe }) {
  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };
  return (
    <>
      <input
        type="checkbox"
        name="rememberMe"
        id="remember-me"
        value={rememberMe}
        onChange={handleRememberChange}
      />
      <label htmlFor="remember-me">로그인 유지하기</label>
    </>
  );
}
