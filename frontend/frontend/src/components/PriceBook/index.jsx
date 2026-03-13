import { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";

const PriceBook = () => {

  const [data,setData] = useState([])
  const [open,setOpen] = useState(false)
  const [form] = Form.useForm()

  const columns = [
    {title:"Product",dataIndex:"product"},
    {title:"Description",dataIndex:"description"},
    {title:"HSN Code",dataIndex:"hsn"},
    {title:"Tax Rate",dataIndex:"tax"},
    {title:"Amount",dataIndex:"amount"},
  ]

  const handleCreate = (values)=>{

    const newItem = {
      key:Date.now(),
      ...values
    }

    setData([...data,newItem])
    setOpen(false)
    form.resetFields()
  }

  return(

    <div style={{padding:20}}>

      <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
        <h2>Price Book</h2>

        <Button type="primary" onClick={()=>setOpen(true)}>
          Add Product Pricing
        </Button>
      </div>

      <Table columns={columns} dataSource={data}/>

      <Modal open={open} footer={null} title="Add Price Book" onCancel={()=>setOpen(false)}>

        <Form form={form} layout="vertical" onFinish={handleCreate}>

          <Form.Item label="Product Name" name="product">
            <Input/>
          </Form.Item>

          <Form.Item label="Product Description" name="description">
            <Input.TextArea rows={3}/>
          </Form.Item>

          <Form.Item label="HSN Code" name="hsn">
            <Input/>
          </Form.Item>

          <Form.Item label="Tax Rate %" name="tax">
            <InputNumber style={{width:"100%"}}/>
          </Form.Item>

          <Form.Item label="Amount" name="amount">
            <InputNumber style={{width:"100%"}}/>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default PriceBook