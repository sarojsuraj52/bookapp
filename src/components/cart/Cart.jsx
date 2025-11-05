import classes from "./Cart.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/bookStoreSlice";
import { commonActions } from "../../store/commonSlice";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const deleteHandler = async (id) => {
    try {
      console.log(id);
      const confirmRes = window.confirm("Are you Sure?");
      if (confirmRes === true) {
        const res = await fetch(
          `https://bookshistoryapp-default-rtdb.firebaseio.com/cart/${id}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Add any other headers required by your API
            },
          }
        );
        if (res.status === 200) {
          dispatch(getCart())
          alert("Item removed succesfully");
        } else {
          alert("Removal cannot complete");
        }
      } else {
        alert("Cancelled");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    dispatch(commonActions.toggleCart());
  };



  const cartItems = cart?.map((item, index) => (
    <div key={index}>
      <div className={classes["cart-row"]}>
        <span
          className={[classes["cart-item"], classes["cart-column"]].join(" ")}
        >
          <img
            src={item[1].imageLinks.thumbnail}
            alt={item[1].imageLinks.smallThumbnail}
            className={classes["cart-img"]}
          />
          <span className={classes["item-title"]}>{item[1].title}</span>
        </span>
        <span
          className={[classes["cart-price"], classes["cart-column"]].join(" ")}
        >
          ${item[1].price}
        </span>
        <span
          className={[classes["cart-quantity"], classes["cart-column"]].join(
            " "
          )}
        >
          <input
            type="number"
            value={item[1].quantity}
            className={classes["cart-input"]}
            readOnly
          />
          <button
            onClick={() => deleteHandler(item[0])}
            className={classes["remove-btn"]}
          >
            REMOVE
          </button>
        </span>
      </div>
      <hr />
    </div>
  ));
  return (
    <motion.section
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      className={classes.cart}
    >
      <h2 className={classes.heading}>CART</h2>
      <div onClick={handleClose} className={classes.cancel}>
        <CloseIcon style={{ fontSize: "2rem" }} />
      </div>
      <div className={[classes["cart-header"], classes["cart-row"]].join(" ")}>
        <span
          className={[classes["cart-item"], classes["cart-column"]].join(" ")}
        >
          {" "}
          ITEM
        </span>
        <span
          className={[classes["cart-price"], classes["cart-column"]].join(" ")}
        >
          PRICE
        </span>
        <span
          className={[classes["cart-quantity"], classes["cart-column"]].join(
            " "
          )}
        >
          QUANTITY
        </span>
      </div>
      <hr />
      <div className={classes["cart-items"]}>{cartItems}</div>
      <div className={classes.total}>
        <span className={classes["total-title"]}>Total</span>
        <span className={classes["total-value"]}>${total}</span>
      </div>
      <button className={classes["purchase-btn"]}>PURCHASE</button>
    </motion.section>
  );
}

export default Cart;
