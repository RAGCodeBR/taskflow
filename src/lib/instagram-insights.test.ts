import { describe, expect, it } from "vitest";
import { followerDelta, formatLastSync, sortPostsByDate } from "./instagram-insights";

describe("followerDelta", () => {
  it("é a diferença entre o snapshot mais recente e o anterior", () => {
    const stats = [
      { snapshot_date: "2026-09-12", followers_count: 100 },
      { snapshot_date: "2026-09-13", followers_count: 108 },
      { snapshot_date: "2026-09-14", followers_count: 112 },
    ];
    expect(followerDelta(stats)).toBe(4);
  });

  it("com um snapshot só, não dá pra calcular variação", () => {
    expect(followerDelta([{ snapshot_date: "2026-09-14", followers_count: 100 }])).toBeNull();
  });

  it("sem snapshot nenhum, null", () => {
    expect(followerDelta([])).toBeNull();
  });

  it("ignora a ordem de entrada — sempre pelos dois mais recentes por data", () => {
    const stats = [
      { snapshot_date: "2026-09-14", followers_count: 112 },
      { snapshot_date: "2026-09-12", followers_count: 100 },
      { snapshot_date: "2026-09-13", followers_count: 108 },
    ];
    expect(followerDelta(stats)).toBe(4);
  });
});

describe("sortPostsByDate", () => {
  it("mais recente primeiro", () => {
    const posts = [
      { id: "a", posted_at: "2026-09-10T10:00:00Z" },
      { id: "b", posted_at: "2026-09-14T10:00:00Z" },
      { id: "c", posted_at: "2026-09-12T10:00:00Z" },
    ];
    expect(sortPostsByDate(posts).map((p) => p.id)).toEqual(["b", "c", "a"]);
  });

  it("post sem data vai pro fim", () => {
    const posts = [
      { id: "a", posted_at: null },
      { id: "b", posted_at: "2026-09-14T10:00:00Z" },
    ];
    expect(sortPostsByDate(posts).map((p) => p.id)).toEqual(["b", "a"]);
  });
});

describe("formatLastSync", () => {
  const now = new Date("2026-09-14T12:00:00Z");

  it("nunca sincronizado", () => {
    expect(formatLastSync(null, now)).toBe("Ainda não sincronizado");
  });

  it("há poucas horas", () => {
    expect(formatLastSync("2026-09-14T09:00:00Z", now)).toBe("Atualizado há 3h");
  });

  it("menos de 1h, arredonda pra baixo mas nunca mostra 0h", () => {
    expect(formatLastSync("2026-09-14T11:40:00Z", now)).toBe("Atualizado há menos de 1h");
  });

  it("mais de 24h", () => {
    expect(formatLastSync("2026-09-12T12:00:00Z", now)).toBe("Atualizado há 2 dias");
  });
});
