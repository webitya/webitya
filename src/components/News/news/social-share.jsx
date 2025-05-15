"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

export default function SocialShare({ title }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const [open, setOpen] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setOpen(true)
    setTimeout(() => setOpen(false), 2000) // auto-close after 2 sec
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    )
  }

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  return (
    <>
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm text-slate-500 mr-2">Share:</span>

        <button
          onClick={shareOnFacebook}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
        </button>

        <button
          onClick={shareOnTwitter}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-sky-500 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
        </button>

        <button
          onClick={shareOnLinkedin}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </button>

        <button
          onClick={handleCopyLink}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
          aria-label="Copy link"
        >
          <Link2 size={16} />
        </button>
      </motion.div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6 flex items-center gap-3">
          <CheckCircleOutlineIcon className="text-green-500" />
          <span className="text-slate-800 font-medium">Link copied to clipboard!</span>
        </Box>
      </Modal>
    </>
  )
}
