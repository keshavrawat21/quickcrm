import { useEffect, useState } from "react";

import { Button, Popover } from "antd";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { RiFullscreenExitLine, RiFullscreenLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}>
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ onPress, data, loading, isSideNavNan }) {
  const userId = localStorage.getItem("id");
  const isLogged = localStorage.getItem("isLogged");
  const user = localStorage.getItem("user");
  const element = document.documentElement;
  const dispatch = useDispatch();

  useEffect(() => window.scrollTo(0, 0));

  const [fullScreen, setFullScreen] = useState(false);
  const [imageError, setImageError] = useState();

  const handleFullScreenClick = () => {
    setFullScreen(true);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  const handleExitFullScreenClick = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
      } else {
        setFullScreen(false);
      }
    });
  }, []);

  return (
    <>
      <div className="sticky top-0 z-10 flex w-full justify-between items-center py-3 pl-4 bg-white dark:bg-[#1C1B20] border-b ">
        <div className="relative flex items-center">
          {isLogged && !isSideNavNan && (
            <Button
              type="link"
              className="block md:hidden"
              onClick={() => onPress()}
              style={{ boxShadow: "none" }}>
              {toggler}
            </Button>
          )}
        </div>

        <div className="flex items-end mr-[1rem] gap-4 md:gap-4">
          {isLogged && (
            <div>
              {fullScreen ? (
                <RiFullscreenExitLine
                  onClick={handleExitFullScreenClick}
                  size={22}
                  className="cursor-pointer dark:text-white"
                />
              ) : (
                <RiFullscreenLine
                  onClick={handleFullScreenClick}
                  size={22}
                  className="cursor-pointer dark:text-white"
                />
              )}
            </div>
          )}

          {isLogged && (
            <Popover
              placement="rightBottom"
              trigger="click"
              content={
                <div className="min-w-[150px] rounded-lg">
                  <p className="flex items-center gap-1  px-3 py-2  hover:bg-slate-200 rounded-lg">
                    <UserOutlined style={{ fontSize: "16px" }} />{" "}
                    <Link
                      to={`/admin/staff/${userId}`}
                      className="logout-text uppercase font-weight-bold me-2 ms-1">
                      {user}
                    </Link>
                  </p>

                  <Link
                    to="/admin/auth/logout"
                    className="flex items-center gap-1 px-3 py-2 hover:bg-slate-200 rounded-lg">
                    <LogoutOutlined className=" text-red-500" />
                    <span className="logout-text font-weight-bold">
                      Log Out
                    </span>
                  </Link>
                </div>
              }
              arrow={false}>
              <UserOutlined className="text-xl" />
            </Popover>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
