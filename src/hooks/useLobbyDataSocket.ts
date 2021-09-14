import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import { useBeforeUnload, useLocalStorage } from '.'
import { API } from '../interfaces/ApiEnum'
import { IMessage, IPlayer } from '../interfaces/LobbyTypes'
import IssueType from '../interfaces/IssueType'

export interface IUseLobbyDataSocket {
  players: IPlayer[];
  messages: IMessage[];
  issues: IssueType[];
  sendMessage: ({ msgText, senderName }: {
    msgText: string;
    senderName: string;
  }) => void;
  removeMessage: (id: string) => void;
  createIssue: ({ name, priority }: IssueType) => void;
  removeIssue: (id: string) => void;
  updateIssue: ({ id, name, priority }: IssueType) => void;
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

  const createIssue = ({ name, priority }: IssueType) => {
    if (socketRef.current === null) return
    socketRef.current.emit('issue:add', {
      name,
      priority
    })
  }

  const updateIssue = ({ id, name, priority }: IssueType) => {
    if (socketRef.current === null) return
    socketRef.current.emit('issue:update', {
      id,
      name,
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