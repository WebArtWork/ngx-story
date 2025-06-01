export const storychangeFormComponents = {
	formId: 'storychange',
	title: 'Storychange',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storychange title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storychange description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
