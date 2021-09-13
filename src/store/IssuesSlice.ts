import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Issue from '../interfaces/IssueType'

export type IssuesState = {
	issues: Issue[]
}

export const initialState: IssuesState = {
	issues: [],
}

export const issuesSlice = createSlice({
	name: 'issues',
	initialState: initialState,
	reducers: {
		setNewIssues: (state, { payload }: PayloadAction<Issue>) => {
			state.issues = [...state.issues, payload]
		},
		deleteIssue: (state, { payload }: PayloadAction<string>) => {
			state.issues = state.issues.filter((issue) => issue.id !== payload)
		},
		changeIssue: (state, { payload }: PayloadAction<Issue>) => {
			state.issues = state.issues.map((issue) => (issue.id === payload.id ? payload : issue))
		},
	},
})

export const { setNewIssues, deleteIssue, changeIssue } = issuesSlice.actions
export default issuesSlice.reducer
