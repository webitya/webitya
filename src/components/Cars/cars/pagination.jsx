"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const [pages, setPages] = useState([])
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    const generatePages = () => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      } else {
        const pageNumbers = [1]
        let startPage = Math.max(2, currentPage - 1)
        let endPage = Math.min(totalPages - 1, currentPage + 1)

        if (currentPage <= 2) {
          endPage = 4
        } else if (currentPage >= totalPages - 2) {
          startPage = totalPages - 3
        }

        if (startPage > 2) {
          pageNumbers.push(-1)
        }

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i)
        }

        if (endPage < totalPages - 1) {
          pageNumbers.push(-2)
        }

        if (totalPages > 1) {
          pageNumbers.push(totalPages)
        }

        return pageNumbers
      }
    }

    setPages(generatePages())
  }, [currentPage, totalPages])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <div className="flex items-center justify-center space-x-1 md:space-x-2">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 transition-all duration-300 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous Page</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {pages.map((page, index) =>
            page < 0 ? (
              <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-gray-400">
                •••
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  currentPage === page
                    ? "bg-white text-black font-bold shadow-glow"
                    : "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
                {currentPage === page && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-20 duration-700"></span>
                )}
              </button>
            )
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 transition-all duration-300 ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next Page</span>
        </button>
      </div>

      {/* Page info */}
      <div className="mt-4 text-sm text-gray-400">
        <span>
          Showing page {currentPage} of {totalPages}
        </span>
        <span className="mx-2">•</span>
        <span>
          {totalItems} {totalItems === 1 ? "car" : "cars"}
        </span>
      </div>
    </div>
  )
}
