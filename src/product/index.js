import { useParams } from "react-router-dom";

function ProductPage() {
  const params = useParams();
  console.log("id : ", params.id);
  return <h1>상품 상세 페이지</h1>;
}

export default ProductPage;
