import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiCopy,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { MdQrCode } from "react-icons/md";

import QRCodeModal from "./QRCodeModal";

import {
  deleteUserUrl,
  updateUserUrl,
} from "../../services/urlService";

import { useUrls } from "../../context/UrlContext";

const thClass =
  "px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 sm:px-6 lg:px-8 lg:py-5";

const actionBtnClass =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/80 text-slate-400 transition-all hover:bg-slate-800 hover:text-white";

function formatCreatedDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function UrlTable({ urls = [] }) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  const { removeUrl, fetchUrls } = useUrls();

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied Successfully 🚀");
  };

  const handleEdit = async (url) => {
    try {
      const newUrl = prompt("Enter New URL", url.originalUrl);

      if (!newUrl) return;

      await updateUserUrl(url._id, {
        originalUrl: newUrl,
        expiryDate: url.expiryDate,
      });

      await fetchUrls();

      toast.success("URL Updated Successfully 🚀");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserUrl(id);

      removeUrl(id);

      await fetchUrls();

      toast.success("URL Deleted Successfully");
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-700/80 bg-[#272a31]">
              <th className={thClass}>Original URL</th>
              <th className={thClass}>Short URL</th>
              <th className={`${thClass} text-center`}>Clicks</th>
              <th className={thClass}>Created</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} text-right`}>Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700/30">
            {urls.map((url) => {
              const isExpired =
                url.expiryDate &&
                new Date(url.expiryDate) < new Date();

              return (
                <tr
                  key={url._id}
                  className="group transition-colors hover:bg-slate-800/40"
                >
                  <td className="max-w-[200px] px-4 py-5 sm:max-w-xs sm:px-6 lg:px-8 lg:py-6">
                    <p
                      className="truncate text-sm text-slate-300"
                      title={url.originalUrl}
                    >
                      {url.originalUrl}
                    </p>
                  </td>

                  <td className="max-w-[180px] px-4 py-5 sm:max-w-[220px] sm:px-6 lg:px-8 lg:py-6">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="truncate font-mono text-sm text-indigo-400"
                        title={url.shortUrl}
                      >
                        {url.shortUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(url.shortUrl)}
                        className="shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                        aria-label="Copy short URL"
                      >
                        <FiCopy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-5 text-center sm:px-6 lg:px-8 lg:py-6">
                    <span className="font-mono text-sm font-bold text-white">
                      {url.clicks || 0}
                    </span>
                  </td>

                  <td className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
                    <p className="whitespace-nowrap text-sm text-slate-500">
                      {formatCreatedDate(url.createdAt)}
                    </p>
                  </td>

                  <td className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
                    {isExpired ? (
                      <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-400">
                        Expired
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUrl(url.shortUrl);
                          setIsQrOpen(true);
                        }}
                        className={`${actionBtnClass} hover:border-violet-500/50 hover:text-violet-400`}
                        aria-label="Show QR code"
                      >
                        <MdQrCode className="h-[18px] w-[18px]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(url)}
                        className={`${actionBtnClass} hover:border-amber-500/50 hover:text-amber-400`}
                        aria-label="Edit URL"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(url._id)}
                        className={`${actionBtnClass} hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400`}
                        aria-label="Delete URL"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        url={selectedUrl}
      />
    </>
  );
}

export default UrlTable;
