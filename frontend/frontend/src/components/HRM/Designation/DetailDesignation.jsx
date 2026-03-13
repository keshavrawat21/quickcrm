import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import UserListCard from "./List/UserListCard";
import {
  clearDesignation,
  loadSingleDesignation,
} from "@/redux/rtk/features/hrm/designation/designationSlice";
import Loader from "@/components/Loader/Loader";
import Modal from "@/UI/Modal";
import UpdateDesignation from "./UpdateDesignation";
import { CiEdit } from "react-icons/ci";
//PopUp

const DetailDesignation = () => {
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  //dispatch
  const dispatch = useDispatch();
  const designation = useSelector((state) => state.designations.designation);

  useEffect(() => {
    dispatch(loadSingleDesignation(id));
    return () => {
      dispatch(clearDesignation());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div className="mr-top">
        {designation ? (
          <Fragment key={designation.id}>
            <Card bordered={false} style={{}}>
              <div className="flex justify-between" style={{ padding: 0 }}>
                <div className="w-50">
                  <h5 className="text-xl">
                    <span className="mr-left">{designation.name}</span>
                  </h5>
                </div>
                <div className="flex items-center text-end w-50">
                  <span
                    className="cursor-pointer"
                    onClick={() => setEdit(designation)}>
                    {/* <button className="flex justify-center items-center gap-2 rounded">
                      <CiEdit /> Edit
                    </button> */}
                    <Button
                      onClick={() => setEdit(designation)}
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}></Button>
                  </span>
                </div>
              </div>

              <UserListCard list={designation} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        title={"Edit Designation"}>
        <UpdateDesignation
          singleEditData={edit}
          onClose={() => setEdit(false)}
          id={id}
        />
      </Modal>
    </div>
  );
};

export default DetailDesignation;
