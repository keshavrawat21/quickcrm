import Button from "@/UI/Button";
import Card from "@/UI/Card";
import List from "@/UI/List";
import Tabs, { Tab } from "@/UI/Tabs";
import NewQuotationInvoice from "@/components/Invoice/NewQuotationInvoice";
import Loader from "@/components/Loader/Loader";
import {
  convertQuote,
  loadSingleQuote,
} from "@/redux/rtk/features/quote/quoteSlice";
import useQuoteEmailTemplate from "@/utils/EmailTemplate/useQuoteEmailTemplate";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import SendQuoteInvoice from "./SendQuoteInvoice";

import { Tag } from "antd";

export default function QuoteDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { quote, loading } = useSelector((state) => state.quote) || {};
  const [sendEmail, setSendEmail] = useState(false);
  const { subject, body } = useQuoteEmailTemplate(quote);
  useEffect(() => {
    dispatch(loadSingleQuote(id));
  }, [dispatch, id]);

  const convertQuoteToContact = async () => {
    try {
      var result = window.confirm("Are you sure you want to Convert?");
      if (result) {
        const resp = await dispatch(convertQuote(id));

        console.log(resp?.payload?.message === "success");
        {
          dispatch(loadSingleQuote(id));
        }
      }
    } catch (err) {}
  };
  return (
    <>
      {quote ? (
        <div className="flex flex-col lg:flex-row gap-2 md:gap-4">
          <Card className="w-full lg:w-2/3" bodyClass={"p-0"}>
            <div className="flex flex-col sm:flex-row sm:justify-between mx-2 py-2 border-b sm:items-center gap-2">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div>
                  <NewQuotationInvoice title={"Quotation"} data={quote} />
                </div>
                <Button
                  className="flex-row-reverse"
                  color="gray"
                  icon={<FaRegPaperPlane size={15} />}
                  onClick={() => setSendEmail(true)}>
                  Send
                </Button>
                <Button
                  disabled={quote?.isConverted === "true"}
                  onClick={convertQuoteToContact}
                  className={
                    quote?.isConverted === "true"
                      ? "bg-gray-500 text-white"
                      : "bg-primary text-white"
                  }>
                  {quote?.isConverted === "true" ? "Converted" : "Convert"}
                </Button>
              </div>
            </div>

            {sendEmail ? (
              <div>
                <SendQuoteInvoice
                  body={body}
                  subject={subject}
                  setSendEmail={setSendEmail}
                  // customerEmail={customerEmail}
                  invoice={quote}
                />
              </div>
            ) : (
              <Tabs className="mt-4">
                <Tab
                  myKey={"products"}
                  label={
                    <span>
                      Product{" "}
                      <span className="ml-2 rounded-full bg-slate-300 text-slate-700 px-1">
                        {quote?.quoteProduct?.length}
                      </span>
                    </span>
                  }>
                  <ProductList loading={loading} list={quote?.quoteProduct} />
                </Tab>
              </Tabs>
            )}
          </Card>
          <div className="w-full lg:w-1/3 flex flex-col gap-2 md:gap-4">
            <Card title={"Quote Info"}>
              <List
                labelClassName="w-[30%] sm:w-[40%]"
                list={[
                  {
                    label: "Quote Name",
                    value: quote?.quoteName,
                  },
                  {
                    label: "Quote Date",
                    value: moment(quote?.quoteDate).format("MMMM Do YYYY"),
                  },
                  {
                    label: "Expiration Date",
                    value: moment(quote?.expirationDate).format("MMMM Do YYYY"),
                  },
                  {
                    label: "Quote Stage",
                    value: (
                      <Tag
                        color={
                          quote?.quoteStage?.quoteStageName === "Draft"
                            ? "blue"
                            : quote?.quoteStage?.quoteStageName === "Sent"
                            ? "green"
                            : quote?.quoteStage?.quoteStageName === "Accepted"
                            ? "gold"
                            : "red"
                        }>
                        {quote?.quoteStage?.quoteStageName}
                      </Tag>
                    ),
                    hidden: !quote?.quoteStage,
                  },
                ]}
              />
            </Card>
            <Card title={"Price Summary"}>
              <List
                labelClassName="w-[30%] sm:w-[40%]"
                list={[
                  {
                    label: "Total Amount",
                    value: quote?.totalAmount,
                  },
                  {
                    label: "Discount",
                    value: quote?.discount,
                  },
                ]}
              />
            </Card>
            <Card>
              <List
                labelClassName="w-[40%] font-bold"
                list={[
                  {
                    label: "Terms And Conditions",
                    value: quote?.termsAndConditions,
                    className: "flex-col gap-1",
                  },
                  {
                    label: "Description",
                    value: quote?.description,
                    className: "flex-col gap-1",
                  },
                ]}
              />
            </Card>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
