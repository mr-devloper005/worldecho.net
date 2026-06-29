import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  classified: false,
  sbm: true,
  profile: true,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Article pages and article detail backlinks",
  classified: "Classified ads pages and detail backlinks",
  sbm: "Social bookmarking pages and detail backlinks",
  profile: "Profile/user pages",
  pdf: "PDF/document pages and detail backlinks",
  listing: "Business listing pages and detail backlinks",
  image: "Image/gallery pages and detail backlinks",
} satisfies Record<TaskKey, string>;

// Tasks that stay FULLY functional — routes, data, SEO, sitemap, and detail
// pages keep working and remain reachable by direct URL — but must NOT be
// surfaced anywhere in the public UI: no nav/footer/home/category links, no
// create options, no search filter, no redirect cards. This is a UI-visibility
// rule only; it deliberately does not touch `slot4TaskSupport` (the enabled
// flag), so nothing about the task's behavior changes.
export const slot4TasksHiddenFromUI = {
  article: false,
  classified: false,
  sbm: false,
  profile: true,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

/** True when a task is allowed to appear in the public UI. */
export function isTaskVisibleInUI(key: TaskKey) {
  return !slot4TasksHiddenFromUI[key];
}

/** Predicate for task lists: enabled AND allowed in the public UI. */
export function uiVisibleTask(task: { key: TaskKey; enabled: boolean }) {
  return task.enabled && isTaskVisibleInUI(task.key);
}

// Friendlier, less "raw task" labels for the public UI. The site centers on
// bookmarks/collections/resources, so the SBM section reads as "Bookmarks".
const publicTaskLabels: Partial<Record<TaskKey, string>> = {
  sbm: "Bookmarks",
};

/** Public-facing label for a task (curated where it helps, config label otherwise). */
export function publicTaskLabel(task: { key: TaskKey; label: string }) {
  return publicTaskLabels[task.key] || task.label;
}
