import { useEffect, useState, createContext } from "react";
import { WEBSOCKET } from "./config";

const webSocket = new WebSocket(WEBSOCKET);

export const SocketContext = createContext(webSocket);

export const SocketProvider = (props) => {
    const [ws, setWs] = useState(webSocket);

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                setWs(new WebSocket(WEBSOCKET));
            }, 1000);
        };
        ws.addEventListener("close", onClose);
        return () => {
            ws.removeEventListener("close", onClose);
        };
    }, [ws, setWs]);

    return (
        <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
    );
};