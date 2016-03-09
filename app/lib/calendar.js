const calendarDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendarDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const calendarMonthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const calendarDaysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

function generateHours() {
	return hours.map((hour) => {
		const hourObj = {};
		hourObj.hour = hour;
		return hourObj;
	});
}

export default class Calendar {

	get weekdays() {
		return calendarDays;
	}

	get weekdaysAbbr() {
		return calendarDayLabels;
	}

	get months() {
		return calendarMonthLabels;
	}

	getMonth(date) {
		const today = new Date();
		const todayDate = today.getDate();
		const todayMonthNo = today.getMonth();
		const todayYear = today.getFullYear();

		if (!date) {
			date = new Date();
		}

		const month = date.getMonth();
		const year = date.getFullYear();
		const firstDayOfMonth = new Date(year, month, 1);
		const startingDay = firstDayOfMonth.getDay();
		let nextMonth = month + 1;
		let nextMonthYear = year;
		let previousMonth = month - 1;
		let previousMonthYear = year;

		if (month >= 11) {
			nextMonth = 1;
			nextMonthYear = nextMonthYear + 1;
		}

		if (month == 0) {
			previousMonth = 11;
			previousMonthYear = previousMonthYear - 1;
		}

		const firstDayOfNextMonth = new Date(nextMonthYear, nextMonth, 1);
		const firstDayOfPrevMonth = new Date(previousMonthYear, previousMonth, 1);

		let monthLength = calendarDaysInEachMonth[month];

		if (month == 1) {
			if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
				monthLength = 29;
			}
		}

		const monthInfo = {};
		monthInfo.name = calendarMonthLabels[month];
		monthInfo.length = monthLength;
		monthInfo.year = year;
		monthInfo.days = [];
		monthInfo.weeks = [];
		monthInfo.getNextMonth = this.getMonth.bind(this, firstDayOfNextMonth);
		monthInfo.getPrevMonth = this.getMonth.bind(this, firstDayOfPrevMonth);

		let day;
		let week;

		let dateNo = 1;
		for (var i = 0; i < 9; i++) {
			week = [];
			for (var j = 0; j <= 6; j++) { 
				day = {};
				if (dateNo <= monthLength && (i > 0 || j >= startingDay)) {
					
					day.date = dateNo;
					day.day = calendarDays[j];
					day.dayLabel = calendarDayLabels[j];
					day.dayNo = j;
					day.month = calendarMonthLabels[month];
					day.monthNo = month;
					day.year = year;
					day.identifier = day.date + day.month + day.year;
					day.dateObj = new Date(day.year, day.monthNo, day.date);
					day.isToday = false;
					day.hours = generateHours();

					if (day.date == todayDate) {
						if (day.monthNo == todayMonthNo) {
							if (day.year == todayYear) {
								day.isToday = true;
							}
						}
					}

					monthInfo.days.push(day);
					week.push(day);
					dateNo++;
				} else {
					day.date = null;
					week.push(day);
				}
			}
			monthInfo.weeks.push(week);
			if (dateNo > monthLength) {
				break;
			}
		}

		return monthInfo;
	}

}