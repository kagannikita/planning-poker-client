import React, { FC, useContext, useState } from 'react'
import { Button, Container, Header as HeaderTitle, Input } from 'semantic-ui-react'
import Issue, { IssueProps } from '../Issue'
import IssueCreate from '../IssueCardCreate'
import s from '../lobby.module.scss'
import ModalChangeIssue from '../ModalChangeIssue'
import ModalCreateIssue from '../ModalCreateIssue'
import ModalDeleteIssue from '../ModalDeleteIssue'
import { ModalState } from './DealerLayout'
import { IssueType, IssueTypeAPI } from '../../../interfaces/IssueType'
import * as XLSX from 'xlsx'
import { IssuesAPI } from '../../../api/IssuesAPI'

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

	const uploadExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsArrayBuffer(e.target.files![0])
			fileReader.onload = (e) => {
				const bufferArray = e.target!.result
				const wb = XLSX.read(bufferArray, { type: 'buffer' })
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
				const data = XLSX.utils.sheet_to_json(ws)
				resolve(data)
			}
			fileReader.onerror = (error) => {
				reject(error)
			}
		})
		promise.then(async (d) => {
			await new IssuesAPI().createByTable(d as IssueTypeAPI[], lobbyID)
		})
	}

	return (
		<>
			<HeaderTitle textAlign="center" className="heading" as="h2">
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
			<div className={s.uploadIssues}>
				<label htmlFor="upload-btn" className={`ui primary right labeled icon button ${s.startBtn}`}>
					<i className="upload icon"></i>
					Upload issues
				</label>
				<input type="file" className={s.inputExcel} onChange={uploadExcel} id="upload-btn" hidden />
			</div>
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
