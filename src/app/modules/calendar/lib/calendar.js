import { Calendar } from 'app/lib';

let calendar = null;

export default function getCalendar() {
	if(!calendar) {
		calendar = new Calendar();
	}
	return calendar;
}
