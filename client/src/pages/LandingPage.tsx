import NavBar from "../components/NavBar"
import HeroSection from "../components/HeroSection"

function LandingPage() {
  return (
    <div>
      <NavBar/>
      <HeroSection post={{ description: 'Learning a new language can be an exciting and rewarding experience. Not only does it open up new opportunities for communication and cultural exploration, but it also exercises the brain and improves cognitive abilities.',
      image: 'https://wallpaperaccess.com/full/6469440.jpg',imageText: 'xfddsf',linkText: 'dfvdv',title: 'Learning a new language' }} />
    </div>
    )
}

export default LandingPage
