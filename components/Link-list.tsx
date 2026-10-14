
"use client"
import { useEffect, useState, useTransition } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers"
import { reorderLinks, setLinkActive } from "@/app/actions/links"
import { SortableLinkItem, type LinkItem } from "./SortableLinkItem"

export function LinkList({ initialLinks, type, setEditLink }: { initialLinks: LinkItem[], type: "LINK" | "SOCIAL"; setEditLink: any}) {
  const [links, setLinks] = useState(initialLinks)
  const [, startTransition] = useTransition()
useEffect(() => {
  setLinks(initialLinks)
}, [initialLinks])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // must move 5px before a drag starts
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
function handleToggle(id: string) {
    const target = links.find((l) => l.id === id)
    if (!target) return
    const next = !target.isActive

    // 1. update the UI immediately
    setLinks((cur) => cur.map((l) => (l.id === id ? { ...l, isActive: next } : l)))

    // 2. save in the background, undo only this link if it fails
    startTransition(async () => {
      const result = await setLinkActive(id, next)
      console.log("result", result)
      if (result?.error) {
        setLinks((cur) => cur.map((l) => (l.id === id ? { ...l, isActive: !next } : l)))
      }
    })
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = links.findIndex((l) => l.id === active.id)
    const newIndex = links.findIndex((l) => l.id === over.id)
    const reordered = arrayMove(links, oldIndex, newIndex)

    const previous = links
    setLinks(reordered) // update the UI immediately

    startTransition(async () => {
      const result = await reorderLinks(type, reordered.map((l) => l.id))
      if (result?.error) setLinks(previous) // roll back if the save failed
    })
  }

  return (
    <DndContext
      id="link-list" // fixed id avoids a hydration mismatch warning in Next.js
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          { links.map((link) => (
            <SortableLinkItem setEditLink={setEditLink} key={link.id} link={link} toggleActive={handleToggle} />
          ))}
         
        </ul>
      </SortableContext>
    </DndContext>
  )
}