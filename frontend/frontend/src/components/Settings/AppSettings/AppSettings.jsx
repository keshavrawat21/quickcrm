import Tabs, { Tab } from "@/UI/Tabs";
import usePermissions from "@/utils/usePermissions";
import EmailConfig from "./EmailConfig";

export default function AppSettings() {
  const { permissions } = usePermissions();
  const hasPermissionQuickLink = permissions?.includes("readAll-quickLink");
  const hasPermissionEmailConfig = permissions?.includes("readAll-emailConfig");
  return (
    <div>
      <div className=" p-2">
        <h2 className="font-semibold text-lg">App Settings</h2>
        <p>Here you can configure the app settings.</p>
      </div>
      <div>
        <Tabs>
          {/* <Tab label="Quick Links">
            { hasPermissionQuickLink ?<QuickLinkSettings /> : <div className="p-4 font-semibold text-xl">You do not have permission to view this page.</div>}
          </Tab> */}
          <Tab label="Email Config">
            {hasPermissionEmailConfig ? (
              <EmailConfig />
            ) : (
              <div className="p-4 font-semibold text-xl">
                You do not have permission to view this page.
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
