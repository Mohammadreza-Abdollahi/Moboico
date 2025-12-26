"use client";

import {
  faAlignRight,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Pagination = ({ page, totalPages, basePath = "/shop" }) => {
  if (totalPages <= 1) return null;

  const current = Number(page);
  const delta = 2;

  const pages = [];
  const start = Math.max(1, current - delta);
  const end = Math.min(totalPages, current + delta);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination inline-block text-center py-1 rounded">
      {current < totalPages && (
        <Link
          className="px-3 py-1 bg-pal2-600 text-white border-4 border-pal2-500 rounded-r"
          href={`${basePath}?page=${current + 1}`}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </Link>
      )}

      {pages.map((p) => (
        <Link
          className={`${
            p === current
              ? "bg-pal2-600 text-white cursor-default"
              : "bg-pal2-500 text-white hover:bg-pal2-600"
          } px-3 py-1 bg-pal2-500 text-white border-4 border-pal2-500`}
          key={p}
          href={`${basePath}?page=${p}`}
          aria-current={p === current ? "page" : undefined}
        >
          {p.toLocaleString("fa")}
        </Link>
      ))}

      {current > 1 && (
        <Link
          className="px-3 py-1 bg-pal2-600 text-white border-4 border-pal2-500 rounded-l"
          href={`${basePath}?page=${current - 1}`}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
