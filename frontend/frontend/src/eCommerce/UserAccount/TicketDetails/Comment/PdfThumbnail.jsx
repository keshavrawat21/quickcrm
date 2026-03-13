import { getImageUrl } from "@/utils/functions";
import { Document, Page } from "react-pdf";


const PdfThumbnail = ({ url }) => {
  return (
    <div className='pdf-thumbnail h-[120px] w-[180px] overflow-hidden'>
      <Document file={getImageUrl(url)}>
        <Page pageNumber={1} width={100} />
      </Document>
    </div>
  );
};

export default PdfThumbnail;
