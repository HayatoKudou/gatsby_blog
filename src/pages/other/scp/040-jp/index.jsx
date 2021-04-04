import React, {useEffect, useState, useRef, createRef} from 'react';
import SEO from '../../../../components/Seo';
import { Layout, Row, Col } from 'antd';
import * as style from './040-jp.module.css';
import First from "../../../../images/scp/040-jp-1.jpg"
import Second from "../../../../images/scp/040-jp-2.png"

const OtherPage = () => {

    const Explanation_1 = `
アイテム番号: SCP-040-JP

オブジェクトクラス: Safe
    `;

    const Explanation_2 = `
特別収容プロトコル: SCP-040-JPは、SCP-040-JPに覆いかぶせるように立てられた収容棟内部に収容されています。
収容棟はサイト-8120の管轄に置かれています。収容棟に入った際は、決してSCP-040-JPの内部を視認しない様にしてください。
もしSCP-040-JP内部を見る必要がある場合は、必ずカメラを通して確認し、直接肉眼で視認しないようにしてください。
直接見る必要がある場合のみ、Dクラス職員に視認させてください。
曝露した職員とのコミュニケーションはせず、此方から一方的に指示を与える迄に留めてください。


説明: SCP-040-JPは、██県の旧██村に放置されていた、井戸小屋です。小屋は木造で、幅約5m、奥行き4mほどの平屋です。
小屋の中央には古い年代に造られたと推測される石造の井戸が存在し、真っ直ぐ地下へと続いています。井戸は異常に深く、探査機による調査でもこの井戸が何処まで続いているのかは未だ不明のままです。

元々小屋は鉄鎖と複数の南京錠で固く施錠されていましたが、劣化により壊れ侵入可能になっていました。SCP-040-JPは1967年の事案[編集済]により収容に至りました。

【警告: 19██年のインシデント-040-JP-001の発覚後、以下の文章は対ミーム予防措置無しの閲覧が禁止されました。担当者は必ずセクター-8120-煤で処置253-"柳煤"を受けてください】
    `;

    const Explanation_3 = `
ロック解除中...

ロックが解除されました。
    `;

    const Explanation_4 = `
この小屋の中を人間が覗き込むと、対象は激しく動揺し、「ねこが居た」と報告します。
更に対象はこの"ねこが居る"という観念に、以降強く執着する事になります。
この影響は写真や映像では発生せず、肉眼で直接小屋内部を視認した場合のみ発生します。
なおカメラ映像では、前述の小屋の様子が映し出されるされるのみで、報告される猫は確認されていません。

曝露した対象は全てのイエネコ(学名：Felis silvestris catus)に対する認識が歪められます。
曝露した被験者へのインタビューでは、イエネコが毛が無く造作の無い顔に人間の様な二つの目が付いた動物に見え、どの方向から見てもこちらを真っ直ぐ見つめてくる様に見えると報告されています。

さらに、曝露した対象は数日～数週間の間に、この"ねこ"が暗闇に居るように感じると報告し始め、常にこの"ねこ"の視線を気にする様になります。
"ねこ"の存在が報告される暗闇の条件には一切の規則性が判明しておらず、暗闇にねこが現れるには曝露した対象が監視されている様に感じられます。
監視の目的やその総数も判明していません。

ねこはこのような見た目でした。
    `;

    const Explanation_5 = `
研究班の調査記録によると、この"ねこ"が現れる位置として、人間の視野角の内水晶体或いは角膜辺の位置が有力視されています。
つまり、中心視野から外れた位置及び視野中の暗所に集中し統計的に有意な結果を示していました。
結果として、19██年に行われたDクラス職員を用いた診査でこの性質が明らかに示されましたが、
[データ削除済]の提唱した仮説に依ればSCP-040-JPの内部に存在する大深度地下構造からの暗所が、明らかに影響を及ぼしている物と推測されています。

直接的に人間が視認した際にのみ発生する事が判明しており、そのためSCP-040-JP内部井戸構造への無線探査装置による探査が行われました。
結果では29██m地下迄到達しましたが、壁が玄武岩から構成されている事は判明しましたが、
きいてますかSCP-040-JP外部からの平行調査では明らかに岩盤のみが存在しているのみでした。
曝露した対象の報告する実体は観測されませんでした。

[データ削除済]

また、曝露した対象は「"ねこ"が居る」という観念を他者に積極的に伝えようとします。
ある程度この観念を理解した人間は、最初に曝露した対象と同様の反応及び認識異常を被る事になります。
どの程度話を聞けばそうなるのか、それとも何かトリガーとなるワードが存在するのかはわかっていませんが、これはねこです

ねこはいます。いますその観念を伝えるのに必要な媒体は特に制限は無く、発話・文章・映像・絵画など、あらゆる媒体でも効果があります。
その為曝露した対象自体に異常性があるのではなく、この"ねこ"はそこに居ます観念その物にミーム的効果があると推測されています（担当者は文書「[編集済]」を参照してください）。
います。この観念伝達の為の行動は極めて自然な物を装う為、曝露最初期の動揺を抜けた後では、対象が曝露して影響下にあるかどうか判断する事は困難です。ねこでした



よろしくおねがいします
    `;

    const Explanation_6 = `
インシデントレポート040-JP-001: 19██/██/██、
この報告書の影響と思われる大規模なミーム災害がサイト-8120で発生しました。
報告書提出時点で執筆した職員、並びに受理した上位職員がSCP-040-JPのミームに曝露して居た物と考えられています。
曝露した職員は記憶処理或いは解雇処分が為されました。これ以降報告書提出の際は全て対ミーム処置1を経由させる事が決定しました。

Footnotes
1. この様な失態を二度と繰り返さない為の対ミーム処置です。報告書提出の際はこの処置を必ず行うようにしてください。
宜しくお願いします。 - 資料室管理者
    `;

    const section1 = useRef('');
    const section2 = useRef('');
    const bottom = useRef('');

    const [word_1, set_word_1] = useState('');
    const [word_2, set_word_2] = useState('');
    const [word_3, set_word_3] = useState('');
    const [word_4, set_word_4] = useState('');
    const [word_5, set_word_5] = useState('');
    const [word_6, set_word_6] = useState('');
    const [showFlag1, set_showFlag1] = useState(true);
    const [showFlag2, set_showFlag2] = useState(true);

    let index = 0;
    let index2 = 0;
    let index3 = 0;
    let index4 = 0;
    let index5 = 0;
    let index6 = 0;
    
    var timer;
    var timer2;
    var timer3;
    var timer4;
    var timer5;
    var timer6;
    var timer7;

    useEffect(() => {
        readWord('section1');
        return () => {
            // Unmount時の処理を記述
            clearTimeout(timer);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timer7);
        };
    }, [])

    function readWord(name){
        if(name === 'section1'){
            timer = setInterval(() => {
                if(index === Explanation_1.length+1){
                    scroll('section1');
                    set_showFlag1(false);
                    section1.current.scrollIntoView();
                    clearInterval(timer);
                    return;
                }
                set_word_1(Explanation_1.substring(0, index++))
            }, 60)
        } else if(name === 'section2'){
            timer2 = setInterval(() => {
                if(index2 === Explanation_2.length+1){
                    readWord('section3');
                    clearInterval(timer2);
                    return;
                }
                bottom.current.scrollIntoView();
                set_word_2(Explanation_2.substring(0, index2++))
            }, 50)
        } else if(name === 'section3'){
            timer4 = setInterval(() => {
                if(index3 === Explanation_3.length+1){
                    readWord('section4');
                    clearInterval(timer4);
                    return;
                }
                bottom.current.scrollIntoView();
                set_word_3(Explanation_3.substring(0, index3++))
            }, 100)
        } else if(name === 'section4'){
            timer5 = setInterval(() => {
                if(index4 === Explanation_4.length+1){
                    scroll('section4');
                    set_showFlag2(false);
                    clearInterval(timer5);
                    return;
                }
                bottom.current.scrollIntoView();
                set_word_4(Explanation_4.substring(0, index4++))
            }, 50)
        } else if(name === 'section5'){
            timer6 = setInterval(() => {
                if(index5 === Explanation_5.length+1){
                    clearInterval(timer6);
                    readWord('section6');
                    return;
                }
                bottom.current.scrollIntoView();
                set_word_5(Explanation_5.substring(0, index5++))
            }, 50)
        } else if(name === 'section6'){
            timer7 = setInterval(() => {
                if(index6 === Explanation_6.length+1){
                    clearInterval(timer7);
                    return;
                }
                bottom.current.scrollIntoView();
                set_word_6(Explanation_6.substring(0, index6++))
            }, 50)
        }
    }

    function scroll(name){
        if(name == 'section1'){
            section1.current.scrollIntoView();
            const timer3 = setTimeout(function(){
                readWord('section2');
            }, 3000);
        } else if(name == 'section4'){
            bottom.current.scrollIntoView();
            const timer6 = setTimeout(function(){
                readWord('section5');
            }, 4000);
        }
    }

    return (
        <div className={style.root}>
            <SEO
              title="SCP-040-JP"
              description="SCP-040-JP"
              path="scp"
            />
            <p className={style.word}>
                {word_1}
            </p>
            <div ref={section1}></div>
            <div className={style.images} style={{ display: showFlag1 ? 'none' : '' }}>
                <img className={style.image} src={First} alt="040-jp-1"/>
            </div>
            <p className={style.word2}>
                {word_2}
            </p>
            <p className={style.word}>
                {word_3}
            </p>
            <p className={style.word2}>
                {word_4}
            </p>            
            <div className={style.images} style={{ display: showFlag2 ? 'none' : '' }}>
                <img className={style.image} src={Second} alt="040-jp-2"/>
            </div>
            <p className={style.word2}>
                {word_5}
            </p>
            <p className={style.word}>
                {word_6}
            </p>
            <div ref={bottom}></div>
        </div>
    );
};

export default OtherPage;
