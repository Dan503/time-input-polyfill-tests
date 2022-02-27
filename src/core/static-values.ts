export type ValueSet = {
	cpuValue: string,
	inputValue: string,
	labelValue: string
}

export type StaticValuesType = {
	defaultValue: ValueSet
	buttonAM: ValueSet
	buttonPM: ValueSet
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
