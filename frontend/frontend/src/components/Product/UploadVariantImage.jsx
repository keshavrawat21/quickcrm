import MediaGallery from "@/components/CommonUi/MediaUploader/MediaGallery";
import { useState } from "react";
import { BiUpload } from "react-icons/bi";

export default function UploadVariantImage({ form, index }) {
  const [selectedImage, setSelectedImage] = useState([]);
  const onInsert = (selectedImage) => {
    setSelectedImage(false);
    form.setFieldsValue({
      productGroup: [
        ...form.getFieldValue("productGroup").map((item, i) => {
          if (i === index) {
            return {
              ...item,
              productThumbnailImage: selectedImage[0].id,
            };
          }
          return item;
        }),
      ],
    });
  };
  const onError = (error) => {
    setSelectedImage(true);
  };
  const img = form.getFieldValue([
    "productGroup",
    index,
    "productThumbnailImage",
  ]);
  return (
    <>
      <MediaGallery
        onInsert={onInsert}
        filter={{ image: "image" }}
        button={
          <div className="relative">
            {!selectedImage ? (
              <img
                src={`${import.meta.env.VITE_APP_API}/media/view/${img}`}
                alt={img}
                onError={onError}
                className="w-[200px] h-[130px] object-cover rounded"
              />
            ) : (
              <div className="w-[200px] h-[130px] bg-gray-300 rounded flex items-center justify-center">
                <BiUpload size={30} className="text-blue-500" />
              </div>
            )}
          </div>
        }
      />
    </>
  );
}
