// import { useParams } from "react-router-dom";
// import { HeroDefaultValues, type TAsyncHeroSection } from "../../../Models/hero-section.model";
// import { QueryKey } from "../../../Types/query.types";
// import { useCustomQuery } from "../../../Global/get-query";
// import ErrorMessage from "../../../Global/error-message";
// import Loading from "../../../Global/loader";
// import HeroForm from "./hero-form";

// const EditHero = () => {
//   const { slug, id } = useParams();
//   const { data: heroSection, isLoading, error } = useCustomQuery<TAsyncHeroSection>({
//     endPoint: `${QueryKey.HERO_SECTIONS}/${id}`,
//     queryKey: [QueryKey.HERO_SECTIONS, id],
//   });

//   if (isLoading) return <Loading />;
//   if (error) return <ErrorMessage error={error} />;

//   return (
//     <HeroForm
//       heroValues={heroSection || HeroDefaultValues}
//       formTitle="Edit"
//       isEdit={true}
//       open={true}
//       onOpenChange={() => window.history.back()}
//       pageSlug={slug || ""}
//     />
//   );
// };

// export default EditHero;