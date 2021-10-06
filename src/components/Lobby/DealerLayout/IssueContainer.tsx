import React, { FC, useState } from 'react'
import { Container, Header as HeaderTitle } from 'semantic-ui-react'
import Issue from '../Issue'
import IssueCreate from '../IssueCardCreate'
import s from '../lobby.module.scss'
import ModalChangeIssue from '../ModalChangeIssue'
import ModalCreateIssue from '../ModalCreateIssue'
import ModalDeleteIssue from '../ModalDeleteIssue'
import { ModalState } from './DealerLayout'
import { IssueType } from '../../../interfaces/IssueType'
import { Role } from '../../../interfaces/LobbyTypes'
import { uploadExcel } from '../../../functions/uploadExcel'

interface IssueContainerProps {
	type: 'lobby' | 'game'
	playerRole: Role
	issues: IssueType[] | undefined
	lobbyID: string
	createIssue: ({ name, priority }: IssueType) => void
	removeIssue: (id: string) => void
	updateIssue: ({ id, name, priority }: IssueType) => void
	createIssuesFromFile: () => void
	CurrentIssueId?: {
		id: string
	}
}

export interface IModalCreateIssue extends ModalState {
	priority: 'low' | 'average' | 'high'
	link: string
	lobby: string
}

const IssueContainer: FC<IssueContainerProps> = ({
	type,
	playerRole,
	removeIssue,
	updateIssue,
	createIssue,
	createIssuesFromFile,
	CurrentIssueId,
	issues,
	lobbyID,
}) => {
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

	const [isCurrentIdState, setIsCurrentIdState] = useState('')

	const uploadExcelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		uploadExcel(e, createIssuesFromFile, lobbyID)
	}

	return (
		<>
			<HeaderTitle textAlign="center" className="heading" as="h2">
				Issues:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{issues &&
					issues?.map((issue) => {
						if (issue.score === '-' && !isCurrentIdState && CurrentIssueId) {
							CurrentIssueId.id = issue.id
							setIsCurrentIdState(issue.id)
							return (
								<Issue
									key={issue.id}
									type={type}
									isCurrentIdState={''}
									playerRole={playerRole}
									setIsCurrentIdState={setIsCurrentIdState}
									setModalChange={setModalChange}
									setModalDelete={setModalDelete}
									CurrentIssueId={CurrentIssueId}
									{...issue}
								/>
							)
						} else {
							return (
								<Issue
									key={issue.id}
									type={type}
									isCurrentIdState={isCurrentIdState}
									playerRole={playerRole}
									setIsCurrentIdState={setIsCurrentIdState}
									setModalChange={setModalChange}
									setModalDelete={setModalDelete}
									CurrentIssueId={CurrentIssueId}
									{...issue}
								/>
							)
						}
					})}

				{playerRole === Role.dealer && <IssueCreate lobbyId={lobbyID} setModalCreate={setModalCreate} />}
			</Container>
			{playerRole === Role.dealer && (
				<div className={s.uploadIssues}>
					<label htmlFor="upload-btn" className={`ui right labeled icon button blue`}>
						<i className="upload icon" />
						Upload issues
					</label>
					<input
						type="file"
						accept=".xlsx, .csv"
						className={s.inputExcel}
						onChange={uploadExcelHandler}
						id="upload-btn"
						hidden
					/>
				</div>
			)}

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
