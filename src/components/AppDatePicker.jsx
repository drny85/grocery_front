import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function AppDatePicker({ date, onChange }) {
	return (
		<DatePicker selected={date} onChange={onChange} endDate={new Date()} />
	);
}
