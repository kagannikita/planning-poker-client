export interface IssueTypeAPI {
	name: string
	priority: 'low' | 'average' | 'high'
	lobby: string
	link: string
}


export interface IssueType extends IssueTypeAPI {
	id: string
}
