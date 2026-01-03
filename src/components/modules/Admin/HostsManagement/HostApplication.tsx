import HostApplicationTable from "./HostApplicationTable";

 
export default function HostApplication({hostApplicationsResult}: {hostApplicationsResult: any}) {
  return (
    <div>
    <HostApplicationTable
  data={hostApplicationsResult?.data || []  }
  onApprove={(id) => approveHostApplication(id)}
  onReject={(id) => rejectHostApplication(id)}
  onDelete={(id) => deleteHostApplication(id)}
/>

    </div>
  )
}
