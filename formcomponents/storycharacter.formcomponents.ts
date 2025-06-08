export const storycharacterFormComponents = {
	formId: 'storycharacter',
	title: 'Storycharacter',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storycharacter title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Label',
					value: 'Image'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill storycharacter description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		}
	]
};
