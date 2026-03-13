import AnnounceIconSVG from "@/UI/AnnounceIconSVG";
import { loadAllAnnouncement } from "@/redux/rtk/features/hrm/announcement/announcementSlice";
import { List } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AnnouncementBar = () => {
  const { list, loading } = useSelector((state) => state?.announcement) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllAnnouncement());
  }, [dispatch]);

  return (
    <div>
      {list && <List
        loading={loading}
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<AnnounceIconSVG />}
              title={
                <h3 className='text-base font-medium ml-4'>{item.title}</h3>
              }
              description={
                <div className='flex items-center'>
                  <p className='text-sm text-gray-500 ml-4'>
                    {item.description}
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />}
    </div>
  );
};
export default AnnouncementBar;