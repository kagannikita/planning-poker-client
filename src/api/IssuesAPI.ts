import Issue from "src/interfaces/IssueType";
import  io  from "socket.io-client";

interface IIssuesAPI {
  // socket: Socke
  issues: Issue[],
  create(): Promise<Issue>,
  delete(id: string): Promise<void>,
  change(id: string, dataIssue: Issue): Promise<Issue>
  getAll(): Promise<Issue[]>
  connectSocket(url: string): void
  disconnectSocket(url:string): void
}

export class IssuesAPI implements IIssuesAPI {
  socket: SocketIOClient.Socket;
  issues: Issue[] = [];

  constructor(url: string) {
    this.socket = io(url)
  }

  // socket : SocketIOClient.Socket | undefined

  connectSocket(url: string): void {
    
  }
  disconnectSocket(url: string): void {
    throw new Error("Method not implemented.");
  }
  create(): Promise<Issue> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  change(id: string, dataIssue: Issue): Promise<Issue> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Issue[]> {
    throw new Error("Method not implemented.");
  }
}