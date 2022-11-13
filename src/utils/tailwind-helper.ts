type TailwindBreakpoint = [640, 'sm'] | [768, 'md'] | [1024, 'lg'] | [1280, 'xl'] | [1536, '2xl'];

export const tailwindBreakPoints: TailwindBreakpoint[] = [
	[640, 'sm'],
	[768, 'md'],
	[1024, 'lg'],
	[1280, 'xl'],
	[1536, '2xl']
];

export const getCurrentBreakPoint = (): TailwindBreakpoint => {
	const currentDeviceWidth = window.innerWidth;
	for (const breakPoint of tailwindBreakPoints) {
		if (currentDeviceWidth < breakPoint[0]) return breakPoint;
	}
	return tailwindBreakPoints[tailwindBreakPoints.length - 1];
};

export const isMobile = (): boolean => {
	const currentBreakPoint = getCurrentBreakPoint();
	return currentBreakPoint[1] === 'sm' || currentBreakPoint[1] === 'md';
};
