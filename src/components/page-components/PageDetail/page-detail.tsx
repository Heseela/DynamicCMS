import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import type { TAsyncPage } from "../../../Models/pages.model";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import { HeroForm } from "../HeroSection/hero-form";
import { MetadataForm } from "../Metadata/metadata-form";

export const PageDetail = () => {
  const { slug } = useParams();
  const { data: page, isLoading, error } = useCustomQuery<TAsyncPage>({
    endPoint: `${QueryKey.PAGES}/${slug}`,
    queryKey: [QueryKey.PAGES, slug],
  });

  const [activeSection, setActiveSection] = useState<"content" | "hero" | "metadata">("content");

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="p-4">
      <h2 className="title">{page?.name}</h2>

      <div className="flex gap-4 my-6">
        <button
          onClick={() => setActiveSection("content")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "content" 
              ? "bg-primaryColor text-white" 
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveSection("hero")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "hero" 
              ? "bg-primaryColor text-white" 
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Hero Section
        </button>
        <button
          onClick={() => setActiveSection("metadata")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "metadata" 
              ? "bg-primaryColor text-white" 
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Metadata
        </button>
      </div>

      <div className="mt-4">
        {activeSection === "hero" && (
          <div>
            <hr className="my-6" />
            {slug ? (
              <HeroForm pageSlug={slug} />
            ) : (
              <p className="text-red-500">Invalid page slug.</p>
            )}
          </div>
        )}

        {activeSection === "content" && (
          <div>
            <h3 className="font-semibold mb-2">Content</h3>
          </div>
        )}

        {activeSection === "metadata" && (
          <div>
            <h3 className="font-semibold mb-2">Metadata</h3>
            <MetadataForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetail;