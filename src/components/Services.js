import React from "react";
import Fouryou from './../fouryou.jpg'

const Services = () => {
  return (
      <div>
        <h2>SERVICES</h2>
        <p className="fouryou-wrap"><img src={Fouryou} alt="fouryou" /></p>
        <h3>4YOUの使い方って・・・？</h3>
        <section>
          <ol>
            <li>まずは登録するフォー！『観光客』と『観光業者』登録したい方を選ぶユー！</li>
            <li>メールアドレスとパスワードを用意するフォー！</li>
            <li>登録フォームを埋めるユー！</li>
            <li>メール認証を済ませるフォー！</li>
            <li>旅行者さんは好みに旅を設定するフォー！</li>
            <li>事業者さんはチャットを見るフォー！</li>
          </ol>
        <p>「YOUが皆さんのお手伝いをするフォ！よろしくおねがいしますユー！」</p>
        </section>
        <h3>4YOUではこんなことができるフォー！</h3>
        <h3>観光客SIDE</h3>
        <section>
          <ol>
            <li>穴場スポットを見つけられるフォー！条件にあったものが表示されるユー！</li>
            <li>知らないと力自分にあったオファーが届くフォー！</li>
            <li>過去の旅行プランが参考になるユー！</li>
          </ol>
        </section>
        <h3>観光業者SIDE</h3>
        <section>
          <ol>
            <li>マニアックな需要を発見できるフォー！</li>
            <li>お客さんと直接やり取りできるから安心ユー！</li>
            <li>地域の同業者さんと連携できるフォー！需要の確認と協力者さん探しもおまかせユー！</li>
          </ol>
        </section>
      </div>
    );
}

export default Services;
