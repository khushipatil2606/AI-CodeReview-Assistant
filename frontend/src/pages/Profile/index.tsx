import { useEffect, useState } from "react";
import { getProfile } from "../../services/github";

interface Profile {
  login: string;
  name: string;
  bio: string | null;
  avatar: string;
  followers: number;
  following: number;
  public_repos: number;
  company: string | null;
  location: string | null;
  profile: string;
}

function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(console.error);
  }, []);

  if (!profile) {
    return (
      <div className="text-white text-2xl p-10">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="p-10 bg-slate-950 min-h-screen">

      <div className="bg-slate-900 rounded-xl p-8">

        <div className="flex items-center gap-8">

          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-36 h-36 rounded-full border-4 border-blue-500"
          />

          <div>

            <h1 className="text-4xl font-bold text-white">
              {profile.name}
            </h1>

            <p className="text-slate-400 text-xl">
              @{profile.login}
            </p>

            <p className="text-slate-300 mt-3">
              {profile.bio || "No bio available"}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

          <div className="bg-slate-800 rounded-xl p-5">
            <h2 className="text-slate-400">Followers</h2>
            <p className="text-3xl font-bold text-blue-400">
              {profile.followers}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-5">
            <h2 className="text-slate-400">Following</h2>
            <p className="text-3xl font-bold text-green-400">
              {profile.following}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-5">
            <h2 className="text-slate-400">Repositories</h2>
            <p className="text-3xl font-bold text-yellow-400">
              {profile.public_repos}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-5">
            <h2 className="text-slate-400">Location</h2>
            <p className="text-lg text-white">
              {profile.location || "N/A"}
            </p>
          </div>

        </div>

        <a
          href={profile.profile}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
        >
          View GitHub Profile
        </a>

      </div>

    </div>
  );
}

export default Profile;