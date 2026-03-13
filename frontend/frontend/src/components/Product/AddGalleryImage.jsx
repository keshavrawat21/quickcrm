import MediaGallery from "@/components/CommonUi/MediaUploader/MediaGallery";
import { addProductGalleryImage } from "@/redux/rtk/features/product/GalleryImageSlice";
import { loadSingleProduct } from "@/redux/rtk/features/product/productSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

export default function AddGalleryImage({ product }) {
  const dispatch = useDispatch();

  const { id: productId, data } = product;
  // max image count is 4
  const maxCount = 4 - data?.length;
  const onInsert = async (selectedImage) => {
    const resp = await dispatch(
      addProductGalleryImage({
        values: { galleryImage: selectedImage.map((img) => img.id) },
        id: productId,
      })
    );

    if (resp.payload?.message === "success") {
      dispatch(loadSingleProduct(productId));
    }
  };

  const button = (
    <button
      className={`mx-1 flex justify-center items-center bg-[#2890FF] hover:bg-[#79b1ed] rounded p-1 gap-1 text-white`}
      type='button'
    >
      <PlusOutlined className='text-[10px] flex items-center' />
    </button>
  );

  return (
    <>
      <div>
        <div className='flex flex-wrap gap-2'>
          <MediaGallery
            button={button}
            isMultiple={true}
            onInsert={onInsert}
            maxCount={maxCount}
          />
        </div>
      </div>
    </>
  );
}
