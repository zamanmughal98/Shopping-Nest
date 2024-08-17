import '../../../styles/errorPage.css';

const ErrorPage = ({ name, code, message }) => {
  return (
    <section className="errorPageWrapper">
      <section className="errorInformationColumn">
        <div className="errorNameStyles">{name}</div>
        <div className="xlFont marginLeft10px">{code}</div>
      </section>
      <div className="xlFont marginTop10px">{message}</div>
    </section>
  );
};
export default ErrorPage;
