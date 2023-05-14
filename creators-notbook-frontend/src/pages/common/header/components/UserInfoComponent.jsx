export default function UserInfoComponent({ data }) {
  /**
   *
   * @param {string} email
   * @returns
   */
  const getEmailLocal = (email) => {
    return email.substring(0, email.indexOf("@"));
  };

  return (
    <div className="user-info-component">
      <div className="icon"> TEMP </div>
      <div className="user-info">
        <div className="user-name">{data.nickname}</div>
        <div className="user-email">{getEmailLocal(data.email)}</div>
      </div>
    </div>
  );
}
