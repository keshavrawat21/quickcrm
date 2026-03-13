import { Card, Collapse } from "antd";
import {
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DetailsEmail({ email }) {
  const relatedItems = [
    {
      data: email?.contact,
      label: "Contact",
      link: `/admin/contact/${email?.contact?.id}`,
      name: `${email?.contact?.firstName} ${email?.contact?.lastName}`,
      icon: <HiOutlineUser className="w-4 h-4" />,
    },
    {
      data: email?.company,
      label: "Company",
      link: `/admin/company/${email?.company?.id}`,
      name: email?.company?.companyName,
      icon: <HiOutlineOfficeBuilding className="w-4 h-4" />,
    },
    {
      data: email?.opportunity,
      label: "Opportunity",
      link: `/admin/opportunity/${email?.opportunity?.id}`,
      name: email?.opportunity?.opportunityName,
      icon: <HiOutlineLightBulb className="w-4 h-4" />,
    },
    {
      data: email?.quote,
      label: "Quote",
      link: `/admin/quote/${email?.quote?.id}`,
      name: email?.quote?.quoteName,
      icon: <HiOutlineDocumentText className="w-4 h-4" />,
    },
  ].filter((item) => item.data);

  return (
    <>
      {email && (
        <Card className="overflow-hidden border-none">
          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {relatedItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                  <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-blue-600 transition-colors">
                    {item.icon}
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Email Content */}
          <div className="space-y-4">
            {/* To Section */}
            <div className="bg-white p-4 rounded-lg border-none">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide min-w-[40px]">
                  To:
                </span>
                <span className="text-base font-medium text-gray-900">
                  {email?.receiverEmail}
                </span>
              </div>
            </div>

            {/* CC/BCC Section */}
            {(email?.cc?.length > 0 || email?.bcc?.length > 0) && (
              <Collapse
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                bordered={false}
                defaultActiveKey={[]}
                expandIconPosition="end">
                {!!email?.cc?.length && (
                  <Collapse.Panel
                    header={
                      <span className="text-sm font-semibold text-gray-700">
                        CC ({email.cc.length})
                      </span>
                    }
                    key="1"
                    className="bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      {email.cc.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                          {item.ccEmail}
                        </span>
                      ))}
                    </div>
                  </Collapse.Panel>
                )}
                {!!email?.bcc?.length && (
                  <Collapse.Panel
                    header={
                      <span className="text-sm font-semibold text-gray-700">
                        BCC ({email.bcc.length})
                      </span>
                    }
                    key="2"
                    className="bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      {email.bcc.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                          {item.bccEmail}
                        </span>
                      ))}
                    </div>
                  </Collapse.Panel>
                )}
              </Collapse>
            )}

            {/* Subject Section */}
            <div className="bg-white  p-4 rounded-lg border-none">
              <div className="flex items-start gap-3">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide min-w-[70px] mt-0.5">
                  Subject:
                </span>
                <span className="text-base font-semibold text-gray-900 flex-1">
                  {email?.subject}
                </span>
              </div>
            </div>

            {/* Body Section */}
            <Collapse
              bordered={false}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              defaultActiveKey={["1"]}
              expandIconPosition="end">
              <Collapse.Panel
                header={
                  <div className="flex items-center gap-2">
                    <HiOutlineMail className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      Email Body
                    </span>
                  </div>
                }
                key="1"
                className="bg-gray-50">
                <div
                  className="prose prose-sm max-w-none p-4 bg-white rounded-lg border border-gray-100"
                  dangerouslySetInnerHTML={{ __html: email?.body }}
                />
              </Collapse.Panel>
            </Collapse>
          </div>
        </Card>
      )}
    </>
  );
}
