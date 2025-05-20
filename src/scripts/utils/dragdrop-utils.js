import Sortable from 'sortablejs';

export function setupSortableDragAndDrop() {
  const dropZones = document.querySelectorAll(".drop-zone");

  if (!dropZones.length) {
    console.warn("Drop zones belum ditemukan di DOM!");
    return;
  }

  dropZones.forEach((zone) => {
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

  const sourceContainer = document.querySelector(".grid"); // tempat asal
  if (sourceContainer) {
    new Sortable(sourceContainer, {
      group: "quiz-options",
      animation: 150,
      sort: false
    });
  }
}