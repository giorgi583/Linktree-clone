// components/sortable-link-item.tsx
"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Pencil, Trash } from "lucide-react"
import {deleteLink} from '@/app/actions/links'
export type LinkItem = {
  id: string
  title: string | null
  url: string
  clicks: number
  isActive: boolean
  platform: string
}

export function SortableLinkItem({setEditLink, link, toggleActive }: {setEditLink: any; link: LinkItem; toggleActive: (id: string) => void}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
 async function handleDelete(id: string) {
  window.confirm("Are you sure you want to delete this link?") && await deleteLink(id)
 }
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg border border-[#e7e5e4] bg-white px-3 py-3 ${
        isDragging ? "relative z-10 shadow-lg opacity-90" : ""
      }`}
    >
      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        aria-label={`Reorder ${link.title ?? link.url}`}
        className="cursor-grab touch-none text-stone-400 hover:text-stone-600 active:cursor-grabbing"
      >
        <GripVertical size={18} />
      </button>

      <div className="min-w-0 flex-1 flex items-center gap-3">
        <p className="text-sm font-medium ">{link.platform || link.title}</p>
      </div>

    <div className="flex items-center gap-3">
      <button className="text-stone-400 hover:text-stone-600" aria-label={`Edit ${link.title ?? link.url}`} onClick={() => setEditLink(link.platform || link.title)}>
        <Pencil className="text-stone-400 hover:text-stone-600" size={16} />
      </button>
      <button type='button' aria-checked={link?.isActive} aria-label={`${link?.isActive ? "Hide" : "Show"} ${link?.title ?? link?.url}`} role='switch' onClick={() => toggleActive(link.id)} className={`relative cursor-pointer rounded-full w-7 h-4 ${link?.isActive ? "bg-teal-600" : "bg-gray-300"}`}><span className={`absolute top-0.25 left-0.5 h-3.25 w-3.25 rounded-full bg-white transition-transform ${
              link?.isActive ? "translate-x-3" : "translate-x-0"
            }`}></span>
            </button>
            <button onClick={() => handleDelete(link.id)} className="text-stone-400 hover:text-stone-600" aria-label={`Delete ${link.title ?? link.url}`}>
              <Trash className="text-brand" size={16} />
            </button>
    </div>
    </li>
  )
}