import HostApplicationTable from "./HostApplicationTable";
import { changeHostApplicationStatus } from "@/services/host/hostsManagement";

export default function HostApplication({
  hostApplicationsResult,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hostApplicationsResult: any;
}) {

  

  return (
    <div>
      <h1 className="text-2xl font-bold m-3 " >Host Applications</h1>
      <HostApplicationTable
        data={hostApplicationsResult || []}
        onChangeStatus={changeHostApplicationStatus}
      />
    </div>
  );
}
