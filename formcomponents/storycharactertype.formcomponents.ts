export const storycharactertypeFormComponents = {
	formId: 'storycharactertype',
	title: 'Storycharactertype',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storycharactertype title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Select',
			key: 'field',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill character type field ...'
				},
				{
					name: 'Label',
					value: 'Field'
				},
				{
					name: 'Items',
					value: ['Text', 'Number', 'Select', 'Multiple']
				}
			]
		},
		{
			name: 'Tags',
			key: 'entities',
			fields: [
				{
					name: 'Placeholder',
					value: 'enter character type entities ...'
				},
				{
					name: 'Label',
					value: 'Entities'
				}
			]
		}
	]
};
