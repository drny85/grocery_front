import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import itemsContext from "../../context/items/itemsContext";
import { Loader } from "../../components/Loader";
import authContext from "../../context/auth/authContext";

function EditItem() {
  const { id } = useParams();
  const { user } = useContext(authContext);
  console.log("USER", user);
  const { clearCurrent, current, setCurrentItem, loading } = useContext(
    itemsContext
  );

  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
  });

  console.log("Item", item);

  const setValue = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      setCurrentItem(id, user?.store);
    }
    return () => {
      clearCurrent();
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setItem(current);
  }, [current]);

  if (loading) return <Loader />;
  return (
    <div className="container">
      <div className="container_form card row">
        <div className="col s8 card-content">
          <form>
            <div className="input-field col s12">
              <input
                type="text"
                placeholder="Item Name"
                name="name"
                value={item?.name}
                onChange={setValue}
                className="validate"
                required
              />
            </div>
            <div className="input-field col s12">
              <input
                type="text"
                placeholder="Item Description"
                name="description"
                value={item?.description}
                onChange={setValue}
                className="validate"
                required
              />
            </div>
          </form>
        </div>
        <div className="container_item col s4">
          <h3 className="center">Item</h3>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
