// // import { useParams } from "react-router-dom";
// // import { mockUrls } from "../constants/mockUrls";

// // function PublicStats() {
// //   const { shortCode } = useParams();

// //   const url = mockUrls.find(
// //     (item) => item.shortCode === shortCode
// //   );

// //   if (!url) {
// //     return (
// //       <div className="flex min-h-screen items-center justify-center bg-slate-950">
// //         <h1 className="text-3xl font-bold text-red-500">
// //           URL Not Found
// //         </h1>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-950 p-8">
// //       <div className="mx-auto max-w-4xl">

// //         <h1 className="mb-8 text-center text-4xl font-bold text-white">
// //           Public Statistics 📊
// //         </h1>

// //         <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

// //           <div className="mb-6">
// //             <p className="text-slate-400">
// //               Original URL
// //             </p>

// //             <h2 className="text-lg text-white">
// //               {url.originalUrl}
// //             </h2>
// //           </div>

// //           <div className="mb-6">
// //             <p className="text-slate-400">
// //               Short URL
// //             </p>

// //             <h2 className="text-sky-400">
// //               {url.shortUrl}
// //             </h2>
// //           </div>

// //           <div className="grid gap-6 md:grid-cols-2">

// //             <div className="rounded-2xl bg-slate-800 p-6">
// //               <p className="text-slate-400">
// //                 Total Clicks
// //               </p>

// //               <h3 className="mt-2 text-4xl font-bold text-white">
// //                 {url.clicks}
// //               </h3>
// //             </div>

// //             <div className="rounded-2xl bg-slate-800 p-6">
// //               <p className="text-slate-400">
// //                 Status
// //               </p>

// //               <h3
// //                 className={`mt-2 text-2xl font-bold ${
// //                   url.status === "Active"
// //                     ? "text-emerald-400"
// //                     : "text-red-400"
// //                 }`}
// //               >
// //                 {url.status}
// //               </h3>
// //             </div>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default PublicStats;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { getPublicStats } from "../services/urlService";

// function PublicStats() {
//   const { shortCode } =
//     useParams();

//   const [urlData, setUrlData] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response =
//         await getPublicStats(
//           shortCode
//         );

//       setUrlData(
//         response.data
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
//         Loading...
//       </div>
//     );
//   }

//   if (!urlData) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-950">
//         <h1 className="text-3xl font-bold text-red-500">
//           URL Not Found
//         </h1>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 p-8">
//       <div className="mx-auto max-w-4xl">

//         <h1 className="mb-8 text-center text-4xl font-bold text-white">
//           Public Statistics 📊
//         </h1>

//         <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

//           <div className="mb-6">
//             <p className="text-slate-400">
//               Original URL
//             </p>

//             <h2 className="break-all text-lg text-white">
//               {urlData.originalUrl}
//             </h2>
//           </div>

//           <div className="mb-6">
//             <p className="text-slate-400">
//               Short URL
//             </p>

//             <h2 className="break-all text-sky-400">
//               {urlData.shortUrl}
//             </h2>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">

//             <div className="rounded-2xl bg-slate-800 p-6">
//               <p className="text-slate-400">
//                 Total Clicks
//               </p>

//               <h3 className="mt-2 text-4xl font-bold text-white">
//                 {urlData.clicks}
//               </h3>
//             </div>

//             <div className="rounded-2xl bg-slate-800 p-6">
//               <p className="text-slate-400">
//                 Status
//               </p>

//               <h3
//                 className={`mt-2 text-2xl font-bold ${
//                   urlData.status ===
//                   "Active"
//                     ? "text-emerald-400"
//                     : "text-red-400"
//                 }`}
//               >
//                 {urlData.status}
//               </h3>
//             </div>

//             <div className="rounded-2xl bg-slate-800 p-6">
//               <p className="text-slate-400">
//                 Created
//               </p>

//               <h3 className="mt-2 text-white">
//                 {new Date(
//                   urlData.createdAt
//                 ).toLocaleDateString()}
//               </h3>
//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default PublicStats;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicStats } from "../services/urlService";

function PublicStats() {
  const { shortCode } = useParams();

  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response =
        await getPublicStats(shortCode);

      setUrl(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!url) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="text-4xl font-bold text-red-500">
          URL Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Public Statistics 📊
        </h1>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="mb-6">
            <p className="text-slate-400">
              Original URL
            </p>

            <h2 className="break-all text-white">
              {url.originalUrl}
            </h2>
          </div>

          <div className="mb-6">
            <p className="text-slate-400">
              Short URL
            </p>

            <h2 className="text-sky-400">
              {url.shortUrl}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl bg-slate-800 p-6">
              <p className="text-slate-400">
                Total Clicks
              </p>

              <h3 className="mt-2 text-4xl font-bold text-white">
                {url.clicks}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-800 p-6">
              <p className="text-slate-400">
                Status
              </p>

              <h3 className="mt-2 text-2xl font-bold text-emerald-400">
                {url.status}
              </h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default PublicStats;