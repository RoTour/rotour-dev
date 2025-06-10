import { cubicOut } from 'svelte/easing';
export const fadeAndScale = (_, { duration = 1000, delay = 0, inverted = false, maxScale = 2, }) => {
    return {
        delay,
        duration,
        css: (t) => {
            const eased = cubicOut(t);
            let scale;
            if (inverted) {
                //from 1 to maxScale
                scale = maxScale - (maxScale - 1) * eased;
            }
            else {
                //from maxScale to 1
                scale = (maxScale - 1) * eased;
            }
            return `
				opacity: ${eased};
				transform: scale(${scale});
			`;
        },
    };
};
//# sourceMappingURL=fade-and-scale.js.map