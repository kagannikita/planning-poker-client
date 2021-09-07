export type ValidateValue = string | number | boolean

export type ValidationRule = {
	fn: (value: ValidateValue) => boolean
	error: string
}
