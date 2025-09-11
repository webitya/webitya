"use client"
import { useState, useEffect } from "react"
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiVideo, FiFile } from "react-icons/fi"

export default function CourseContentManager({ courseId, isAdmin = false }) {
  const [content, setContent] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    type: "lesson",
    title: "",
    description: "",
    videoUrl: "",
    materialUrl: "",
    order: 0,
  })

  useEffect(() => {
    loadCourseContent()
  }, [courseId])

  const loadCourseContent = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/content`)
      if (response.ok) {
        const data = await response.json()
        setContent(data.content || [])
      }
    } catch (error) {
      console.error("Error loading course content:", error)
    }
  }

  const handleSaveItem = async (item) => {
    try {
      const token = localStorage.getItem("token")
      const method = item.id ? "PUT" : "POST"
      const url = item.id ? `/api/courses/${courseId}/content/${item.id}` : `/api/courses/${courseId}/content`

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        loadCourseContent()
        setEditingItem(null)
        setShowAddForm(false)
        setNewItem({
          type: "lesson",
          title: "",
          description: "",
          videoUrl: "",
          materialUrl: "",
          order: 0,
        })
      }
    } catch (error) {
      console.error("Error saving content item:", error)
    }
  }

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/courses/${courseId}/content/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        loadCourseContent()
      }
    } catch (error) {
      console.error("Error deleting content item:", error)
    }
  }

  const ContentItemForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item)

    const handleSubmit = (e) => {
      e.preventDefault()
      onSave(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lesson">Lesson</option>
              <option value="material">Study Material</option>
              <option value="assignment">Assignment</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData((prev) => ({ ...prev, order: Number.parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {formData.type === "lesson" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube)</label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Material URL (PDF, Document, etc.)</label>
          <input
            type="url"
            value={formData.materialUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, materialUrl: e.target.value }))}
            placeholder="https://example.com/material.pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-700 flex items-center"
          >
            <FiX className="w-4 h-4 mr-1" />
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <FiSave className="w-4 h-4 mr-1" />
            Save
          </button>
        </div>
      </form>
    )
  }

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h3>
        <div className="space-y-4">
          {content.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {item.type === "lesson" ? (
                    <FiVideo className="w-5 h-5 text-blue-600 mr-3" />
                  ) : (
                    <FiFile className="w-5 h-5 text-green-600 mr-3" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Manage Course Content</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Content
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <ContentItemForm item={newItem} onSave={handleSaveItem} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-4">
        {content.map((item, index) => (
          <div key={index}>
            {editingItem?.id === item.id ? (
              <ContentItemForm item={editingItem} onSave={handleSaveItem} onCancel={() => setEditingItem(null)} />
            ) : (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {item.type === "lesson" ? (
                      <FiVideo className="w-5 h-5 text-blue-600 mr-3" />
                    ) : (
                      <FiFile className="w-5 h-5 text-green-600 mr-3" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span>Order: {item.order}</span>
                        <span>Type: {item.type}</span>
                        {item.videoUrl && <span>Has Video</span>}
                        {item.materialUrl && <span>Has Material</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setEditingItem(item)} className="p-2 text-gray-400 hover:text-blue-600">
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-gray-400 hover:text-red-600">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {content.length === 0 && (
        <div className="text-center py-8 text-gray-500">No content added yet. Click "Add Content" to get started.</div>
      )}
    </div>
  )
}
