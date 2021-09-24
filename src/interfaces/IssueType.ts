export interface IssueTypeAPI {
	name: string
	priority: 'low' | 'average' | 'high'
	lobby: string
	link: string
	score: string
}


export interface IssueType extends IssueTypeAPI {
	id: string
}
