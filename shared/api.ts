/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Export Hub types
export interface ResumeExport {
  id: string;
  title: string;
  preview?: string | null;
}

export interface PitchExport {
  id: string;
  snippet: string;
}

export interface PortfolioExport {
  id: string;
  title: string;
  preview?: string | null;
}

export interface ExportHubResponse {
  resumes: ResumeExport[];
  pitches: PitchExport[];
  portfolios: PortfolioExport[];
}
