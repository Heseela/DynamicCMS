// import { useState } from "react";
// import { DataTable } from "../../../Global/Table/data-table";
// import { Button } from "../../ui/button";
// import type { TAsyncHeroSection } from "../../../Models/hero-section.model";
// import { QueryKey } from "../../../Types/query.types";
// import { useCustomQuery } from "../../../Global/get-query";
// import { useParams } from "react-router-dom";
// import ErrorMessage from "../../../Global/error-message";
// import Loading from "../../../Global/loader";
// import { Plus } from "lucide-react";
// import HeroForm from "./hero-form";
// import { HeroColumns } from "./hero-column";

// const HeroList = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { slug } = useParams<{ slug: string }>();
  
//   const { data: heroSections, isLoading, error } = useCustomQuery<TAsyncHeroSection[]>({
//     endPoint: QueryKey.HERO_SECTIONS,
//     queryKey: [QueryKey.HERO_SECTIONS, slug],
//     params: { page: slug },
//   });

//   if (isLoading) return <Loading />;
//   if (error) return <ErrorMessage error={error} />;

//   return (
//     <div className="space-y-4 bg-white p-4 rounded-lg">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Hero Sections</h2>
//         <Button onClick={() => setIsModalOpen(true)}>
//           <Plus className="mr-2" size={16} />
//           Add Hero Section
//         </Button>
//       </div>
      
//       <DataTable
//         columns={HeroColumns}
//         data={heroSections || []}
//       />

//       <HeroForm
//         open={isModalOpen}
//         onOpenChange={setIsModalOpen}
//         pageSlug={slug || ""}
//       />
//     </div>
//   );
// };

// export default HeroList;