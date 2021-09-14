import React, { FC, useState } from 'react'
import { Container, Header as HeaderTitle } from 'semantic-ui-react'
import IssueType from 'src/interfaces/IssueType'
import { RootState, useStore } from '../../../store/store'
import Issue, { IssueProps } from '../Issue'
import IssueCreate from '../IssueCreate'
import s from '../lobby.module.scss'
import ModalDeleteIssue from '../ModalDeleteIssue'
import { ModalState } from './DealerLayout'

interface IssueContainerProps {
	type: 'lobby' | 'game'
	issues: IssueType[]
	createIssue: ({ title, priority }: IssueType) => void
	removeIssue: (id: string) => void
	updateIssue: ({ id, title, priority }: IssueType) => void
}

const IssueContainer: FC<IssueContainerProps> = ({ type, removeIssue, updateIssue, createIssue }) => {
	const { issues } = useStore().getState() as RootState
	const [ModalDeleteIssueState, setModalDeleteIssueState] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})
	// const [issuesState, setIssuesState] = useState<Issue[]>(issues.issues);
	return (
		<>
			<HeaderTitle textAlign="center" as="h1">
				Issues:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{issues.issues.map((issue) => (
					<Issue 
					key={issue.title} 
					type={type} 
					setModalDeleteIssueState={setModalDeleteIssueState} {...issue} />
				))}
				<Issue
					key={'asd'}
					type={type}
					setModalDeleteIssueState={setModalDeleteIssueState} id="ad" priority="average" title='issue' />
				<IssueCreate />
			</Container>
			<ModalDeleteIssue state={ModalDeleteIssueState} setModalDeleteIssueState={setModalDeleteIssueState} removeIssue={removeIssue} />
		</>
	)
}

export default IssueContainer
