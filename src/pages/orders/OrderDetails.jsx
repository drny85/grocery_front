import React from "react";
import OrdersContext from "../../context/orders/ordersContext";
import { Loader } from "../../components/Loader";
import { Link, useParams } from "react-router-dom";

import { withRouter } from "react-router-dom";
import ItemsListDetails from "../../components/ItemsListDetails";
import OrderDetailsTop from "../../components/OrderDetailsTop";

const OrderDetails = (props) => {
  const ordersContext = React.useContext(OrdersContext);
  const { current, clearCurrent, changeStatus, setCurrentOrder } = ordersContext;
  const { id } = useParams();

  React.useEffect(() => {
    setCurrentOrder(id)
    return () => {
      clearCurrent();
    };
    //eslint-disable-next-line
  }, []);


  if (!current) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div>
        <Link to="/orders" className="btn secondary left">
          Back to Orders
        </Link>
        <h4 className="center">Order Details</h4>
      </div>
      <OrderDetailsTop order={current} changeStatus={changeStatus} />

      <ItemsListDetails items={current.items} />
    </div>
  );
};

export default withRouter(OrderDetails);
