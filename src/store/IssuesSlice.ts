import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IssueType} from '../interfaces/IssueType'

export type IssuesState = {
	issues: IssueType[]
}

export const initialState: IssuesState = {
	issues: [],
}

export const issuesSlice = createSlice({
	name: 'issues',
	initialState: initialState,
	reducers: {
		setNewIssues: (state, { payload }: PayloadAction<IssueType>) => {
			state.issues = [...state.issues, payload]
		},
		deleteIssue: (state, { payload }: PayloadAction<string>) => {
			state.issues = state.issues.filter((issue) => issue.id !== payload)
		},
		changeIssue: (state, { payload }: PayloadAction<IssueType>) => {
			state.issues = state.issues.map((issue) => (issue.id === payload.id ? payload : issue))
		},
	},
})

export const { setNewIssues, deleteIssue, changeIssue } = issuesSlice.actions
export default issuesSlice.reducer
