import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../config/constants";
import "./index.css";
function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const onSubmit = (values) => {
    console.log(values);
    // 폼에 입력한 데이터들이 정립되어 있음.
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.desc,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log("RESULT : ", result);
        history.replace("/"); //메인페이지로 이동.
        //replace : 이전페이지의 기록이 사라진채 페이지가 대체됨.
      })
      .catch((err) => {
        console.error(err);
        message.error(`에러가 발생했습니다. ${err.message}`);
      });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품업로드" onFinish={onSubmit}>
        <Form.Item
          name={"upload"}
          label={<div className="upload-label">이미지사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-image" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-image-placeholder">
                <img src="/images/images/icons/camera.png" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider /> {/* 선을 그어줌 */}
        <Form.Item
          name="seller"
          label={<div className="upload-label">판매자 명</div>}
          rules={[{ required: true, message: "판매자 이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요"
          ></Input>
        </Form.Item>
        <Divider /> {/* 선을 그어줌 */}
        <Form.Item
          name={"name"}
          label={<div className="upload-label">상품이름</div>}
          rules={[{ required: true, message: "상품이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품이름을 입력해주세요"
          ></Input>
        </Form.Item>
        <Divider /> {/* 선을 그어줌 */}
        <Form.Item
          name={"price"}
          label={<div className="upload-label">상품가격</div>}
          rules={[{ required: true, message: "상품가격을 입력해주세요" }]}
        >
          <InputNumber
            defaultValue={0}
            className="upload-name"
            size="large"
          ></InputNumber>
        </Form.Item>
        <Divider /> {/* 선을 그어줌 */}
        <Form.Item
          name={"desc"}
          label={<div className="upload-label">상품소개</div>}
          rules={[{ required: true, message: "상품소개를 입력해주세요" }]}
        >
          <Input.TextArea
            size="large"
            id="product-desc"
            showCount
            maxLength={300}
            placeholder="상품소개를 적어주세요"
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            {/* 제출할떄 쓰는 버튼 */}
            상품 등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
