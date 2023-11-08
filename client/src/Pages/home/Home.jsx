import "./home.scss";
import Featured from "../../components/Featured/Featured";
import Sponcers from "../../components/Sponcers/Sponcers";
import CatCard from "../../components/CatCard/CatCard";
import Slide from "../../components/Slide/Slide";
import { cards, projects } from "../../data";
import Features from "../../components/Features/Features";
import Explore from "../../components/Expolore/Explore";
import { CategoryIcons } from "../../components/CategoryIcons/CategoryIcons";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Footer from "../../components/Footer/Footer";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";

function home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);
  return (
    <div className="home">
      <Featured />
      <Sponcers />
      <Slide
        slidesToShow={5}
        arrowsScroll={5}
        autoplay={true}
        autoplayScroll={5}
      >
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>

      <Features />

      <CategoryIcons />
      <Explore />
      <Slide
        slidesToShow={4}
        arrowsScroll={4}
        autoplay={true}
        autoplayScroll={4}
      >
        {projects.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </Slide>
    </div>
  );
}

export default home;
