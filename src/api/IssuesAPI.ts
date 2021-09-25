import axios from 'axios'
import { IssueType, IssueTypeAPI } from '../interfaces/IssueType'
import { API } from '../interfaces/ApiEnum'

interface IIssuesAPI {
	create(issue: IssueType): Promise<IssueType>
	createByTable(issue: IssueType[], lobby: string): Promise<IssueType[]>
	delete(issueId: string): Promise<IssueType>
	update(dataIssue: IssueType): Promise<IssueType>
	getAllByLobbyId(id: string): Promise<IssueType[]>
}

export class IssuesAPI implements IIssuesAPI {
	create(issue: IssueTypeAPI): Promise<IssueType> {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API.MAIN_API}${API.ISSUES}`, {
					name: issue.name,
					link: issue.link,
					score: issue.score,
					priority: issue.priority,
					lobby: issue.lobby,
				})
				.then((res) => resolve(res.data))
				.catch((err) => reject(err))
		})
	}

	delete(issueId: string): Promise<IssueType> {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${API.MAIN_API}${API.ISSUES}${issueId}`)
				.then((res) => resolve(res.data))
				.catch((err) => reject(err))
		})
	}

	update(dataIssue: IssueType): Promise<IssueType> {
		return new Promise((resolve, reject) => {
			axios
				.put(`${API.MAIN_API}${API.ISSUES}${dataIssue.id}`, {
					id: dataIssue.id,
					name: dataIssue.name,
					score: dataIssue.score,
					link: dataIssue.link,
					priority: dataIssue.priority,
				})
				.then((res) => resolve(res.data))
				.catch((err) => reject(err))
		})
	}

	getAllByLobbyId(id: string): Promise<IssueType[]> {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API.MAIN_API}${API.ISSUES}${id}`)
				.then((res) => resolve(res.data))
				.catch((err) => reject(err))
		})
	}
	createByTable(issue: IssueTypeAPI[], lobby: string): Promise<IssueType[]> {
		return new Promise((resolve, reject) => {
			for (const item of issue) {
				item.lobby = lobby
			}
			axios
				.post(`${API.MAIN_API}${API.ISSUES}table/`, issue)
				.then((res) => {
					resolve(res.data)
				})
				.catch((err) => reject(err))
		})
	}
}
