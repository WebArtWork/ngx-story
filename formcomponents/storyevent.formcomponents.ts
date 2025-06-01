export const storyeventFormComponents = {
	formId: 'storyevent',
	title: 'Storyevent',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storyevent title',
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
					value: 'fill storyevent description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
