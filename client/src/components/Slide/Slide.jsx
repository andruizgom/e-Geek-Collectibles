import slide_1 from "../../assets/slide-1.png";
import slide_2 from "../../assets/slide-2.png";
import slide_3 from "../../assets/slide-3.png";

import { Carousel } from "flowbite-react";

export default function Slide() {
  return (
    <div className="mx-16 h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src={slide_1} alt="Slide-1" />
        <img src={slide_2} alt="Slide-2" />
        <img src={slide_3} alt="Slide-3" />
      </Carousel>
    </div>
  );
}
