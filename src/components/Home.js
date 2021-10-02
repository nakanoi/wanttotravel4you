import React from 'react';

const Home = (props) => {
  return(
    <React.Fragment>
      <h2>Want To Travel 4 You</h2>
      {props.type === null ? (
        <React.Fragment>
          <section>
          <p>観光客のニーズ/観光業者のニーズ</p>
            <p>各ニーズに細かく応える</p>
          </section>
        </React.Fragment>
      ) : (
        props.type === 'agent' ? (
          <React.Fragment>
            <h3>ANALYSIS<small>地域の旅行者の傾向を分析</small></h3>
            <section>
            <p>地域の旅行者の傾向を知ることができる</p>
            </section>
            <h3>FIND<small>地域の事業者を発掘</small></h3>
            <section>
            <p>まだ知らぬ自分の周りの事業者を知り、新たな観光を確立</p>
            </section>
            <h3>GET REQUEST<small>旅行者からのリクエストを見る</small></h3>
            <section>
            <p>旅行者からのリアルなリクエストを知り、自身の観光に活用</p>
            </section>
            <h3>CHAT<small>気になる事業者や旅行者にコンタクト</small></h3>
            <section>
            <p>事業者や旅行者と細かな詳細について詰め合わせ</p>
            </section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3>旅行者のリクエストを送信</h3>
            <section>
            <p>これまでにない、自身のニーズを事細かく事業者に伝える</p>
            </section>
            <h3>事業者のコンタクトを期待</h3>
            <section>
            </section>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default Home;
