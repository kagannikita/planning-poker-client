import { ValidateValue, ValidationRule } from '../types/TValidate'
import { IPlayer } from '../interfaces/IPlayer'
// const isTruthy = (value: ValidateValue) => !!value
// const isFalsy = (value: ValidateValue) => !value
// const isEqual = (to: string) => (value: ValidateValue) => value === to
const isNotEmpty = (value: ValidateValue) => (value as string) !== ''

const typedKeys = <T>(arg: T) => {
	return Object.keys(arg) as Array<keyof T>
}
//eslint сделай права кнопка мыши и eslint у меня такого не на этот файл

// const passesRegexp = (regexp: RegExp) => (value: ValidateValue) => {
//   if (typeof value === 'boolean') return false
//   return regexp.test(String(value))
// }
// по идеи регулярки ты и сам напишешь ее в инете завались она есть теперь как применять

// щас найду const errors = validateValues(values, exampleRules)
// const isValidBas64Image = (value: ValidateValue) => String(value).includes('image')

export const validateValues = (values: IPlayer, validationRules: Record<string, ValidationRule[]>) => {
	const errors: Record<string, string> = {}

	for (const fieldName of typedKeys(values)) {
		const fieldRules = validationRules[fieldName]
		const fieldValue = values[fieldName]

		if (fieldRules) {
			const fieldError = fieldRules.find((rule) => !rule.fn(fieldValue as string))

			if (fieldError) errors[fieldName] = fieldError.error
		}
	}

	return errors
}

/////////////////////////////////////////////////////////////////////////////////////
export const exampleRules = {
	firstName: [{ fn: isNotEmpty, error: 'firstName must be filled' }],
	role: [{ fn: isNotEmpty, error: 'email must be filled' }],
}
const values = {
	firstName: 'Nikita',
	lastName: 'Kagan',
	position: 'dialer',
	role: 'dialer',
}
const errors = validateValues(values, exampleRules)
console.log(errors)
//протестируй как то я хз СЕГОДНЯ? желательно да чтобы проверить работает ли она  а форму уже есть? нет сам сделаешь
// я сделаю,ну ок скажешь если метод не будет работать и разбери его и задай вопросы сегодня я оффлайн завтра в
// любое вермя, я с понедельника сажусь за проект плотно часов по6-7 в день
