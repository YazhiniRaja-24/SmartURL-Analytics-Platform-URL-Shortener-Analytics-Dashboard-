import { useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import { useAuth } from "../context/AuthContext";
import { useUrls } from "../context/UrlContext";

import {
  updateProfile,
  changePassword,
} from "../services/authService";

function Profile() {
  const { user } = useAuth();
  const { urls } = useUrls();

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [
    showPasswordModal,
    setShowPasswordModal,
  ] = useState(false);

  const [profileData, setProfileData] =
    useState({
      name: user?.name || "",
      email: user?.email || "",
    });
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || ""
  );

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="text-3xl font-bold text-white">
          User Not Found
        </h1>
      </div>
    );
  }

  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (sum, url) =>
      sum + (url.clicks || 0),
    0
  );

  const handleProfileUpdate =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await updateProfile(
            profileData
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );

        toast.success(
          "Profile Updated Successfully 🚀"
        );

        setShowEditModal(false);

        window.location.reload();
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Update Failed"
        );
      }
    };

  const handlePasswordChange =
    async (e) => {
      e.preventDefault();

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {
        return toast.error(
          "Passwords do not match"
        );
      }

      try {
        await changePassword({
          currentPassword:
            passwordData.currentPassword,
          newPassword:
            passwordData.newPassword,
        });

        toast.success(
          "Password Changed Successfully 🔐"
        );

        setShowPasswordModal(
          false
        );

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Password Change Failed"
        );
      }
    };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar active="profile" />

      <div className="ml-0 flex flex-1 flex-col md:ml-[260px]">
        <Navbar pageTitle="Profile" />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white">
              My Profile 👤
            </h1>
            <p className="mt-3 text-lg text-slate-400">
              Manage your account information and security settings.
            </p>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/30">
            <div className="grid lg:grid-cols-3">
              <div className="flex flex-col items-center justify-center p-10">
                <div className="relative">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 p-1">
                    <div className="h-full w-full overflow-hidden rounded-full bg-slate-950">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white">
                          {user?.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    ✓
                  </div>
                </div>

                <label className="mt-4 cursor-pointer rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>

                <h2 className="mt-6 text-4xl font-bold text-white">
        {user.name}
      </h2>

      <p className="mt-2 text-slate-400">
        {user.email}
      </p>

      <span className="mt-4 rounded-full bg-violet-600/20 px-4 py-2 text-sm text-violet-400 capitalize">
        {user.role}
      </span>

    </div>

    {/* Right */}
    <div className="col-span-2 flex flex-col justify-center border-l border-slate-800 p-10">

      <h3 className="text-5xl font-bold text-white">
        Welcome Back 👋
      </h3>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
        Welcome back to your personalized SmartURL dashboard.
        Manage your account information, monitor active URLs,
        analyze performance metrics, and maintain security
        settings from a single place.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <div className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-300">
          📅 Member Since 2026
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-300">
          📍 India
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-emerald-400">
          ✅ Verified Account
        </div>

      </div>

    </div>

  </div>

</div>

{/* Stats */}
<div className="mt-10 grid gap-6 md:grid-cols-3">

  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
    <p className="text-slate-400">
      Total URLs
    </p>

    <h3 className="mt-4 text-5xl font-bold text-white">
      {totalUrls}
    </h3>

    <p className="mt-3 text-sm text-slate-500">
      Links created
    </p>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
    <p className="text-slate-400">
      Total Clicks
    </p>

    <h3 className="mt-4 text-5xl font-bold text-white">
      {totalClicks}
    </h3>

    <p className="mt-3 text-sm text-slate-500">
      Engagement generated
    </p>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
    <p className="text-slate-400">
      Account Status
    </p>

    <h3 className="mt-4 text-4xl font-bold text-emerald-400">
      Active
    </h3>

    <p className="mt-3 text-sm text-slate-500">
      Verified & Secure
    </p>
  </div>

</div>

{/* Security + Activity */}
<div className="mt-10 grid gap-6 lg:grid-cols-2">

  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

    <h3 className="mb-6 text-2xl font-bold text-white">
      Security Center 🔐
    </h3>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span className="text-slate-400">
          Account Verification
        </span>

        <span className="text-emerald-400">
          Verified
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">
          Password Status
        </span>

        <span className="text-emerald-400">
          Secure
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">
          Last Login
        </span>

        <span className="text-white">
          Today
        </span>
      </div>

    </div>

  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

    <h3 className="mb-6 text-2xl font-bold text-white">
      Recent Activity 📈
    </h3>

    <div className="space-y-5">

      <div>
        <p className="font-medium text-white">
          Logged In
        </p>

        <p className="text-sm text-slate-400">
          Today
        </p>
      </div>

      <div>
        <p className="font-medium text-white">
          Profile Updated
        </p>

        <p className="text-sm text-slate-400">
          Recent Activity
        </p>
      </div>

      <div>
        <p className="font-medium text-white">
          Account Created
        </p>

        <p className="text-sm text-slate-400">
          SmartURL User
        </p>
      </div>

    </div>

  </div>

</div>

{/* Buttons */}
<div className="mt-10 flex flex-wrap gap-4">

  <button
    onClick={() => setShowEditModal(true)}
    className="rounded-2xl bg-gradient-to-r from-violet-600 to-sky-500 px-8 py-4 font-semibold text-white"
  >
    Edit Profile
  </button>

  <button
    onClick={() =>
      setShowPasswordModal(true)
    }
    className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 font-semibold text-white"
  >
    Change Password
  </button>

</div>

</main>
       
</div>
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

          <form
            onSubmit={
              handleProfileUpdate
            }
            className="w-full max-w-md rounded-3xl bg-slate-900 p-6"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">
              Edit Profile
            </h2>

            <input
              type="text"
              value={
                profileData.name
              }
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  name:
                    e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
            />

            <input
              type="email"
              value={
                profileData.email
              }
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  email:
                    e.target.value,
                })
              }
              className="mb-6 w-full rounded-xl bg-slate-800 p-3 text-white"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-violet-600 py-3 text-white"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowEditModal(
                    false
                  )
                }
                className="flex-1 rounded-xl bg-slate-700 py-3 text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

          <form
            onSubmit={
              handlePasswordChange
            }
            className="w-full max-w-md rounded-3xl bg-slate-900 p-6"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              value={
                passwordData.currentPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword:
                    e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                passwordData.newPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword:
                    e.target.value,
                })
              }
              className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                passwordData.confirmPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword:
                    e.target.value,
                })
              }
              className="mb-6 w-full rounded-xl bg-slate-800 p-3 text-white"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-violet-600 py-3 text-white"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowPasswordModal(
                    false
                  )
                }
                className="flex-1 rounded-xl bg-slate-700 py-3 text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;