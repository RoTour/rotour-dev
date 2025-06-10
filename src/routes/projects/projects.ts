export type Project = {
	title: string;
	description: string;
	image: string;
	color: string;
	link: string;
};

export const projects: Project[] = [
	{
		title: 'RALTech School + Intranet',
		description: 'Raltech School is an online web development school, where each student gets a personalized planning based on his skills and preferences. \n\n RALTech aims to provide a unique experience to each student, and tries to make sure that its students are operational when they land their first job by making them work on real projects, from conception to production and maintenance. \n\n RALTech\'s intranet is a web application that allows students manage their lessons, projects, labs, and grades.\n\n We also developed a planning builder augmented with AI to help student define and redefine their planning, goals and keep track of their progress.' + 
		'\n\n **Status**: Online, +200 students taught',
		image: '/images/ColorNoBg 16_9.svg',
		color: '#1d1d1d',
		link: 'https://raltech.school'
	},
	{
		title: 'CodeRonin',
		description: 'CodeRonin is a web application dedicated to learning development. \n\n' +
			'The app aims to make learning code as fun as possible providing a gamified experience with experience point, achievements, leaderboard and instant feedback. \n\n' +
			'**Stack**: SvelteKit, tRPC, SQLite, Postgres, Tailwind, Docker, Coolify \n\n' +
			'**Status**: Production, 50 users',
		image: '/images/coderonin-logo-text.svg',
		color: '#1d1d1d',
		link: 'https://coderonin.raltech.school'
	},
	{
		title: 'SQLearn',
		description:
			'SQLearn is a web application dedicated to learning SQL.\n\n' +
			'The platform provides courses and exercises that apply the concepts covered.\n\n' +
			"Users' queries are tested to see if their results match the expected output, allowing the learners to get immediate feedback on their productions.\n\n" +
			'Thanks to the locally generated database on client side, users can experiment without fear: a simple refresh of the page is enough to start again on new bases.\n\n' +
			'**Stack**: SvelteKit, tRPC, SQLite, Postgres, Tailwind, Docker, DroneCI \n\n' +
			'**Status**: Production, 150 users',
		image: '/images/sqlearn-logo.png',
		color: '#1d1d1d',
		link: 'https://sqlearn.raltech.school/auth/register'
	},
	{
		title: 'Ybook',
		description:
			'Ybook is a straightforward social media platform that focusing on simplicity and User Experience. \n\n' +
			"It provides user identification, individualized profiles, images and text posting and sharing, management of friends, and engagement through likes, and comments. Users can modify privacy settings and do people searches. Ybook is a side project exhibiting a developer's ability to build a useful, ad-free social media platform without extraneous frills using.\n\n" +
			'**Stack**: SvelteKit, tRPC, Tailwind, Prisma, Postgres, AWS S3, AWS Cognito Docker, DroneCI \n\n' +
			'**Status**: Released, Technical Demo\n\n',
		image: '/images/ybook-logo2.svg',
		color: '#041513',
		link: 'https://ybook.rotour.dev/'
	}
];
