import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { fetchGigs } from "../redux/gigSlice";
import HeroSection from "../components/HeroSection";
import { FeaturedFreelancers } from "../components/Freelancers";
import GigsSection from "../components/GigsSection";
import HowItWorks from "../components/HowItWorks";
import CallToAction from "../components/CallToAction";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchGigs(undefined));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchGigs(search));
  };

  return (
    <>
      <HeroSection
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {/* 🔹 GIGS */}
      <section id="featured-gigs">
        <GigsSection />
      </section>

      {/* 🔹 HOW IT WORKS */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* 🔹 FEATURED FREELANCERS */}
      <section id="featured-freelancers">
        <FeaturedFreelancers />
      </section>

      <CallToAction />
    </>
  );
}

export default Home;
