// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import OrdersByStatus from "../../components/OrdersByStatus";
import OrdersContext from "../../context/orders/ordersContext";
import NotificationContext from "../../context/notifications/notificationContext";
import OrderSearch from "../../components/OrderSearch/OrderSearch";
import M from "materialize-css/dist/js/materialize.min.js";

import './AllOrders.css';

import moment from 'moment'

const AllOrders = () => {
	const ordersContext = React.useContext(OrdersContext);
	const {
		getOrders,
		stopListening,
		filterOrders,
		setOrderFilter,
		clearOrderFilter,
	} = ordersContext;
	const notificationContext = React.useContext(NotificationContext);
	const { removeNotification, setNotification } = notificationContext;
	const dateRef1 = useRef();
	const dateRef2 = useRef();

	const [text, setText] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [isFiltered, setIsFiltered] = useState(false);

	const getStartDate = (date) => {
		setStartDate(new Date(date));
		setIsFiltered(true);
	};
	const getEndDate = (date) => {
		setEndDate(new Date(date));
	};

	const clearFilters = (e) => {
		e.preventDefault();
		setIsFiltered(false)
		setStartDate(new Date())
		setEndDate(new Date())
		dateRef1.current.value = '';
		dateRef2.current.value = '';
	};

	const onInputChange = (e) => {
		let value = e.target.value;
		setText(value);

		if (value.length > 1) {
			setOrderFilter();

			filterOrders(text);
		} else {
			clearOrderFilter();
		}
	};

	useEffect(() => {
		M.Datepicker.init(dateRef1.current, {
			maxDate: new Date(),
			defaultDate: new Date(),
			yearRange: 2,
			onSelect: getStartDate,
		});
		M.Datepicker.init(dateRef2.current, {
			maxDate: new Date(),
			defaultDate: new Date(),
			yearRange: 2,
			onSelect: getEndDate,
		});
		getOrders();
		setNotification();

		return () => {
			stopListening();
			removeNotification();
			clearInterval();
			clearOrderFilter();
		};
		//eslint-disable-next-line
	}, []);

	return (
		<div className="orders">
			<h3 className="center">{isFiltered ? (`Orders from ${moment(startDate).format("L")} to ${moment(endDate).format('L')}`) : ("Today's Orders")}</h3>
			<div className="row datePicker">
				<form>
					<div className={`col ${isFiltered ? 's5': 's6'}`}>
						<input
							ref={dateRef1}
							type="text"
							placeholder="Select Orders From"
							className="datepicker"
						/>
					</div>
					<div className={`col ${isFiltered ? 's5': 's6'}`}>
						<input
							ref={dateRef2}
							placeholder="Orders To"
							type="text"
							className="datepicker"
						/>
					</div>
					<div className={`col ${isFiltered ? 's2': 's6'}`}>
						{isFiltered && (
							<button
								
								onClick={clearFilters}
								className="btn orange"
							>
								Clear Filters
							</button>
						)}
					</div>
				</form>
			</div>
			<OrderSearch onChange={onInputChange} value={text} />
			<br />

			<div className="row">
				<div className="col s4">
					<OrdersByStatus status="new" start={startDate} end={endDate} />
				</div>
				<div className="col s4">
					<OrdersByStatus
						status="in progress"
						start={startDate}
						end={endDate}
					/>
				</div>
				<div className="col s4">
					<OrdersByStatus status="delivered" start={startDate} end={endDate} />
				</div>
			</div>
		</div>
	);
};

export default React.memo(AllOrders);
