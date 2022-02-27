export type ValueSet = {
	/** The 24hr value that gets stored in JS state. */
	cpuValue: string,
	/** The value that is displayed in the time input. */
	inputValue: string,
	/** The value to display to the user in things like labels */
	labelValue: string
}

export type StaticValuesType = {
	/** For the tests to pass, the input must have `defaultValue.cpuValue` as it's initial value. */
	defaultValue: ValueSet
	/** The values used for the AM button control tests. */
	buttonAM: ValueSet
	/** The values used for the PM button control tests. */
	buttonPM: ValueSet
	/** The values used for the blank button control tests. */
	buttonBlank: ValueSet
}

export const staticValues: StaticValuesType = {
	defaultValue: {
		cpuValue: '20:30',
		inputValue: '08:30 PM',
		labelValue: '"8:30 PM"'
	},
	buttonAM: {
		cpuValue: '07:15',
		inputValue: '07:15 AM',
		labelValue: '"7:15 AM"'
	},
	buttonPM: {
		cpuValue: '15:45',
		inputValue: '03:45 PM',
		labelValue: '"3:45 PM"'
	},
	buttonBlank: {
		cpuValue: '',
		inputValue: '--:-- --',
		labelValue: '" "'
	},
}
