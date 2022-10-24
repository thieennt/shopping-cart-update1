import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import LogoIcon from "../../../icons/Logo";

import { Input } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const { Search } = Input;

export interface IAppProps {}

export default function Middlesection(props: IAppProps) {
  const cart = useSelector((state: RootState) => state.cart);
  const onSearch = (value: string) => console.log(value);
  return (
    <div className="middle-container">
      <div className="middle-wrapper">
        <div className="logo-section">
          <LogoIcon />
          <span>Comforty</span>
        </div>
        <div className="search-section">
          <Search placeholder="Search here..." allowClear onSearch={onSearch} />
        </div>
        <div className="cart-section">
          <Link href="/cart">
            <div className="cart-wrapper">
              <span style={{ fontSize: "22px" }}>
                <CiShoppingCart />
              </span>
              <span className="cart-text">Cart</span>
              {cart.cartItems.length > 0 && (
                <span className="cart-number">{cart.cartItems.length}</span>
              )}
            </div>
          </Link>
          <div className="user-wrapper">
            <span style={{ fontSize: "20px" }}>
              <HiOutlineUser />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
