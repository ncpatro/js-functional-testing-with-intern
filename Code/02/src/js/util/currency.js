export function toString(raw) {
	let value = raw.toString();

	const decimalPosition = value.indexOf('.');

	switch(decimalPosition) {
		case -1:
			value += '.00';
			break;
		case value.length - 1:
			value += '00';
			break;
		case value.length - 2:
			value += '0';
			break;
		case value.length - 3:
			// no-op
			break;
		default:
			value = value.substring(0, decimalPosition + 3);
			break;
	}

	return value;
}
