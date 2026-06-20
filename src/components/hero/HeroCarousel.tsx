import "../../styles/heroCarousel.css";

type HeroCarouselProps = {
  totalSlides: number;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
};

export default function HeroCarousel({
  totalSlides,
  currentSlide,
  setCurrentSlide,
}: HeroCarouselProps) {
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
