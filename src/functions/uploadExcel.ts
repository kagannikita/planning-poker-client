import { IssuesAPI } from "../api/IssuesAPI"
import { IssueTypeAPI } from "../interfaces/IssueType"
import * as XLSX from 'xlsx'

export const uploadExcel = (
	e: React.ChangeEvent<HTMLInputElement>,
	createIssuesFromFile: () => void,
	lobbyID: string) => {
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
		createIssuesFromFile()
	})
}
