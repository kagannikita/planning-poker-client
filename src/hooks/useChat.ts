import { MutableRefObject, useState } from "react";
import { IMessage } from "src/interfaces/LobbyTypes";

interface IuseSocketChat {
  messages: IMessage[]
  sendMessage: ({ msgText, senderName }: { msgText: string; senderName: string }) => void
  removeMessage: (id: string) => void
}

export const useChat = (
  socketRef: MutableRefObject<SocketIOClient.Socket>,
  lobbyId: string,
  playerId: string
): IuseSocketChat => {
  const [messages, setMessages] = useState<IMessage[]>([])

  socketRef.current.emit('message:get')
  socketRef.current.on('messages', (messages: IMessage[]) => {
    const newMessages = messages.map((msg) =>
      msg.id === playerId ? { ...msg, currentUser: true } : msg
    )
    setMessages(newMessages)
  })

  const sendMessage = ({ msgText, senderName }: { msgText: string; senderName: string }) => {
    if (socketRef.current === null) return
    socketRef.current.emit('message:add', {
      playerId,
      msgText,
      senderName,
    })
  }

  const removeMessage = (id: string) => {
    if (socketRef.current === null) return
    socketRef.current.emit('message:remove', id)
  }

  return {
    messages,
    sendMessage,
    removeMessage
  }
}