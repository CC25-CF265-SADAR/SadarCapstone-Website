import Sortable from 'sortablejs';

export function setupSortableDragAndDrop() {
  const rightZone = document.getElementById("zone-right");
  const wrongZone = document.getElementById("zone-wrong");

  if (!rightZone || !wrongZone) {
    console.warn("Drop zone belum ditemukan di DOM!");
    return;
  }

  [rightZone, wrongZone].forEach((zone) => {
    new Sortable(zone, {
      group: "quiz-options",
      animation: 150,
      onAdd: () => {
        const placeholder = zone.querySelector(".placeholder");
        if (placeholder) placeholder.style.display = "none";
      },
      onRemove: () => {
        const placeholder = zone.querySelector(".placeholder");
        const isEmpty = zone.children.length === 0;
        if (placeholder) placeholder.style.display = isEmpty ? "block" : "none";
      },
    });
  });

  const sourceContainer = document.querySelector(".grid");
  if (sourceContainer) {
    new Sortable(sourceContainer, {
      group: "quiz-options",
      animation: 150,
      sort: false
    });
  }
}