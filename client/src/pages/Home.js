
const Home = (props) => {
  
  return (
    <div>
      <h1>Hello!</h1>

      { props.authUser && props.authUser.email !== undefined && (
        <p>We have a logged in user: { props.authUser.email } </p>
      )}
    </div>
  )
}

export default Home