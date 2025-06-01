export const storyFormComponents = {
	formId: 'story',
	title: 'Story',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill story title',
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
					value: 'fill story description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
