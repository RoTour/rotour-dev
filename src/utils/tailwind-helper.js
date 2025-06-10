export const tailwindBreakPoints = [
    [640, 'sm'],
    [768, 'md'],
    [1024, 'lg'],
    [1280, 'xl'],
    [1536, '2xl']
];
export const getCurrentBreakPoint = () => {
    const currentDeviceWidth = window.innerWidth;
    for (const breakPoint of tailwindBreakPoints) {
        if (currentDeviceWidth < breakPoint[0])
            return breakPoint;
    }
    return tailwindBreakPoints[tailwindBreakPoints.length - 1];
};
export const isMobile = () => {
    const currentBreakPoint = getCurrentBreakPoint();
    return currentBreakPoint[1] === 'sm' || currentBreakPoint[1] === 'md';
};
export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};
//# sourceMappingURL=tailwind-helper.js.map