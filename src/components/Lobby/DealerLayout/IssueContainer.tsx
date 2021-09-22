import React, { FC, useContext, useState } from 'react'
import { Container, Header as HeaderTitle } from 'semantic-ui-react'
import Issue, { IssueProps } from '../Issue'
import IssueCreate from '../IssueCardCreate'
import s from '../lobby.module.scss'
import ModalChangeIssue from '../ModalChangeIssue'
import ModalCreateIssue from '../ModalCreateIssue'
import ModalDeleteIssue from '../ModalDeleteIssue'
import { ModalState } from './DealerLayout'
import { IssueType } from '../../../interfaces/IssueType'

interface IssueContainerProps {
	type: 'lobby' | 'game'
	issues: IssueType[] | undefined
	lobbyID: string
	createIssue: ({ name, priority }: IssueType) => void
	removeIssue: (id: string) => void
	updateIssue: ({ id, name, priority }: IssueType) => void
}

export interface IModalCreateIssue extends ModalState {
	priority: 'low' | 'average' | 'high'
	link: string
	lobby: string
}

const IssueContainer: FC<IssueContainerProps> = ({ type, removeIssue, updateIssue, createIssue, issues, lobbyID }) => {
	const [ModalDelete, setModalDelete] = useState<ModalState>({
		modalIsOpen: false,
		name: '',
		id: '',
	})
	const [ModalChange, setModalChange] = useState<IModalCreateIssue>({
		modalIsOpen: false,
		name: '',
		priority: 'low',
		link: '',
		id: '',
		lobby: lobbyID,
	})
	const [ModalCreate, setModalCreate] = useState<IModalCreateIssue>({
		modalIsOpen: false,
		name: '',
		priority: 'low',
		link: '',
		id: '',
		lobby: lobbyID,
	})


	return (
		<>
			<HeaderTitle textAlign="center" as="h1">
				Issues:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{issues &&
					issues.map((issue, i) => (
						<Issue
							key={issue.name + i}
							type={type}
							setModalChange={setModalChange}
							setModalDelete={setModalDelete}
							{...issue}
						/>
					))}

				<IssueCreate lobbyId={lobbyID} setModalCreate={setModalCreate} />
			</Container>

			<ModalDeleteIssue
				issuesArr={issues}
				state={ModalDelete}
				setModalDelete={setModalDelete}
				removeIssue={removeIssue}
			/>

			<ModalCreateIssue
				lobbyID={lobbyID}
				ModalCreate={ModalCreate}
				setModalCreate={setModalCreate}
				createIssue={createIssue}
			/>

			<ModalChangeIssue
				lobbyID={lobbyID}
				ModalChange={ModalChange}
				setModalChange={setModalChange}
				updateIssue={updateIssue}
			/>
		</>
	)
}

export default IssueContainer
