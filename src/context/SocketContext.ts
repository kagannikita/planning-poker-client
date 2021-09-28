import { createContext } from "react"
import io from 'socket.io-client'
import { API } from "src/interfaces/ApiEnum"

// const socket = useMemo(() => io(API.MAIN_API, { query: props.lobbyId }), [playerId])
// export const socket = io(API.MAIN_API)

export interface SocketState {
  mainSpace: SocketIOClient.Socket;
  lobbySpace: SocketIOClient.Socket;
  gameSpace: SocketIOClient.Socket;
  issueSpace: SocketIOClient.Socket;
}

export const socket: SocketState = {
  mainSpace: io(API.MAIN_API),
  lobbySpace: io(API.MAIN_API + 'lobby'),
  gameSpace: io(API.MAIN_API + 'game'),
  issueSpace: io(API.MAIN_API + 'issue')
}
// socket = io(API.MAIN_API + 'chat')
const SocketContext = createContext<SocketState>(socket)

export default SocketContext