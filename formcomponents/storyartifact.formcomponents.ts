export const storyartifactFormComponents = {
	formId: 'storyartifact',
	title: 'Storyartifact',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storyartifact title',
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
					value: 'fill storyartifact description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
