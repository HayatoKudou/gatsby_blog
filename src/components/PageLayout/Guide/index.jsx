import React, { useState, useEffect, useRef, useCallback } from 'react';
import { navigate } from "gatsby"  
import Hiiro from '../../../images/scp/444-jp.png';
import style from './guide.module.less';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Guide() {

    const intervalRef = useRef(null);

    const [word, set_word] = useState('');
    const [show, set_show] = useState(false);
    const [progress, setProgress] = useState(0);
    const [flag, setFlag] = useState(false);

    var now = new Date();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var monthDay = month+"月"+day+"日 ";
    var url = 'https://ja.wikipedia.org/w/api.php?format=json&utf8&action=query&origin=*&prop=revisions&rvprop=content&titles=';
    url = url + monthDay;
    var pageid = [];

    useEffect(() => {
        interval();
    }, []);

    function interval(){
        const timer = setInterval(() => {
            select_word();
            setTimeout(function(){set_word('');}, 10000);
        }, 60000)
    }

    function get_random(){
        var min = 1;
        var max = 3;
         return Math.floor( Math.random() * (max + 1 - min) ) + min ;
    }

    function select_word(){
        var random = get_random();
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

    function getWiki(){
        fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            for( var id in data.query.pages ) {
                pageid.push( id );
            }
            var content = data.query.pages[ pageid[0] ].revisions[0]["*"];
            var dekigoto = content.match(/== できごと ==[\s\S]*== 誕生日 ==/);

            var article = dekigoto[0].match(/\*.+\n/g);
            var numberArticle = [];
            while (true) {
                var rand = Math.floor( Math.random() * article.length) ;
                numberArticle.push(rand);
                numberArticle = numberArticle.filter(function (x, i, self) {
                    return self.indexOf(x) === i;
                })
                if (numberArticle.length == 1 ) {
                    break;
                }
            }
            var outputText = monthDay + "のできごと\n";
            numberArticle.forEach(function(numLine) {
                outputText = outputText + article[numLine] + "\n";
            });
            set_word(outputText);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    let n = 1;

    const mouseOver = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            n++;
            set_word('Thank you See you');
            if(n == 100){
                clearInterval(intervalRef.current);
                navigate('/other/scp/444-jp')
            }
            setProgress(n);
        }, 30);
    }, []);

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

    return (
        <div className={style.root}>
            {word != '' && (
                <div className={style.balloon}>
                    <p>{word}</p>
                </div>
            )}
            <div className={style.image_form}>
                <img className={style.image_icon} src={Hiiro} alt="scp-444-jp" onMouseOver={mouseOver} onMouseOut={mouseOut} />
                <LinearProgress variant="determinate" value={progress} className={progress == 0 ? style.none : style.flex } />
            </div>
        </div>
    );
};
