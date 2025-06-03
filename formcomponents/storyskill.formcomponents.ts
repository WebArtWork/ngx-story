export const storyskillFormComponents = {
	formId: 'storyskill',
	title: 'Storyskill',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storyskill title',
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
					value: 'fill storyskill description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
