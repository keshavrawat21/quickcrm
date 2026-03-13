import Table from "@/UI/Table";
const columns = [
  {
    title: "NAME",
    dataIndex: "product",
    render: (product) => product.name,
    key: "product",
    tdClass: "whitespace-normal",
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  {
    title: "Quantity",
    dataIndex: "productQuantity",
    key: "productQuantity",
  },
  {
    title: "Total",
    dataIndex: "productQuantity",
    render: (qyt, all) => qyt * all.unitPrice,
    key: "total",
  },
];

export default function ProductList({ loading, list }) {
  return (
    <div className='m-2'>
      <Table
        loading={loading}
        columns={columns}
        data={list?.map((item) => ({ ...item, key: item.id })) || []}
      />
    </div>
  );
}
