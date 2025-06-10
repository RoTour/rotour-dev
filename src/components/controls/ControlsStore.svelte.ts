class ControlsStore {
	#parallaxEnabled = $state(true);

	enableParallax() {
		this.#parallaxEnabled = true;
	}

	disableParallax() {
		this.#parallaxEnabled = false;
	}

	toggleParallax() {
		this.#parallaxEnabled = !this.#parallaxEnabled;
	}

	get isParallaxEnabled() {
		return this.#parallaxEnabled;
	}
}

export default new ControlsStore();
