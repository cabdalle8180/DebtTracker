import { useState } from "react";
import Sidebar from "../components/Sidebar";
import OverviewTab from "../components/OverviewTab";
import CustomersUI from "../components/CustomersUI";
import DebtTab from "../components/DebtTab";

function DashboardPage() {
  const [currentTab, setCurrentTab] = useState("overview");

  const renderContent = () => {
    switch (currentTab) {
      case "overview":
        return <OverviewTab />;
      case "customers":
        return <CustomersUI />;
      case "debt":
        return <DebtTab/>;
      case "reports":
        return <div>Reports Page</div>;
      case "settings":
        return <div>Settings Page</div>;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenNewEntryModal={() => {}}
        preferences={{ shopName: "My Shop" }}
        onLogout={() => console.log("logout")}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default DashboardPage;