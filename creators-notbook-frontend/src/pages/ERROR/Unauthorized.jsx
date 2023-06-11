import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleToHomeButton = () => {
    navigate("/");
  };

  return (
    <Container>
      공개되지 않은 프로젝트입니다.
      <Button variant="contained" onClick={handleToHomeButton}>홈으로</Button>
    </Container>
  );
}
