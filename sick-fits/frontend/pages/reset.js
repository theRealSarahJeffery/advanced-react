import Reset from '../components/Reset';

const ResetPage = props => {
  return (
    <div>
      <p>Reset your Password {props.query.resetToken}</p>
      <Reset resetToken={props.query.resetToken} />
    </div>
  )
};

export default ResetPage;
