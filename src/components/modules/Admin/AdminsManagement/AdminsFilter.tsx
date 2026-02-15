"use client";
 
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
 
const AdminsFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search name ,email, contact..." />
        <RefreshButton />
      </div>
  
    </div>
  );
};

export default AdminsFilter;
