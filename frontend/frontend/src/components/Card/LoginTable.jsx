import { Button } from "antd"; // Assuming you're using Ant Design buttons

const LoginTable = ({ setDefaultValue }) => {
  const handleDemoLogin = () => {
    setDefaultValue([
      {
        username: "demo",
        password: "5555",
      },
    ]);
  };

  const handleStaffLogin = () => {
    setDefaultValue([
      {
        username: "staff",
        password: "5555",
      },
    ]);
  };

  return (
    <div className="mt-6 flex gap-2 md:gap-5 justify-center">
      <Button
        className="mb-2 w-full"
        style={{ backgroundColor: "#2158e1", color: "white", border: "none" }}
        onClick={handleDemoLogin}>
        Demo Login
      </Button>
      <Button
        className="w-full"
        style={{ backgroundColor: "#2158e1", color: "white", border: "none" }}
        onClick={handleStaffLogin}>
        Staff Login
      </Button>
    </div>
  );
};

export default LoginTable;
