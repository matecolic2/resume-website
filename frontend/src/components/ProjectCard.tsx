import type { Episode } from "@/types/episode";

export function ProjectCard({ episode }: { episode: Episode }) {
  const handleCardClick = () => {
    if (episode.link) {
      window.open(episode.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && episode.link) {
      event.preventDefault();
      window.open(episode.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className="projectCard"
      aria-label={`Project: ${episode.title}`}
      onClick={episode.link ? handleCardClick : undefined}
      onKeyDown={episode.link ? handleKeyDown : undefined}
      tabIndex={episode.link ? 0 : undefined}
      style={episode.link ? { cursor: 'pointer' } : undefined}
    >
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      <div className="tags" aria-label="Project tags">
        {episode.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {episode.link ? (
        <a
          href={episode.link}
          target="_blank"
          rel="noopener noreferrer"
          className="button accent"
          onClick={(e) => e.stopPropagation()}
        >
          View Project
        </a>
      ) : null}
    </article>
  );
}
