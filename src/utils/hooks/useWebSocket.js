import { useContext } from "react";
import { SocketContext } from "../wsProvider";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  return socket;
};
