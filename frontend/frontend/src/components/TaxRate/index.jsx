import { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";

const TaxRate = () => {

  const [data,setData] = useState([])
  const [open,setOpen] = useState(false)
  const [form] = Form.useForm()

  const columns = [
    {
      title: "Tax Name",
      dataIndex: "name",
    },
    {
      title: "Tax Rate %",
      dataIndex: "rate",
    },
  ];

  const handleCreate = (values) => {

    const newTax = {
      key: Date.now(),
      name: values.name,
      rate: values.rate
    }

    setData([...data,newTax])
    setOpen(false)
    form.resetFields()
  }

  return (

    <div style={{padding:20}}>

      <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
        <h2>Tax Rate</h2>

        <Button type="primary" onClick={()=>setOpen(true)}>
          Add Tax Rate
        </Button>
      </div>

      <Table columns={columns} dataSource={data} />

      <Modal
        open={open}
        footer={null}
        title="Create Tax Rate"
        onCancel={()=>setOpen(false)}
      >

        <Form form={form} layout="vertical" onFinish={handleCreate}>

          <Form.Item label="Tax Name" name="name" rules={[{required:true}]}>
            <Input placeholder="GST 18%" />
          </Form.Item>

          <Form.Item label="Tax Rate %" name="rate">
            <InputNumber style={{width:"100%"}} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Create
          </Button>

        </Form>

      </Modal>

    </div>
  )
}

export default TaxRate