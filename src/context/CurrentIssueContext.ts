import { createContext } from 'react'
import { CurrentIssueType } from '../pages/game/[id]'

interface IssueContext {
	CurrentIssue: CurrentIssueType
	setCurrentIssue: (data: CurrentIssueType) => void
}

export const CurrentIssueContext = createContext<IssueContext>({
	CurrentIssue: {
		id: '',
		name: '',
	},
	setCurrentIssue: (data: CurrentIssueType) => data,
})
