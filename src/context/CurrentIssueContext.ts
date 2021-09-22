import { createContext } from 'react'
import { CurrentIssue } from '../pages/game/[id]'

interface IssueContext {
	CurrentIssue: CurrentIssue
	setCurrentIssue: (data: CurrentIssue) => void
}

export const CurrentIssueContext = createContext<IssueContext>({
	CurrentIssue: {
		id: '',
		name: '',
	},
	setCurrentIssue: (data: CurrentIssue) => {},
})
