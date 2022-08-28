
const Home = (props) => {
  
  return (
    <div>
      <h1>Hello!</h1>
      <p>Welcome to My Rorschach -- Design abstract art with strangers, browse past creations, and weigh in on what you see! </p>

      { props.authUser && props.authUser.email !== undefined && (
        <p>We have a logged in user: { props.authUser.email } </p>
      )}
    </div>
  )
}

export default Home