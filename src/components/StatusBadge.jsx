import React from "react";

function StatusBadge({ status }) {
  const currentStatus = status || "Submitted";

  const getStatusClass = () => {
    switch (currentStatus.toLowerCase()) {
      case "resolved":
        return "status-resolved";

      case "in progress":
        return "status-progress";

      case "rejected":
        return "status-rejected";

      case "under review":
        return "status-review";

      default:
        return "status-submitted";
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {currentStatus}
    </span>
  );
}

export default StatusBadge;