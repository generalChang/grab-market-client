import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import { Button, message } from "antd";
function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${params.id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.log("에러발생 : " + error);
      });
  };

  useEffect(function () {
    getProduct();
  }, []);

  if (product === null) {
    return <h1>상품 정보 로딩중..</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${params.id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch((err) => {
        message.error("에러가 발생했습니다.");
      });
  };
  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="product-name">{product.name}</div>
        <div id="product-price">{product.price}원</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button
          size="large"
          id="purchase-button"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          구매하기
        </Button>
        <pre id="product-desc">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
