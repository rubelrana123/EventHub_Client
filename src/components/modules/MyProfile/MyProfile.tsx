"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
  userInfo: UserInfo;
}

export default function MyProfile({ userInfo }: MyProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const profile =
    userInfo.role === "ADMIN"
      ? userInfo.admin
      : userInfo.role === "HOST"
      ? userInfo.host
      : userInfo.participator;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateMyProfile(formData);

      if (res.success) {
        setSuccess(res.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(res.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* PROFILE PHOTO */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={previewImage || profile?.profilePhoto || ""}
                  />
                  <AvatarFallback className="text-2xl">
                    {getInitials(userInfo.name)}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer"
                >
                  <Camera className="h-4 w-4 text-white" />
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <p className="font-semibold">{userInfo.name}</p>
              <p className="text-sm text-muted-foreground">
                {userInfo.email}
              </p>
              <p className="text-xs capitalize text-muted-foreground">
                {userInfo.role.toLowerCase()}
              </p>
            </CardContent>
          </Card>

          {/* PROFILE INFO */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="text-sm text-destructive">{error}</div>
              )}
              {success && (
                <div className="text-sm text-green-600">{success}</div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* COMMON */}
                <div>
                  <Label>Full Name</Label>
                  <Input
                    name="name"
                    defaultValue={profile?.name}
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input value={userInfo.email} disabled />
                </div>

                <div>
                  <Label>Contact Number</Label>
                  <Input
                    name="contactNumber"
                    defaultValue={profile?.contactNumber || ""}
                  />
                </div>

                {/* HOST */}
                {userInfo.role === "HOST" && (
                  <div>
                    <Label>Address</Label>
                    <Input
                      name="address"
                      defaultValue={userInfo.host?.address}
                      required
                    />
                  </div>
                )}

                {/* PARTICIPATOR */}
                {userInfo.role === "PARTICIPATOR" && (
                  <>
                    <div>
                      <Label>Address</Label>
                      <Input
                        name="address"
                        defaultValue={userInfo.participator?.address || ""}
                      />
                    </div>

                    <div>
                      <Label>Interests</Label>
                      <Input
                        name="interests"
                        defaultValue={userInfo.participator?.interests || ""}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Bio</Label>
                      <Textarea
                        name="bio"
                        defaultValue={userInfo.participator?.bio || ""}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end">
                <Button disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
