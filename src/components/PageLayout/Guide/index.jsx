/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { navigate } from "gatsby"
import Hiiro from '../../../images/scp/444-jp.png';
import Nekodesu from '../../../images/scp/040-jp.jpeg';
import * as style from './guide.module.less';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClearIcon from '@material-ui/icons/Clear';
import InsertCommentRoundedIcon from '@material-ui/icons/InsertCommentRounded';

export default function Guide() {

    const intervalRef = useRef(null);

    const [pick_char, set_pick_char] = useState('');
    const [show, set_show] = useState(false);
    const [word, set_word] = useState('');
    const [progress, setProgress] = useState(0);

    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var monthDay = month + "月" + day + "日 ";
    var url = 'https://ja.wikipedia.org/w/api.php?format=json&utf8&action=query&origin=*&prop=revisions&rvprop=content&titles=';
    url = url + monthDay;
    var pageid = [];


    useEffect(() => {
        radomPick();
        interval();
    }, []);

    function radomPick() {
        const no = get_random(1, 2);
        set_pick_char(no);
    }

    function interval() {
        const timer = setInterval(() => {
            select_word();
            setTimeout(function () { set_word(''); }, 10000);
        }, 60000)
    }

    function get_random(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    function select_word() {
        var random = get_random(1, 3);
        switch (random) {
            case 1:
                getWiki();
                break;
            case 2:
                getWiki();
                break;
            case 3:
                getWiki();
                break;
        }
    }

    function getWiki() {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                for (var id in data.query.pages) {
                    pageid.push(id);
                }
                var content = data.query.pages[pageid[0]].revisions[0]["*"];
                var dekigoto = content.match(/== できごと ==[\s\S]*== 誕生日 ==/);

                var article = dekigoto[0].match(/\*.+\n/g);
                var numberArticle = [];
                while (true) {
                    var rand = Math.floor(Math.random() * article.length);
                    numberArticle.push(rand);
                    numberArticle = numberArticle.filter(function (x, i, self) {
                        return self.indexOf(x) === i;
                    })
                    if (numberArticle.length == 1) {
                        break;
                    }
                }
                var outputText = monthDay + "のできごと\n";
                numberArticle.forEach(function (numLine) {
                    outputText = outputText + article[numLine] + "\n";
                });
                set_word(outputText);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function saveGuideSetting(open){
        localStorage.setItem('guide_show', open);
        set_show(open);
    }

    let n = 1;

    const mouseOver = () => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            n++;
            if (pick_char == 1) {
                set_word('Thank you See you');
                if (n == 100) {
                    clearInterval(intervalRef.current);
                    navigate('/other/scp/444-jp');
                }
            } else if (pick_char == 2) {
                set_word('こんにちは ねこです');
                if (n == 100) {
                    clearInterval(intervalRef.current);
                    navigate('/other/scp/040-jp')
                }
            }
            setProgress(n);
        }, 30);
    };

    const mouseOut = useCallback(() => {
        n = 0;
        set_word('');
        setProgress(n);
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    const storage_show = localStorage.getItem('guide_show');
    let guide_show;
    if(storage_show){
        guide_show = storage_show;
    } else {
        guide_show = show
    }

    return (
        <div className={style.root}>
            {(guide_show === 'true' && word != '') && (
                <div className={style.balloon}>
                    <p>{word}</p>
                </div>
            )}
            {guide_show === 'true' ?
                <div className={style.image_form}>
                    <ClearIcon className={style.image_clear} fontSize="small" onClick={() => saveGuideSetting(false)} />
                    {pick_char == 1 ?
                        (<img className={style.image_icon} src={Hiiro} alt="scp-444-jp" onMouseOver={mouseOver} onMouseOut={mouseOut} />)
                    : pick_char == 2 ?
                        (<img className={style.image_icon} src={Nekodesu} alt="scp-040-jp" onMouseOver={mouseOver} onMouseOut={mouseOut} />)
                    : ''}
                    <LinearProgress variant="determinate" value={progress} className={progress == 0 ? style.none : style.flex} />
                </div>
            :
                <InsertCommentRoundedIcon  fontSize="large" className={style.call_icon} onClick={() => saveGuideSetting(true)} />
            }
        </div>
    );
};
