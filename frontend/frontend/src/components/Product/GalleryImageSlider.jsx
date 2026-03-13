import { deleteProductGalleryImage } from "@/redux/rtk/features/product/GalleryImageSlice";
import { loadSingleProduct } from "@/redux/rtk/features/product/productSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function GalleryImageSlider({ data = [] }) {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const onDelete = async (id) => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const res = await dispatch(
        deleteProductGalleryImage({
          id: productId,
          values: { galleryImage: id },
        })
      );
      if (res.payload?.message === "success") {
        dispatch(loadSingleProduct(productId));
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {data.map((image) => (
          <div
            key={image.id}
            className="relative w-[150px] h-[90px] p-1 md:p-2 group">
            <Image
              className="object-fill"
              height={90}
              width={150}
              src={
                `${import.meta.env.VITE_APP_API}/media/view/${
                  image.imageName
                }` || "/images/default.jpg"
              }
            />
            <div className="absolute top-4 right-0 invisible  group-hover:visible">
              <div
                onClick={() => onDelete(image.imageName)}
                className="flex items-center gap-2">
                <DeleteOutlined
                  className={`bg-red-600 text-white inline-block rounded-md p-3`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
