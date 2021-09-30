import React from 'react';

const Home = (props) => {
  return(
    <React.Fragment>
      <h2>Want To Travel 4 You</h2>
      {props.type === null ? (
        <React.Fragment>
          <section>
          </section>
        </React.Fragment>
      ) : (
        props.type === 'agent' ? (
          <React.Fragment>
            <h3>ANALYSIS<small>地域の旅行者の傾向を分析</small></h3>
            <section>
            </section>
            <h3>FIND<small>地域の事業者を発掘</small></h3>
            <section>
            </section>
            <h3>GET REQUEST<small>旅行者からのリクエストを見る</small></h3>
            <section>
            </section>
            <h3>CHAT<small>気になる事業者や旅行者にコンタクト</small></h3>
            <section>
            </section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3>SEND REQUEST</h3>
            <section>
            </section>
            <h3>WAIT FOR CONTACT</h3>
            <section>
            </section>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default Home;
