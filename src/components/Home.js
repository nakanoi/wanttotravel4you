import React from 'react';

const Home = (props) => {
  return(
    <React.Fragment>
      <h1>Want To Travel 4 You</h1>
      {props.type === null ? (
        <React.Fragment>
          <section>
            <h2>Please Login.</h2>
          </section>
        </React.Fragment>
      ) : (
        props.type === 'agent' ? (
          <React.Fragment>
            <h2>How To use</h2>
            <section>
            </section>
            <h2>Analysis</h2>
            <section>
            </section>
            <h2>Find Agents Around You</h2>
            <section>
            </section>
            <h2>Request To Tourists</h2>
            <section>
            </section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>How To use</h2>
            <section>
            </section>
            <h2>Send Request</h2>
            <section>
            </section>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default Home;
