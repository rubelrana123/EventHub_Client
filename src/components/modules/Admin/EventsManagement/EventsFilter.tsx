"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
 
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const EventsFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search events..." />
        {/* <RefreshButton /> */}
                <SelectFilter
          paramName="eventType"
          placeholder="Filter by event type"
          defaultValue="All"
          options={[
            { label: "Tech", value: "Tech" },
            { label: "Business", value: "Business" },
            { label: "Conferences", value: "Conferences" },
            { label: "Trade Shows", value: "Trade Shows" },
            { label: "Seminars", value: "Seminars" },
            {
              label: "Corporate Off-Sites & Executive Meetings",
              value: "Corporate Off-Sites & Executive Meetings",
            },
            { label: "Company Parties", value: "Company Parties" },
            { label: "Product Launches", value: "Product Launches" },
            { label: "Networking", value: "Networking" },
            { label: "Festivals", value: "Festivals" },
          ]}
        />
        <ClearFiltersButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

      </div>
    </div>
  );
};

export default EventsFilter;
