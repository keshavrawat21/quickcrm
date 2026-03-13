import { Image } from "antd";
import { useState } from "react";
import PdfThumbnail from "./PdfThumbnail";
import PdfViewer from "./PdfViewer";

export default function Attachment({ attachments }) {
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handlePDFClick = (pdf) => {
    const ll = pdf.imageUrl;
    setSelectedPDF(ll);
  };

  const handleClosePDF = () => {
    setSelectedPDF(null);
  };
  return (
    <>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 -mx-2">
          {attachments.map((attachment, index) => (
            <div className="" key={index}>
              {attachment.imageName?.endsWith(".pdf") && (
                <div onClick={() => handlePDFClick(attachment)}>
                  <PdfThumbnail url={attachment.imageUrl} />
                </div>
              )}
            </div>
          ))}

          <Image.PreviewGroup>
            {attachments.map((attachment, index) => (
              <>
                {!attachment.imageName?.endsWith(".pdf") && (
                  <Image width={180} height={120} src={attachment.imageUrl} />
                )}
              </>
            ))}
          </Image.PreviewGroup>
        </div>
        {selectedPDF && (
          <PdfViewer
            handleClosePDF={handleClosePDF}
            selectedPDF={selectedPDF}
          />
        )}
      </div>
    </>
  );
}
