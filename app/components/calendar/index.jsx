import React from 'react';

const current_date = new Date();

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

export default class CalendarComponent extends React.Component {
    
    constructor(props) {
        super(props);
        const month = current_date.getMonth();
        const year = current_date.getFullYear();

        this.date = current_date.getDate();
        this.currentDayNo = current_date.getDay();
        this.currentDay = days[this.currentDayNo];
        this.firstDay = new Date(year, month, 1);
        this.startingDay = this.firstDay.getDay();
        
        this.month = months[month];
        this.day = days[this.startingDay];
        this.year = year;
        
        this.currentMonthLength = this.month.days;

        if (month == 1) {
        	// feb only
        	this.currentMonthLength = 29;
        }

    }

    generateDateCells() {
    	let day = 1;
    	const weeks = [0,1,2,3,4,5,6,7,8];
    	const weekdays = [0,1,2,3,4,5];

    	return weeks.map((weekNo) => {
    		
    		const weekdayhtml = weekdays.map((dayKey) => {

    			if (day > this.currentMonthLength) {
    				return;
    			}

    			if (day <= this.currentMonthLength && (weekNo > 0 || dayKey >= this.startingDay)) {
    				const html = <div key={dayKey} className="calendar-day">{day}</div>;
    				day++;
    				return html;
    			}

    			return <div key={dayKey} className="calendar-day"></div>;

    		});

    		return (
    			<ul key={weekNo} className="calendar-week clearfix">
    				{weekdayhtml}
    			</ul>
    		)

    	});
    }

    render() {

    	const dayHeaderList = days.map((day) => {
    		return (
    			<li className="calendar-day-header-item">{day}</li>
    		)
    	});

    	const dateCells = this.generateDateCells();

        return (

        	<section className="full-height">

	            <div id="calendar-example" className="example">

	            	<div className="box calendar">

	            		<header className="calendar-header">

			            	<h1>Calendar!</h1>

			            	<p>{this.currentDay}  {this.date} {this.month.name} {this.year}</p><br/>

			            	<ul className="calendar-header-day-list">{days}</ul>

			            </header>

			            <div className="calendar-body">

		            		{dateCells}

		            	</div>

		            </div>

	            </div>
        	
        	</section>
        );
    }
}