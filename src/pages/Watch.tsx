import { useParams } from "react-router-dom"

import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { API_BASE, HUB_BASE } from "../consts";
import { LegacyRef, useEffect, useRef, useState } from "react";
import VideoApi from "../api/VideoApi";
import { Button, Form } from "react-bootstrap";

import './Watch.css'
import MessageItem from "../components/ChatMessageItem";
import { FaPaperPlane } from "react-icons/fa";
import { getPlayer } from "../VideoPlayer";

export type ChatMessageType = {
    content: string,
    date: string,
    sender: string
}

export default function Watch() {
    const params: any = useParams();

    const [connection, setConnection] = useState<HubConnection>();

    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [message, setMessage] = useState<string>("");
    const [videoSrc, setVideoSrc] = useState<string>('');

    const inputMessageRef = useRef<HTMLInputElement>(null)

    const token = localStorage.getItem('token') ?? '';

    const [player, setPlayer] = useState<any>(null);
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        setConnection(new HubConnectionBuilder()
            .withUrl(`${HUB_BASE}/watch?room_id=${params.room_id}&video_id=${params.video_id}`, {
                accessTokenFactory: () => token
            })
            .build());

        VideoApi.getSrc(params.video_id)
            .then(res => setVideoSrc(res + "&js_api=1"));
    }, [])

    useEffect(() => {
        if (videoSrc.length > 0) {
            setPlayer(getPlayer(document.getElementById('video-iframe')))


        }
    }, [videoSrc])

    useEffect(() => {

        if (player != null && connection != null) {
            connection.invoke('getRole').then(res => setRole(res));

            player.on('started', (e: any) => {
                if (role === "ADMIN")
                    connection.invoke("PlayVideo", Number(e.time ?? 1))
            })

            player.on('resumed', (e: any) => {
                if (role === "ADMIN")
                    connection.invoke("PlayVideo", Number(e.time ?? 1))
            })

            player.on('paused', (e: any) => {
                if (role === "ADMIN")
                    connection.invoke('PauseVideo', Number(e.time ?? 1))
            })
            let prevTime = 0;
            player.on('timeupdate', (e: any) => {
                let currentTime = player.getCurrentTime();
                if (prevTime == 0) {
                    prevTime = currentTime;
                    return;
                }
                if (Math.abs(currentTime - prevTime) > 8)
                {
                    switch (player.getState())
                    {
                        case 'playing':
                            connection.invoke("PlayVideo", currentTime);
                            break;
                        case 'paused':
                            connection.invoke("PauseVideo", currentTime);
                            break;
                    }
                    prevTime = currentTime;
                }
                
            })
        }
    }, [player, role]);

    useEffect(() => {
        if (connection == null)
            return;
        if (connection.state != HubConnectionState.Connected && connection.state != HubConnectionState.Connecting)
            connection.start();
    })

    useEffect(() => {
        if (connection == null)
            return;
        if (connection.state === HubConnectionState.Connected) {
            connection.on("ReceiveMessage", (msg, name) => {
                setMessages(prevState => [...prevState, {
                    content: msg,
                    sender: name,
                    date: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
                }]);
            });

            connection.on("CreateRoom", (roomId, videoId) => {
                window.location.pathname = `/watch/${videoId}/${roomId}`;
            })

            connection.on("OnPlayVideo", (time) => {
                if (time == null || time < 0)
                    return;
                player?.seek(time)
                player?.play();
            })

            connection.on("OnPauseVideo", (time) => {
                if (time == null || time < 0)
                    return;
                player?.seek(time)
                player?.pause();
            })
        }




    }, [connection, player])

    const sendMessage = () => {
        connection?.invoke("SendMessage", message);
        console.log('sendMessage')
        setMessage('');
        if (inputMessageRef.current?.value)
            inputMessageRef.current.value = ''
    }

    return (
        <>
            <div className="watch-block col-12 vh-100 m-0 p-0 d-xl-flex">
                <div className="col-12 col-xl-9 h-100">
                    <iframe
                        src={`${videoSrc}`}
                        id="video-iframe"
                        frameBorder="0"
                        className="w-100 h-100 m-0 p-0"
                        allowFullScreen={true}
                        allow="encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" />
                </div>
                <div className="chat w-100">
                    <div className="chat-messages-block mb-2 overflow-auto px-2 mt-3">
                        {messages.map((item, index) => <MessageItem key={index} {...item} />)}
                    </div>
                    <div className="input-message-block d-flex">
                        <Form.Control
                            type="text"
                            className="rounded-0 bg-dark border-0 text-light w-100"
                            ref={inputMessageRef}
                            placeholder="Введите че-нить"
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Button className="rounded-0" onClick={sendMessage}>
                            <FaPaperPlane />
                        </Button>


                    </div>
                </div>
            </div>
        </>
    )
}