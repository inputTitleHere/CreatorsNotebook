import Header from "../../common/header/Header";

/**
 * 로그인 페이지 최상단 컴포넌트.
 * 로그인 페이지를 표시.
 */
export default function Login() {
  return (
    <>
      <Header showLoginOption={false}/>
      <section className="login-section">
        <div>로그인</div>
      </section>
    </>
  );
}
