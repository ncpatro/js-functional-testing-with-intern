export function toDateString(date) {
	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
};

export function toYMD(date) {
	const year = date.getFullYear().toString();
	let month = (date.getMonth() + 1).toString();
	let day = date.getDate().toString();

	month = month.length === 2 ? month : '0' + month;
	day = day.length === 2 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
