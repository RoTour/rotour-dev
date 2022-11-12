export type Project = {
	title: string;
	description: string;
	image: string;
	color: string;
	link: string;
};

export const projects: Project[] = [
	{
		title: 'SQLearn',
		description:
			'SQLearn is a web application dedicated to learning SQL.\n\n' +
			'The platform provides courses and exercises that apply the concepts covered.\n\n' +
			"Users' queries are tested to see if their results match the expected output, allowing the learners to get immediate feedback on their productions.\n\n" +
			'Thanks to the locally generated database on client side, users can experiment without fear: a simple refresh of the page is enough to start again on new bases.\n\n' +
			'**Stack**: React, Nestjs, Typescript, MongoDB, Docker, DroneCI \n\n' +
			'**Status**: Alpha',
		image: '/images/sqlearn-logo.svg',
		color: '#1d1d1d',
		link: 'https://sqlearn.rotour.dev/'
	},
	{
		title: 'Ytracker',
		description:
			"Ytracker is an internal data visualization tool developed for Toulouse Ynov Campus to track the progress of its students' projects and challenges.\n\n" +
			'The tool was developed with the goal of being as modular as possible in order to add different visualizations as needed. \n\n' +
			'**Stack**: React, Express, Typescript, SQLite, Docker \n\n' +
			'**Status**: Released',
		image: '/images/ytracker-logo.svg',
		color: '#181C24',
		link: 'https://ytracker.rotour.dev/'
	},
	{
		title: 'SPM',
		description:
			'Platform to manage a large number of projects simultaneously, for schools / incubators.\n\n' +
			'The application should allow users to propose projects or apply to existing projects.\n\n' +
			'An advanced administrator space will allow organizers to have an overview of projects and to manage their events in the best possible way.\n\n' +
			'**Stack**: SvelteKit, Supabase, Typescript, Postgres, Docker, DroneCI\n\n' +
			'**Status**: In development',
		image: '/images/spm-logo.svg',
		color: 'white',
		link: 'https://spm.rotour.dev/'
	}
];
