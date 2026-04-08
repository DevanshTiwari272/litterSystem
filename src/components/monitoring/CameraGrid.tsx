"use client";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HLSMediaPlayer } from "./HLSMediaPlayer";
import { Camera } from "@/types";

interface CameraGridProps {
  cameras: Camera[];
  layout: 1 | 4 | 9; // 1x1, 2x2, 3x3
}

function SortableCameraItem({ camera }: { camera: Camera }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: camera.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <HLSMediaPlayer streamUrl={camera.streamUrl} cameraId={camera.id} zoneId={camera.zoneId} />
    </div>
  );
}

export function CameraGrid({ cameras: initialCameras, layout }: CameraGridProps) {
  const [cameras, setCameras] = useState(initialCameras);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCameras((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const visibleCameras = cameras.slice(0, layout);

  const gridClasses = {
    1: "grid-cols-1 grid-rows-1 object-cover",
    4: "grid-cols-2 grid-rows-2",
    9: "grid-cols-3 grid-rows-3"
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={visibleCameras.map(c => c.id)} strategy={rectSortingStrategy}>
        <div className={`grid ${gridClasses[layout]} gap-4 h-full w-full p-2 bg-[hsl(var(--surface-container-low))] border border-border`}>
          {visibleCameras.map(camera => (
            <SortableCameraItem key={camera.id} camera={camera} />
          ))}
          {visibleCameras.length < layout && (
            Array.from({ length: layout - visibleCameras.length }).map((_, i) => (
              <div key={`empty-${i}`} className="border border-dashed border-border flex items-center justify-center font-display font-bold uppercase tracking-widest text-muted-foreground text-[10px] bg-card">
                EMTPY SLOT
              </div>
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
