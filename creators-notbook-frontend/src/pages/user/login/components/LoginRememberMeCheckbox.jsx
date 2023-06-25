import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import PropTypes from "prop-types";

LoginRemeberMeCheckbox.propTypes = {
  rememberMe: PropTypes.bool,
  setRememberMe: PropTypes.func,
};

/**
 * 로그인시 로그인 유지 여부를 확인한다.
 * @param {{rememberMe : boolean, setRememberMe : function}} 기억세팅용 변수 및 useState setter
 */
export default function LoginRemeberMeCheckbox({ rememberMe, setRememberMe }) {
  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };
  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={rememberMe} name="rememberMe" />}
        onChange={handleRememberChange}
        label={<Typography>로그인 유지하기</Typography>}
      />
    </Box>
  );
}
