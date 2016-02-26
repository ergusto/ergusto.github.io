const weeks = [0,1,2,3,4,5,6,7,8];
const weekdays = [0,1,2,3,4,5,6,7,8];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = [
	{name: 'January', days: 31}, 
	{name: 'February', days: 28}, 
	{name: 'March', days: 31}, 
	{name: 'April', days: 30},
	{name: 'May', days: 31},
	{name: 'June', days: 30},
	{name: 'July', days: 31},
	{name: 'August', days: 31},
	{name:'September', days: 30},
	{name:'October', days: 31},
	{name:'November', days: 30},
	{name:'December', days: 31}
];

const DateShell = {
	day: 'Monday',
	dayNumber: '0'
};

const MonthShell = {
	name: 'January',
	days: 31
};

export default class Calendar  {

	constructor() {
		this.currentDate = new Date;		
		this.days = days;
		this.months = months;
		this.month = this.currentDate.getMonth();
		this.year = this.currentDate.getFullYear();

		this.date = this.currentDate.getDate();
		this.currentDayNumber = this.currentDate.getDay();
		this.firstDayOfMonth = new Date(this.year, this.month, 1);
		this.startingDay = this.firstDayOfMonth.getDay();
		
		this.day = this.days[this.startingDay];
		this.currentDay = this.days[this.currentDayNumber];
		this.currentMonth = this.months[this.month];
		
		this.currentMonthLength = this.currentMonth.days;

		if (this.month == 1) {
			// feb only
			this.currentMonthLength = 29;
		}
	}

	getInfoForDate(date) {
		const info = {};
		info.month = date.getMonth();
		info.year = date.getFullYear();
		info.dateNumber = date.getDate();
		this.dayNumber = date.getDay();
		this.firstDayOfMonth = new Date(this.year, this.month, 1);
	}

	getMonthForDate() {

	}

	today() {

	}

}