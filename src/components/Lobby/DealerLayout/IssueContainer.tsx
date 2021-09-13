import React, { FC, useState } from 'react'
import { Container, Header as HeaderTitle } from 'semantic-ui-react'
import { RootState, useStore } from '../../../store/store'
import Issue, { IssueProps } from '../Issue'
import IssueCreate from '../IssueCreate'
import s from '../lobby.module.scss'
import ModalDeleteIssue from '../ModalDeleteIssue'
import { ModalState } from './DealerLayout'
interface IssueContainerProps {
	type: 'lobby' | 'game'
}
const IssueContainer: FC<IssueContainerProps> = ({ type }) => {
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
					<Issue key={issue.title} type={type} setModalDeleteIssueState={setModalDeleteIssueState} {...issue} />
				))}
				<IssueCreate />
			</Container>
			<ModalDeleteIssue state={ModalDeleteIssueState} setModalDeleteIssueState={setModalDeleteIssueState} />
		</>
	)
}

export default IssueContainer
