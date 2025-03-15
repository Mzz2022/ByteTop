declare namespace jest {
	interface Matchers<R> {
		toHaveBeenCalledWithError(expected: Error): R
	}
}
