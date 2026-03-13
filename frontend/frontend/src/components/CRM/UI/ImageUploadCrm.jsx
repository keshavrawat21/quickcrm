import MediaGallery from "@/components/CommonUi/MediaUploader/MediaGallery";
import { useState } from "react";
import { BiUpload } from "react-icons/bi";
import { useDispatch } from "react-redux";

export default function ImageUploadCrm({ data, updateThunk, loadThunk }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();

  const onInsert = (selectedImage) => {
    const selectedImageI = selectedImage[0];
    setSelectedImage(selectedImageI);
    dispatch(
      updateThunk({ id: data?.id, values: { image: selectedImageI?.id } })
    )
      .then((resp) => {
        if (resp.payload.message === "success") {
          dispatch(loadThunk(data?.id));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSelectedImage(false);
      });
  };
  return (
    <>
      <MediaGallery
        onInsert={onInsert}
        filter={{ image: "image" }}
        button={
          <div className="relative">
            {selectedImage || data?.image ? (
              <img
                src={`${import.meta.env.VITE_APP_API}/media/view/${
                  selectedImage?.id || data?.image
                }`}
                alt={selectedImage?.id || data?.image}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-600 group relative">
                <BiUpload size={30} className="text-blue-500" />
              </div>
            )}
          </div>
        }
      />
    </>
  );
}
