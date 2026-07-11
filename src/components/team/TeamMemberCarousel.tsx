import "../../styles/teamMemberCarousel.css";

type TeamMemberCarouselProps = {
  totalSlides: number;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
};

export default function TeamMemberCarousel({
  totalSlides,
  currentSlide,
  setCurrentSlide,
}: TeamMemberCarouselProps) {
  return (
    <div className="hero-mid-carousel">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          className={currentSlide === index ? "active" : ""}
          onClick={() => setCurrentSlide(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
