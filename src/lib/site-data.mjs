export const PRIORITY_ORDER = ["S", "A", "B"];

function compareText(a, b) {
  return String(a).localeCompare(String(b), "zh-CN");
}

export function sortSlides(slides) {
  return [...slides].sort((left, right) => left.data.order - right.data.order);
}

export function groupSlidesBySection(slides) {
  const orderedSlides = sortSlides(slides);
  const groups = [];

  for (const slide of orderedSlides) {
    const lastGroup = groups.at(-1);

    if (!lastGroup || lastGroup.section !== slide.data.section) {
      groups.push({
        section: slide.data.section,
        slides: [slide],
      });
      continue;
    }

    lastGroup.slides.push(slide);
  }

  return groups;
}

export function sortResourcesByPriority(resources) {
  return [...resources].sort((left, right) => {
    const leftRank = PRIORITY_ORDER.indexOf(left.data.priority);
    const rightRank = PRIORITY_ORDER.indexOf(right.data.priority);

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return compareText(left.data.title, right.data.title);
  });
}

export function groupResourcesByCategory(resources) {
  const orderedResources = sortResourcesByPriority(resources);
  const grouped = new Map();

  for (const resource of orderedResources) {
    const category = resource.data.category;
    const categoryResources = grouped.get(category) ?? [];
    categoryResources.push(resource);
    grouped.set(category, categoryResources);
  }

  return Array.from(grouped.entries()).map(([category, groupedResources]) => ({
    category,
    resources: groupedResources,
  }));
}
