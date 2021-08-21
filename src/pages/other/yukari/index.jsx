/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import * as style from './yukari.module.css';

import {
    Layout, Row, Col,
} from 'antd';
import Header from '../../../components/PageLayout/Header';
import SEO from '../../../components/Seo';
import SidebarWrapper from '../../../components/PageLayout/Sidebar';
import Guide from '../../../components/PageLayout/Guide';

import NEUTRAL from "../../../images/yukari/1.png"
import POSITIVE from "../../../images/yukari/4.png"
import NEGATIVE from "../../../images/yukari/9.png"

const App = () => {

    const form = useRef(null)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [sentiment, setSentiment] = useState('NEUTRAL');
    // const [sentimentScore, setSentimentScore] = useState();
    const [chatMessage, setChatMessage] = useState([{ user: 'bot', type: 'text', message: 'はじめまして、結月ゆかりです。' }]);

    useEffect(() => {
        renderChatMessage(chatMessage);
    }, []);

    function onSubmit(e) {
        reset();
        sendUserChat(e.message);
        sendBotChat(e.message);
    }

    // ユーザー入力
    function sendUserChat(arg_message) {
        let message = chatMessage;
        setChatMessage([...chatMessage, {
            user: 'user', type: 'text', message: arg_message,
        }]);
        message.push({ user: 'user', type: 'text', message: arg_message });
        renderChatMessage(message);
    }

    function sendBotChat(arg_message) {
        let message = chatMessage;
        fetch('https://vrf4gfp4p8.execute-api.ap-northeast-1.amazonaws.com/production/getwatsonass', {
            method: 'POST',
            // mode: 'cors',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Access-Control-Allow-Headers" : "Content-Type",
                // "Access-Control-Allow-Origin": '*',
                // "Access-Control-Allow-Methods": "POST, OPTIONS",
                // "Access-Control-Allow-Credentials" : true
            },
            body: JSON.stringify({ "text": arg_message }),
        })
            .then(res => res.json())
            .then(json => {
                // setSentiment(objects.sentimentObj.sentiment);
                // setSentimentScore(objects.sentimentObj.sentimentScore);
                const objects = JSON.parse(json);
                objects.watsonTexts.map(val => {
                    console.log(val)
                    setChatMessage([...chatMessage,
                    { user: 'bot', type: val.response_type, message: val.text, }
                    ]);
                    message.push({ user: 'bot', type: val.response_type, message: val.text, options: val.response_type == 'option' && val.options });
                })
                renderChatMessage(message);
            })
            .catch(error => console.log(error));
    }

    function renderChatMessage(message) {
        let elms = [];
        // console.log(message)
        message.map((val, index) => {
            if (val.type === 'text') {
                elms.push(<div key={index} className={style['arrow_box'] + ' ' + style[val.user]}>{val.message}</div>);
            } else if (val.type === 'option') {
                const answerElm = <div key={index} className={'arrow_box ' + val.user}>{
                    val.options.map((op_val, op_index) => {
                        return (<button key={op_index} className={style.answerButton}>
                            {op_val.value.input.text}
                        </button>);
                    })
                }</div>
                elms.push(answerElm);
            }
        })
        ReactDOM.render(elms, document.getElementById('chat_message'));

        const el = document.getElementById('chat_message');
        el.scrollTo(0, el.scrollHeight);
    }

    let imgPath;
    if (sentiment === 'NEUTRAL') {
        imgPath = NEUTRAL;
    } else if (sentiment === 'POSITIVE') {
        imgPath = POSITIVE
    } else if (sentiment === 'NEGATIVE') {
        imgPath = NEGATIVE
    } else {
        imgPath = NEUTRAL
    }

    return (
        <Layout className="outerPadding">
            <Layout className="container">
                <Header />
                <SEO
                    title="Yukari"
                    description="ゆかりさんBOT"
                    path="other/yukari"
                />
                <SidebarWrapper>
                    <>
                        <div className="marginTopTitle">
                            <h1 className="titleSeparate">#Yukari(メンテナンス中)</h1>
                        </div>
                        <Row gutter={[30, 20]}>
                            <div style={{ display: 'flex' }}>
                                <div className={style.chat_container}>
                                    <div className={style.chat_message} id="chat_message"></div>
                                    <form ref={form} onSubmit={handleSubmit(onSubmit)} className={style.chatInputForm}>
                                        <input style={{ width: '70%', height: '40px' }} {...register('message', { required: true })} autoComplete="off" />
                                    </form>
                                </div>
                                <img className={style.bot_image} src={imgPath}></img>
                            </div>
                        </Row>
                    </>
                </SidebarWrapper>
                <Guide />
            </Layout>
        </Layout>
    );
}

export default App;