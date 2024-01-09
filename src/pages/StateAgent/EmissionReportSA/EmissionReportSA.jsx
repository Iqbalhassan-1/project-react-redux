import React, { useState } from "react";
import AllEmReportSa from "./AllReportSa/AllEmReportSa";
import ViewEmReportSa from "./View/ViewEmReportSa";

const EmissionReportSA = () => {
  const [showReport, setShowReport] = useState(true);
  return (
    <div>
      {showReport ? (
        <AllEmReportSa setShowReport={setShowReport} showReport={showReport} />
      ) : (
        <ViewEmReportSa setShowReport={setShowReport} />
      )}
    </div>
  );
};

export default EmissionReportSA;
