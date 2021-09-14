export interface IssueTypeAPI {
	name: string
	priority: 'low' | 'average' | 'high'
	lobby: string
}


export interface IssueType extends IssueTypeAPI {
	id: string
}
