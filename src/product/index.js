import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  useEffect(function () {
    axios
      .get(
        "https://06b553e5-f05f-412e-9520-3b3dc381ce19.mock.pstmn.io/products/" +
          params.id
      )
      .then(function (result) {
        setProduct(result.data);
      })
      .catch(function (error) {
        console.log("에러발생 : " + error);
      });
  }, []);

  if (product === null) {
    return <h1>상품 정보 로딩중..</h1>;
  }

  return (
    <div>
      <div id="image-box">
        <img src={`/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="product-name">{product.name}</div>
        <div id="product-price">{product.price}원</div>
        <div id="createdAt">2022년 6월 17일</div>
        <div id="product-desc">{product.desc}</div>
      </div>
    </div>
  );
}

export default ProductPage;
