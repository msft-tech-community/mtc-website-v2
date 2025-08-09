import HeroSection from "../components/ui/HeroSection/HeroSection.jsx";
import HighlightList from "../components/features/Highlights/HighlightList.jsx";
import EventsSlideshow from "../components/features/Events/EventsSlideshow.jsx";
import Footer from "../components/ui/Footer/Footer.jsx";
import TeamMemberCard from "../components/features/Team/TeamMemberCard.jsx";
export default function Home() {
    return (
        <>
            <HeroSection />
            <HighlightList />
            {/* <TeamMemberCard />
            <EventsSlideshow /> */}
            <Footer />
        </>
    );
}
