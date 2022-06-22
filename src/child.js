function childComponent(props) {
  const { name, age } = props;

  return (
    <div>
      <p>
        이름은 {name}이며 나이는 {age}다
      </p>
    </div>
  );
}

export default childComponent;
