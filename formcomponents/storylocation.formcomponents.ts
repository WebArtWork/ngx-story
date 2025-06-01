export const storylocationFormComponents = {
	formId: 'storylocation',
	title: 'Storylocation',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storylocation title',
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
					value: 'fill storylocation description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
