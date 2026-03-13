import { Select } from "antd";

const AttributeValueUpdateDropDown = ({
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
      value: dataSingle.id,
    };
  });

  const handleChange = (selectedAttributeValue) => {
    attributeValueHandler(name, [selectedAttributeValue]);
  };

  const defaultValue =
    attributeValue[name]?.map((item) => {
      return data.find((d) => d.id == item)?.id;
    }) || [];

  return (
    <Select
      style={{
        width: "100%",
      }}
      defaultValue={defaultValue[0]}
      maxTagCount={0}
      options={modData}
      placeholder='Nothing Selected'
      onChange={handleChange}
    />
  );
};
export default AttributeValueUpdateDropDown;
