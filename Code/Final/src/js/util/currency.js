export function toString(raw) {
	console.log(raw);
	let value = raw.toString();

	const decimalPosition = value.indexOf('.');
	console.log(value);
	console.log(decimalPosition);
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
	console.log(value);
	return value;
}
