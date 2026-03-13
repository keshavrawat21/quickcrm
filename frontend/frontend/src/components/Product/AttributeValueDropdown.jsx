import { Select, Tag } from "antd";

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const AttributeValueDropdown = ({
  name,
  data,
  attributeValue,
  attributeValueHandler,
}) => {
  const dataFiltered = data.filter(
    (dataSingle) => dataSingle.status === "true"
  );

  const modData = dataFiltered.map((dataSingle) => {
    return {
      id: dataSingle.id,
      label: dataSingle.name,
      value: dataSingle.name,
    };
  });

  const handleChange = (selectedAttributeValue) => {
    const selectedAttributeId = selectedAttributeValue.map((item) => {
      const foundAttribute = modData.find(
        (modDataItem) => modDataItem.value === item
      );

      return foundAttribute.id;
    });
    attributeValueHandler(name, selectedAttributeId);
  };

  const defaultValue = attributeValue[name]?.map((item) => {
    return data.find((d) => d.id == item)?.name;
  });

  return (
    <Select
      mode='multiple'
      tagRender={tagRender}
      style={{
        width: "100%",
      }}
      defaultValue={defaultValue}
      maxTagCount={0}
      options={modData}
      maxTagPlaceholder={(values) => values.length + " items Selected"}
      placeholder='Nothing Selected'
      onChange={handleChange}
    />
  );
};
export default AttributeValueDropdown;
