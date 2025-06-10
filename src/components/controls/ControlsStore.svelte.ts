import { browser } from '$app/environment';	

type CacheControl = {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
}

class ControlsStore {
	#parallaxEnabled = $state(true);
	#cacheControl	?: CacheControl;

	constructor(cacheControl?: CacheControl) {
		this.#cacheControl = cacheControl;
		this.#parallaxEnabled = cacheControl?.getItem("parallaxEnabled") === "true";
	}

	enableParallax() {
		this.#setParallaxEnabled(true);
	}

	disableParallax() {
		this.#setParallaxEnabled(false);
	}

	toggleParallax() {
		this.#setParallaxEnabled(!this.#parallaxEnabled);
	}

	#setParallaxEnabled(value: boolean) {
		this.#parallaxEnabled = value;
		this.#cacheControl?.setItem("parallaxEnabled", value.toString());
	}

	get isParallaxEnabled() {
		return this.#parallaxEnabled;
	}
}

export default new ControlsStore(browser ? window?.localStorage : undefined);
