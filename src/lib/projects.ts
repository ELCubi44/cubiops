export type ProjectStatus = 'draft' | 'published';
export type ProjectWorkKind = 'web' | 'app';

export interface ProjectWork {
  kind: ProjectWorkKind;
  title: string;
  body: string;
  url?: string;
  icon?: string;
}

export interface Project {
  id: string;
  clientName: string;
  sector: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  automations: string[];
  result: string;
  image: string;
  logo: string;
  logoAlt: string;
  url?: string;
  works: ProjectWork[];
  testimonial: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number | null;
  date: string;
  permissionToPublish: boolean;
  status: ProjectStatus;
  featured: boolean;
}

export function canShowPublicly(project: Project): boolean {
  return project.status === 'published' && project.permissionToPublish;
}

export function canShowRating(project: Project): boolean {
  return (
    canShowPublicly(project) &&
    typeof project.rating === 'number' &&
    project.rating >= 1 &&
    project.rating <= 5 &&
    project.testimonial.trim().length > 0 &&
    project.reviewerName.trim().length > 0
  );
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.date.localeCompare(a.date);
  });
}

export function getPublishedProjects(projects: Project[]): Project[] {
  return sortProjects(projects.filter(canShowPublicly));
}

export function workLabel(kind: ProjectWorkKind): string {
  return kind === 'web' ? 'Web' : 'App';
}
