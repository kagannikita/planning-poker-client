import { useState } from "react";
import { IPlayer } from "src/interfaces/LobbyTypes"

export const usevoteForKick = (socket: SocketIOClient.Socket) => {

  const [PlayersQuanity, setPlayersQuanity] = useState(0);
  const [quanityVotes, setQuanityVotes] = useState(0);

  socket.emit('players:get', (players: IPlayer[]) => {
    setPlayersQuanity(players.length)
  })

 
  
}