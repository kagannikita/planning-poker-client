import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import { useBeforeUnload, useLocalStorage } from '.'
import { API } from 'src/interfaces/ApiEnum'
import { IMessage, IPlayer } from 'src/interfaces/LobbyTypes'
import IssueType from 'src/interfaces/IssueType'

export interface IUseLobbyDataSocket {
  players: IPlayer[];
  messages: IMessage[];
  issues: IssueType[];
  sendMessage: ({ msgText, senderName }: {
    msgText: string;
    senderName: string;
  }) => void;
  removeMessage: (id: string) => void;
  createIssue: ({ title, priority }: IssueType) => void;
  removeIssue: (id: string) => void;
  updateIssue: ({ id, title, priority }: IssueType) => void;
}

const SERVER_URL = API.MAIN_API;

export const useLobbyDataSocket = (lobbyId: string, userId: string): IUseLobbyDataSocket => {
  const [players, setplayers] = useState<IPlayer[]>([])
  const [messages, setMessages] = useState<IMessage[]>([])
  const [issues, setIssues] = useState<IssueType[]>([])

  // const [userId] = useLocalStorage('userId', nanoid(8))
  // const [username] = useLocalStorage('username')

  const socketRef = useRef<SocketIOClient.Socket | null>(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { lobbyId }
    })

    // socketRef.current.emit('user:add', { username, userId })

    // socketRef.current.on('players', (players: IPlayer[]) => {
    //   setplayers(players)
    // })

    // socketRef.current.emit('message:get')

    // socketRef.current.on('messages', (messages: IMessage[]) => {
    //   const newMessages = messages.map((msg) =>
    //     msg.id === userId ? { ...msg, currentUser: true } : msg
    //   )
    //   setMessages(newMessages)
    // })
    
    socketRef.current.emit('issues:get')

    socketRef.current.on('issues', (issues: IssueType[]) => {
      const newIssues = issues.map((iss) => iss)
      setIssues(newIssues)
    })


    return () => {
      if(socketRef.current === null) return
      socketRef.current.disconnect()
    }
  }, [lobbyId, userId])

  const sendMessage = ({ msgText, senderName }: {
    msgText: string,
    senderName: string
  }) => {
    if (socketRef.current === null) return
    socketRef.current.emit('message:add', {
      userId,
      msgText,
      senderName
    })
  }

  const removeMessage = (id: string) => {
    if (socketRef.current === null) return
    socketRef.current.emit('message:remove', id)
  }

  const createIssue = ({ title, priority }: IssueType) => {
    if (socketRef.current === null) return
    socketRef.current.emit('issue:add', {
      title,
      priority
    })
  }

  const updateIssue = ({ id, title, priority }: IssueType) => {
    if (socketRef.current === null) return
    socketRef.current.emit('issue:update', {
      id,
      title,
      priority
    })
  }
  const removeIssue = ( id: string) => {
    if (socketRef.current === null) return
    socketRef.current.emit('issue:delete', id)
  }

  useBeforeUnload(() => {
    if (socketRef.current === null) return
    socketRef.current.emit('user:leave', userId)
  })

  return { players, messages, issues, sendMessage, removeMessage, createIssue, removeIssue, updateIssue }
}