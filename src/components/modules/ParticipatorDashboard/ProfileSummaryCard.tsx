import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParticipatorDashboardProfile } from "@/types/participator-dashboard";

interface ProfileSummaryCardProps {
  profile: ParticipatorDashboardProfile;
}

const ProfileSummaryCard = ({ profile }: ProfileSummaryCardProps) => {
  return (
    <Card className="border-slate-200 bg-white/95 shadow-sm">
      <CardHeader className="rounded-t-xl bg-gradient-to-r from-slate-900 to-cyan-900 text-white">
        <CardTitle>Profile Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-5 text-sm">
        <p>
          <span className="font-medium text-slate-900">Name:</span> {profile.name || "N/A"}
        </p>
        <p>
          <span className="font-medium text-slate-900">Email:</span> {profile.email || "N/A"}
        </p>
        <p>
          <span className="font-medium text-slate-900">Address:</span>{" "}
          {profile.address || "Not set"}
        </p>
        <p>
          <span className="font-medium text-slate-900">Interests:</span>{" "}
          {profile.interests || "Not set"}
        </p>
        <p>
          <span className="font-medium text-slate-900">Bio:</span> {profile.bio || "Not set"}
        </p>

        <div className="pt-2">
          <Link
            href="/my-profile"
            className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800"
          >
            Manage Full Profile
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummaryCard;
