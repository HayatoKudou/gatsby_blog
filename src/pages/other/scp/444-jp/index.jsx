import React, {useEffect, useState, useRef, createRef} from 'react';
import SEO from '../../../../components/Seo';
import { Layout, Row, Col } from 'antd';
import style from './444-jp.module.css';
import First from "../../../../images/scp/444-jp-1.jpg"
import Second from "../../../../images/scp/444-jp-2.jpg"

const OtherPage = () => {

    const Explanation_1 = `
＝＝＝警告:プロトコル"焚書"発動下に無い状況で本ページにアクセスすることは禁じられています＝＝＝

"焚書"発動下にない状況でのアクセスは、即時の自動抹殺プログラムの発動に繋がります。
確認が完了する前に速やかに退出してください。プロトコル"焚書"発動下でSCP-444-JPの大規模な事象に対応する職員はそのまま待機してください。

アクセス開始…………………
　
　
　
セキュリティが解除されました…
444-out break状況の発動を確認…
プロトコル"焚書"の発動を確認…
緊急開示用データベースにアクセス…完了
SCP-444-JP情報を表示します　Thank you See you
    `;

    const Explanation_2 = `
SCP-444-JP被験者、元被験者、それらの手によって殺害された者、これら人物の血液が付着した紙媒体は全て、上記の報告書を含めSCP-444-JP-1へと分類されています。
全てのSCP-444-JP-1はサイト-8141を放棄せざるを得ない事例の発生後、セクター8137の地下130mにある特別収容カプセル内に格納されました。これらの移送、収容に関わったあらゆる人員に対してSCP-444-JPの情報は伏せられ、本ページへのアクセスはクリアランスレベル5の職員であっても制限されることとなりました。
情報の機密性の優先、そして分類自体の無意味さからオブジェクトクラスは割り当てられていません。これがSafeであろうがEuclidであろうがKeterであろうが、私達が為すべきことは何一つ変わりません。

サイト-8141のナンバーは他の施設へと引き継がれ、上記の事象は財団職員に対する大規模な記憶処理も含めて徹底的に隠蔽されました。更にSCP-444-JPに関するあらゆる情報は完全に破壊されています。私が、それを実行するただ一人の職員でした。
これを書いている時、SCP-444-JPを知るのはこの世界でただ一人であり、間も無くただの零人となるでしょう。
そうして、SCP-444-JPに関するものは、本ページと緊急対処プロトコル"焚書"の、心を持たない二つのシステムだけとなるのです。
それで間に合った、と私は思いたい。
しかしこの記録が閲覧されているということは、既に全てが手遅れなのでしょう。

私達はSCP-444-JPが最終的に引き起こす事象を把握することが出来ませんでした。
だからあなた達がどのように追い詰められているのか、それに対して有効な方法を示せないかもしれません。
ただ、一つ絶対的に確かなことがあります。それは奴が『認識の鳥』であるということです。
奴は既に完全に活性化したか実体化したのでしょう。私達は、あなた達は、手遅れなのでしょう。上記の事象で既に奴は十分に拡大してしまっていた、ということなのでしょう。
しかし、手遅れならば手遅れなりに打つ手はあるはずです。
少なくとも、あなたは奴がまだ小さかった頃の原本の写しを手に入れたのですから。

もう二度と、失敗を繰り返さないでください。SCP-444-JPに関しては、誰もが失敗してきました。

──[削除済]`;

    const section1 = useRef('');
    const section2 = useRef('');
    const bottom = useRef('');

    const [count, setCount] = useState(0);
    const [word_1, set_word_1] = useState('');
    const [word_2, set_word_2] = useState('');
    const [showFlag, set_showFlag] = useState(true);

    let index = 0;
    let index2 = 0;    

    useEffect(() => {
        // const uttr = new SpeechSynthesisUtterance("Hello World!");
        // window.speechSynthesis.speak(uttr);
        readWord('section1');
    }, [])

    function readWord(name){
        if(name === 'section1'){
            const timer = setInterval(() => {
                if(index === Explanation_1.length+1){
                    scroll('section1');
                    set_showFlag(false);
                    section1.current.scrollIntoView();
                    clearInterval(timer);
                    return;
                }
                set_word_1(Explanation_1.substring(0, index++))
            }, 60)
        } else if(name === 'section2'){
            const timer2 = setInterval(() => {
                if(index2 === Explanation_2.length+1){                    
                    clearInterval(timer2);                    
                    return;
                }
                bottom.current.scrollIntoView();
                set_word_2(Explanation_2.substring(0, index2++))
            }, 60)
        }
    }

    function scroll(name){
        if(name == 'section1'){
            section1.current.scrollIntoView();
            const timer3 = setTimeout(function(){
                readWord('section2');
            }, 5000);
        }
    }

    return (
        <div className={style.root}>
            <SEO
              title="SCP-444-JP"
              description="SCP-444-JP"
              path="scp"
            />
            <p className={style.word}>
                {word_1}
            </p>
            <div ref={section1}></div>
            <div className={style.images} style={{ display: showFlag ? 'none' : '' }}>
                <img className={style.image} src={First} alt="444-jp-1"/>
                <img className={style.image} src={Second} alt="444-jp-2"/>
            </div>
            <p className={style.word2}>
                {word_2}
            </p>
            <div ref={bottom}></div>
        </div>
    );
};

export default OtherPage;
