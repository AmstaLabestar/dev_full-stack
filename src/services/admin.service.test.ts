import type { AdminRepository } from "@/repositories/admin.repository";
import { AdminService } from "@/services/admin.service";
import { describe, expect, it, vi } from "vitest";

function createRepositoryMock(): AdminRepository {
  return {
    getOverview: vi.fn(),
    listProjects: vi.fn(),
    createProject: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
    listExperiences: vi.fn(),
    createExperience: vi.fn(),
    updateExperience: vi.fn(),
    deleteExperience: vi.fn(),
    getCurrentCv: vi.fn(),
  };
}

describe("AdminService", () => {
  it("normalizes project tags before persisting", async () => {
    const repository = createRepositoryMock();
    const service = new AdminService(repository);

    await service.createProject({
      title: "AI Copilot",
      slug: "ai-copilot",
      category: "ai",
      year: 2026,
      featured: true,
      tags: "LLM, RAG,  Observabilite ",
      summary: "Un copilote IA robuste pour assister des operations critiques.",
      githubUrl: "https://github.com/hamza/ai-copilot",
      demoUrl: "https://demo.example.com/ai-copilot",
      videoUrl: "",
      sortOrder: 1,
    });

    expect(repository.createProject).toHaveBeenCalledWith(
      expect.objectContaining({
        tags: ["LLM", "RAG", "Observabilite"],
        videoUrl: undefined,
      }),
    );
  });

  it("validates experience input before update", async () => {
    const repository = createRepositoryMock();
    const service = new AdminService(repository);

    await expect(
      service.updateExperience("experience-1", {
        company: "A",
        role: "Lead Engineer",
        period: "2023",
        summary: "Trop court",
        sortOrder: 0,
      }),
    ).rejects.toThrow();
  });
});
