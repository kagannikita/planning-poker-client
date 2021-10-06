import { createContext } from "react"
import io from 'socket.io-client'
import { API } from "../interfaces/ApiEnum"

// const socket = useMemo(() => io(API.MAIN_API, { query: props.lobbyId }), [playerId])

export interface SocketState {
  mainSpace: SocketIOClient.Socket;
  lobbySpace: SocketIOClient.Socket;
  gameSpace: SocketIOClient.Socket;
  issueSpace: SocketIOClient.Socket;
}

// export const socket: SocketState = {
//   mainSpace: io(API.MAIN_API),
//   lobbySpace: io(API.MAIN_API + 'lobby'),
//   gameSpace: io(API.MAIN_API + 'game'),
//   issueSpace: io(API.MAIN_API + 'issue')
// }
export const socket = io(API.MAIN_API )
const SocketContext = createContext(socket)

export default SocketContext
