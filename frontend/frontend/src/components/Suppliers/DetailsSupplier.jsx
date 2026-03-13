import { EditOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearSupplier,
  loadSupplier,
} from "../../redux/rtk/features/supplier/supplierSlice";
import Loader from "../Loader/Loader";

import Button from "@/UI/Button";
import Card from "@/UI/Card";
import List from "@/UI/List";
import Menu from "@/UI/Menu";
import Tabs, { Tab } from "@/UI/Tabs";
import { Popover } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import SupplierInvoiceTable from "../Card/SupplierInvoiceList";
import SupplierReturnInvoiceList from "./ListCard/SupplierReturnInvoiceList";
import SupplierTransactionList from "./ListCard/SupplierTransactionList";
import SendEmail from "./SendEmail";
import NewPurchaseInvoice from "../Invoice/NewPurchaseInvoice";
import NewSupplierDetails from "../Invoice/NewSupplierDetails";

//PopUp

const DetailsSupplier = () => {
  const { id } = useParams();
  const [sendForm, setSendForm] = useState(false);
  //dispatch
  const dispatch = useDispatch();
  const supplier = useSelector((state) => state.suppliers.supplier);

  useEffect(() => {
    dispatch(loadSupplier(id));
    return () => {
      dispatch(clearSupplier());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div className=''>
        {supplier ? (
          <Fragment key={supplier.id}>
            <div className='flex gap-2 md:gap-4'>
              <Card className='w-2/3' bodyClass={"p-0"}>
                <div className='flex justify-between mx-2 py-2 border-b items-center'>
                  <div className=' flex gap-3'>
                    <div>
                     <NewSupplierDetails data={supplier} title={"Supplier Invoice List"}/>

                    </div>
                    <Button
                      className='flex-row-reverse'
                      color='gray'
                      icon={<FaRegPaperPlane size={15} />}
                      onClick={() => {
                        setSendForm(true);
                      }}
                    >
                      Send
                    </Button>

                    <Popover
                      content={
                        <Menu
                          items={[
                            {
                              key: "status",
                              label: (
                                <Link
                                  className='flex items-center gap-2'
                                  to={`/admin/supplier/${supplier.id}/update`}
                                  state={{ data: supplier }}
                                >
                                  <EditOutlined /> Edit
                                </Link>
                              ),
                            },
                          ]}
                        />
                      }
                      placement='bottomRight'
                      arrow={false}
                      trigger='click'
                    >
                      <Button
                        color={"gray"}
                        icon={<BsThreeDotsVertical size={15} />}
                        className='  px-3'
                      ></Button>
                    </Popover>
                  </div>
                </div>

                {!sendForm ? (
                  <Tabs className='mt-4'>
                    <Tab
                      label={
                        <span>
                          Invoice{" "}
                          <span className='ml-2 rounded-full bg-slate-300 text-slate-700 px-1'>
                            {supplier.totalPurchaseInvoice}
                          </span>
                        </span>
                      }
                    >
                      <SupplierInvoiceTable
                        list={supplier.purchaseInvoice}
                        linkTo='/admin/purchase'
                      />
                    </Tab>
                    <Tab
                      label={
                        <span>
                          Return Invoice{" "}
                          <span className='ml-2 rounded-full bg-slate-300 text-slate-700 px-1'>
                            {supplier.totalReturnPurchaseInvoice}
                          </span>
                        </span>
                      }
                    >
                      <SupplierReturnInvoiceList
                        list={supplier.returnPurchaseInvoice}
                      />
                    </Tab>
                    <Tab label='Transactions'>
                      <SupplierTransactionList list={supplier.allTransaction} />
                    </Tab>
                  </Tabs>
                ) : (
                  <SendEmail setSendEmail={setSendForm} data={supplier} />
                )}
              </Card>
              <div className='w-1/3 flex flex-col gap-2 md:gap-4'>
                <Card title='Supplier'>
                  <List
                    labelClassName='w-[30%]'
                    list={[
                      {
                        label: "Name",
                        value: supplier.name,
                      },
                      {
                        label: "Email",
                        value: supplier.email || "N/A",
                      },
                      {
                        label: "Phone",
                        value: supplier.phone,
                      },
                      {
                        label: "Address",
                        value: supplier.address,
                      },
                    ]}
                  />
                </Card>
                <Card>
                  <List
                    labelClassName='w-[30%]'
                    list={[
                      {
                        label: "Total Amount",
                        value: supplier.totalAmount,
                      },
                      {
                        label: "Paid Amount",
                        value: (
                          <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                            {supplier.totalPaidAmount}
                          </div>
                        ),
                      },
                      {
                        label: "Return Amount",
                        value: (
                          <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                            {supplier.totalReturnAmount}
                          </div>
                        ),
                        className: "border-b pb-1",
                      },
                      {
                        label: "Due Amount",
                        value: supplier.dueAmount,
                      },
                    ]}
                  />
                </Card>
              </div>
            </div>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsSupplier;
